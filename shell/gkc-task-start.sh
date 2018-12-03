#!/bin/bash

source gkc-utils.sh

validCredentials

get_help() {
    printf "Creates a new branch with the issue ID in you computer
and move it to stage In Progress on github.

 Usage:
    gkc-task-start issueID

 Ex:
    gkc-task-start 3084

    \n"
}

issue_number=$1

if [[ -z $1 ]] || [[ $@ =~ --help ]]
then
    get_help
    exit 0
fi

issue_info=$(curl -s $COMMAND "$AUTHORIZATION" https://api.github.com/repos/"$REPO_PATH"/issues/"$issue_number")
issue_exists=$(echo "$issue_info" | grep message)
if [[ $issue_exists == *"Not Found"* ]]; then
    printf "\e[33mNo issue with this ID was found\e[0m\n"
    [ -z ${NO_ISSUE+x} ] && {
        exit 1
    }
fi

printf "\nThe following files was modified and will be stashed\n"
git status
git stash || true

git checkout master

git fetch origin
git submodule update --recursive --remote

if [[ $(git branch | grep "$issue_number") ]]; then
    printf "\e[33mThis branch already exists. Checking out on it.\e[0m\n"
    git checkout "$issue_number"
else
    githubuser=$GITHUB_USER
    if [ -z ${GITHUB_USER+x} ]; then
        read -p "Type your github login here: " githubuser
    fi

    [ -z "$githubuser" ] && {
        echo "Your github login is necessary"
        exit 1
    }

    data="{\"assignees\": [\"$githubuser\"]}"
    curl -s -X POST -H "Content-Type: application/json" https://api.github.com/repos/"$REPO_PATH"/issues/$issue_number $COMMAND "$AUTHORIZATION" -d "$data" > /dev/null

    git checkout -b "$issue_number" origin/master

    if [[ $(echo "$issue_info" | grep 'Stage: Analysis') ]]
    then
        $CLIPP_PATH/Cli/cpf-issue-tag --change-stage 'Analysis' 'In progress' "$issue_number"
    elif  [[ $(echo "$issue_info" | grep 'Stage: To Do') ]]
    then
        $CLIPP_PATH/Cli/cpf-issue-tag --change-stage 'To Do' 'Analysis' $issue_number
    fi
fi

#notify-slack "$USER created local branch $issue_number"
#notify-user "A new branch $issue_number was created in your workspace"

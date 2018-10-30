#!/bin/bash

source gkc-utils.sh

validCredentials

issue_number=$1

if [[ -z $1 ]] || [[ $1 == '--help' ]] || [[ $1 == '-h' ]]; then
    printf "Change stage to Analysis and assign the task to you

 Usage:
    gkc-analyze issueID

 Ex:
    gkc-analyze 3084\n"
    exit 0
fi

githubuser=$GITHUB_USER
if [ -z ${GITHUB_USER+x} ]; then
    read -p "Type your github login here: " githubuser
fi

[ -z "$githubuser" ] && {
    echo "Your github login is necessary"
    exit 1
}

exists=$(curl -s $COMMAND "$AUTHORIZATION" https://api.github.com/repos/"$REPO_PATH"/issues/"$issue_number" | grep message)
if [[ $exists == *"Not Found"* ]]; then
    printf "\e[33mNo issue with this ID was found\e[0m\n"
    exit 1
fi

gkc-issue-tag --add 'Stage: Analysis' $issue_number

data="{\"assignees\": [\"$githubuser\"]}"
curl -s -X POST -H "Content-Type: application/json" https://api.github.com/repos/"$REPO_PATH"/issues/$issue_number $COMMAND "$AUTHORIZATION" -d "$data" > /dev/null

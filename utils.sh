#!/bin/bash
# to use on your machine run: source git-kanban-cli/utils.sh


REPO_PATH=$(git config --get remote.origin.url | sed -r 's/(.*:)(.*)(\..*)/\2/')

AUTHORIZATION="$GITHUB_USER:$GITHUB_PASSWORD"
COMMAND='-u'
[ ! -z ${GITHUB_TOKEN+x} ] && {
    AUTHORIZATION="Authorization: token $GITHUB_TOKEN"
    COMMAND='-H'
}

validGitRepository() {
    if [ ! $(git rev-parse --is-inside-work-tree) ]; then
        exit 1;
    fi
}

validCredentials() {
    if [ -z ${GITHUB_USER+x} ] || [ -z ${GITHUB_PASSWORD+x} ] && [ -z ${GITHUB_TOKEN+x} ]; then
        printf "If you want to move the task you should set the environment variables bellow:
        \e[33mGITHUB_USER
        GITHUB_PASSWORD
        OR
        GITHUB_TOKEN\e[0m\n"
        exit 1
    fi
}

get_current_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/'
}

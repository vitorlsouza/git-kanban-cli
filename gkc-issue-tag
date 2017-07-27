#!/bin/bash

source gkc-utils.sh

validCredentials

function getHelp {
    printf "Add, remove or change issue labels

 Usage:
    --add 'Label' issueID                               Label an issue
    --rm 'Label' issueID                                Dislabel an issue
    --change-stage|-cs 'Current' 'Desired' issueID      Change a the issue label stage

 Ex:
    gkc-issue-tag --add 'Stage: Analysis' 666
    gkc-issue-tag -cs 'Review' 'Testing' 666\n"
}

if [[ -z "$1" ]] || [[ $1 == '--help' ]] || [[ $1 == '-h' ]]; then
    getHelp
    exit 0
fi

action="$1"
tag="$2"
issue="$3"

[[ "$action" == '--change-stage' ]] || [[ "$action" == '-cs' ]] && {
    tag="Stage: $tag"
    desired="Stage: $3"
    issue="$4"

    curl -s https://api.github.com/repos/"$REPO_PATH"/issues/$issue/labels $COMMAND "$AUTHORIZATION" -d "[\"$desired\"]" > /dev/null
    tag="$(perl -MURI::Escape -e 'print uri_escape($ARGV[0]);' "$tag")"
    curl -s -X DELETE $COMMAND "$AUTHORIZATION" https://api.github.com/repos/"$REPO_PATH"/issues/$issue/labels/"$tag" > /dev/null
    exit 0
}

[[ "$action" == '--add' ]] && {
    curl -s https://api.github.com/repos/"$REPO_PATH"/issues/$issue/labels $COMMAND "$AUTHORIZATION" -d "[\"$tag\"]" > /dev/null
    exit 0
}

[[ "$action" == '--rm' ]] && {
    tag="$(perl -MURI::Escape -e 'print uri_escape($ARGV[0]);' "$tag")"
    curl -s -X DELETE $COMMAND "$AUTHORIZATION" https://api.github.com/repos/"$REPO_PATH"/issues/$issue/labels/"$tag" > /dev/null
    exit 0
}

getHelp
exit 0

#!/bin/bash

source gkc-utils.sh

validCredentials

function getHelp {
    printf "Create a new task according a template

    -h|--help       Show this help, then exit
\n"
}

[[ "$*" =~ '-h' ]] || [[ "$*" =~ '--help' ]] && {
    getHelp
    exit
}


read -r -p "Title: " title
read -r -p "Actual  behavior: " actual_behavior
read -r -p "Please, describe the steps to reproduce the behavior: " steps_to_reproduce
read -r -p "Expected  behavior: " expected_behavior
read -r -p "Additional information: " add_info

printf "\n"
labels=""
echo "==> LABELS: Leave empty if you don't wanna add the label."

category_label=""
echo "Category (example: Backend): "
read -r category_label
[ ! -z "$category_label" ] && {
    labels="\"Category: $category_label\","
}

printf "\n"
priority_label=""
echo "Priority (example: Medium): "
read -r priority_label
[ ! -z "$priority_label" ] && {
    labels="$labels \"Priority: $priority_label\","
}

printf "\n"
type_label=""
echo "Type (example: Bug): "
read -r type_label
[ ! -z "$type_label" ] && {
    labels="$labels \"Type: $type_label\","
}

printf "\n"
stage_label=""
echo "Stage: "
read -r stage_label
[ ! -z "$stage_label" ] && {
    labels="$labels \"Stage: $stage_label\","
}

[ ! -z "$labels" ] && {
    labels=${labels:0:-1}
}

body="### **Actual behavior**\n$actual_behavior"
body="$body\n\n### **Steps to reproduce the behavior**\n$steps_to_reproduce"
body="$body\n\n### **Expected behavior**\n$expected_behavior"
body="$body\n\n### **Additional information**\n$add_info"

data="{
  \"title\": \"$title\",
  \"body\": \"$body\",
  \"labels\": [$labels]
}"

request_return=$(curl https://api.github.com/repos/"$REPO_PATH"/issues "$COMMAND" "$AUTHORIZATION" -d "$data")
[[ ! -z ${DEBUG+x} ]] && {
    echo "CURL:"
    echo "curl https://api.github.com/repos/"$REPO_PATH"/issues $COMMAND $AUTHORIZATION -d $data"
    echo "$request_return"
    echo  ""
}

if [[ $request_return == *"message"* ]]; then
    echo 'Some exception ocurred'
    exit 1
fi

issue_number=$(echo "${request_return}" | python -m json.tool | grep number | head -n1 | sed 's/[^0-9]*//g')
#notify-slack "$USER created a new task $title (#$issue_number)" &> /dev/null
echo "Issue Created: $issue_number"

read  -r -p "Would you like to start the task? [y/N]: " reply
[[ $reply =~ Y|y ]] && {
    ./gkc-task-start "$issue_number"
}

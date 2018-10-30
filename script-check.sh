#!/usr/bin/env bash

files=$(find /usr/local/bin/ -name "gkc-*")
for file in $files; do
    [[ $(type shellcheck) ]] && {
        shellcheck $file
        [[ $? -ne 0  ]] && {
            echo "Code checker failure for file $file"
            exit 1
        }
    }
done

exit 0

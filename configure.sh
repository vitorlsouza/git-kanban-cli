#!/bin/bash

cp $(find . -name "gkc-*") /usr/local/bin

files=$(find /usr/local/bin/ -name "gkc-*")
for file in $files; do
    mv "$file" $(echo "$file" | sed -e "s/.sh//g")
done

find /usr/local/bin/ -name "gkc-*" -exec chmod -R a+x {} \;

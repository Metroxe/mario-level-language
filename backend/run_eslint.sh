#!/bin/sh
npm i -g eslint
run_eslint() {
    while [ "$1" ]; do
        if [ -d "$1" ]; then
            listit "$1"/*
        else
        	eslint --no-eslintrc -c my-eslint.json -f json "$1"
        fi
        shift
    done
}

run_eslint $1

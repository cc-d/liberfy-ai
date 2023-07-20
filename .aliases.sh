#!/bin/sh
#alias dc="docker compose"

dc () {

    if [ "$1" = "rebuild" ]; then
        docker compose stop
        docker compose build
        docker compose up -d
    else
        docker compose $@
    fi
}



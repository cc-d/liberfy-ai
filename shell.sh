#!/bin/sh
#alias dc="docker compose"
LIBAI_DIR="$HOME/liberfy-ai"
alias gentypes="npx openapi-typescript-codegen generate --input http://localhost:8888/openapi.json --output $HOME/libai-frontend/src/api"

dc () {

    if [ "$1" = "rebuild" ]; then
        docker compose stop
        docker compose build
        docker compose up -d
    else
        docker compose $@
    fi
}


npmapi() {
    gentypes
    npm start
}
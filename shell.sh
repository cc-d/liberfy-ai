#!/bin/sh
#alias dc="docker compose"
ROOTDIR="$HOME/liberfy-ai"
FRONTDIR="$ROOTDIR/libai-frontend"
APIDIR="$ROOTDIR/api"

echo $ROOTDIR $APIDIR $FRONTDIR
alias gentypes="npx openapi-typescript-codegen generate --exportSchemas true --input http://localhost:8888/openapi.json --output $FRONTDIR/src/api/"

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
    cd $FRONTDIR && npm start
}

alias psqldb="psql -U pguser -h 127.0.0.1 -p 5432 pgdb"

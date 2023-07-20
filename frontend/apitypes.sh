#/bin/sh
cd . && echo `pwd`; #npx openapi-typescript-codegen generate --input http://localhost:8888/openapi.json --output ./src/api

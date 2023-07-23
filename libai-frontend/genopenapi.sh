#!/bin/sh

# Step 1: Download the OpenAPI JSON schema from the provided URL and save it as openapi.json
curl -s -L -o "$PWD/openapi.json" http://localhost:8888/openapi.json

cat "$PWD/openapi.json" && echo ''

# Step 2: Generate TypeScript types using openapi-typescript-codegen
npx openapi-typescript-codegen generate --input "$PWD/openapi.json" --output "$PWD/src/api"

#!/bin/bash

required_vars=( GRAPHQL_URI )
for envname in ${required_vars[@]}; do
    if [ -z ${!envname+x} ]; then
        echo "Environment variable ${envname} is not set"
        exit 1
    fi
done

cd /usr/share/nginx/html
envsubst < env.js.dist > env.js
cp index.html index.html.dist
envsubst < index.html.dist > index.html
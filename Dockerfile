FROM node:20-alpine AS build
WORKDIR /source

COPY package-lock.json .
COPY package.json .

RUN npm i --no-audit

COPY . .

RUN npm run build

FROM nginx:1.25.2-alpine

RUN apk add bash

COPY docker/default.conf /etc/nginx/conf.d/default.conf
COPY docker/create-env-js.sh /docker-entrypoint.d
RUN chmod +x /docker-entrypoint.d/create-env-js.sh

COPY --from=build /source/dist /usr/share/nginx/html
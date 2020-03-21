FROM node:12.16.1-alpine as development

COPY . /app
WORKDIR /app

RUN apk update && apk upgrade

EXPOSE 3000
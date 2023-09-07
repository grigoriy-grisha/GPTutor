#!/bin/sh

git checkout origin/develop
git pull origin develop

docker-compose stop  frontend-stage
docker-compose rm --force frontend-stage

docker-compose build frontend-stage
docker-compose up -d frontend-stage

docker-compose down

docker volume rm gptutor_www-html

docker-compose stop nginx
docker-compose rm --force nginx

docker-compose build nginx
docker-compose up -d nginx





docker volume rm gptutor_www-html-stage

sh .env-stage.sh

git checkout origin/develop
git pull origin develop

cd ../

docker-compose stop nginx
docker-compose rm --force nginx

docker-compose build nginx
docker-compose up -d nginx

docker-compose stop  frontend-stage
docker-compose rm --force frontend-stage

docker-compose build frontend-stage
docker-compose up -d frontend-stage

docker-compose build models
docker-compose stop  models
docker-compose up -d models

docker-compose up -d frontend-stage
docker-compose up -d postgresql-stage
docker-compose up -d backend-stage
docker-compose up -d certbot-stage




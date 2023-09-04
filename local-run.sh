docker-compose up -d postgresql
docker-compose up -d backend
docker-compose up -d models

cd ./GPTutor-Frontend || exit

npm i --force

npm run start
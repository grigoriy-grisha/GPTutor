FROM node:14 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ../.env.example ./.env

RUN npm run build


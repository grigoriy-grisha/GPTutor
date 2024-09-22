FROM node:18 as builder

COPY package.json package-lock.json ./

RUN npm install --force && mkdir /app && mv ./node_modules ./app

WORKDIR /app

COPY . .

ARG REACT_APP
ENV REACT_APP $REACT_APP

ARG REACT_APP_BACKEND_HOST
ENV REACT_APP_BACKEND_HOST $REACT_APP_BACKEND_HOST

ARG REACT_APP_BACKEND_HOST_WS
ENV REACT_APP_BACKEND_HOST_WS $REACT_APP_BACKEND_HOST_WS

ARG REACT_APP_PLATFORM
ENV REACT_APP_PLATFORM $REACT_APP_PLATFORM

RUN node ./createEnvFile.js && npm run build

FROM nginx:latest

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]

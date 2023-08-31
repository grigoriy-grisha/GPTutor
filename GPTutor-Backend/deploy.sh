#!/usr/bin/env bash

mvn clean install -U

echo 'Restart server...'

pgrep java | xargs kill -9
nohup java -jar ./target/ChatGpt-0.0.1-SNAPSHOT.jar > log.txt &

echo 'Bye'
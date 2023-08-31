FROM maven:3.8.3-openjdk-17

WORKDIR /app

COPY mvnw .

COPY pom.xml .
COPY src src

RUN mvn clean install

EXPOSE 8080

CMD ["java", "-jar", "target/ChatGpt-0.0.1-SNAPSHOT.jar"]

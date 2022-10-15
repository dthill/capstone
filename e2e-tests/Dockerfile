FROM openjdk:20-jdk-bullseye

WORKDIR /app
RUN apt-get update && apt-get install dos2unix
COPY . .

RUN find . -type f -print0 | xargs -0 dos2unix
RUN chmod 777 mvnw

RUN ["./mvnw", "test"]
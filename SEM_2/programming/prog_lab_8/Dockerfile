FROM openjdk:17-jdk-slim
WORKDIR /app
COPY prop.ini prop.ini
COPY server-eight.jar server-eight.jar
EXPOSE 8080
CMD ["java", "-jar", "server-eight.jar"]

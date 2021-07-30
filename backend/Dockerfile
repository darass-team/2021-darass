FROM openjdk:11

COPY . build/libs/*.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=prod", "darass-0.0.1-SNAPSHOT.jar"]
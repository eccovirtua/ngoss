# 1. Etapa de construcción (Usamos Java 21 como base)
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Copiamos los archivos de configuración de Maven
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Descargamos las dependencias (esto hace que las futuras construcciones sean más rápidas)
RUN ./mvnw dependency:go-offline

# Copiamos el resto del código y compilamos el proyecto
COPY src src
RUN ./mvnw clean package -DskipTests

# 2. Etapa de ejecución (Una imagen más ligera solo para correr la app)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copiamos el archivo .jar generado en la etapa anterior
COPY --from=build /app/target/*.jar app.jar

# Exponemos el puerto 8080
EXPOSE 8080

# Comando para arrancar Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]
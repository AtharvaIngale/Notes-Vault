# Stage 1: Build the application
FROM eclipse-temurin:17-jdk as builder

# Set working directory
WORKDIR /workspace

# Copy build files
COPY Backend/Notes-Vault/pom.xml .
COPY Backend/Notes-Vault/mvnw .
COPY Backend/Notes-Vault/.mvn/ .mvn/

# Resolve dependencies
RUN ./mvnw dependency:go-offline -B

# Copy source files
COPY Backend/Notes-Vault/src src/

# Build the application
RUN ./mvnw clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy the built application
COPY --from=builder /workspace/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
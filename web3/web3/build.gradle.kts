plugins {
    id("java")
    id("war")
}

group = "com.ahrorovk"
version = "228"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")
}

// postgresql
dependencies {
    implementation("org.postgresql:postgresql:42.7.4")
    implementation("org.hibernate.orm:hibernate-core:6.6.1.Final")
}

// jakarta
dependencies {
    implementation("jakarta.faces:jakarta.faces-api:4.1.0")
    compileOnly("jakarta.servlet:jakarta.servlet-api:6.1.0")
    implementation("jakarta.persistence:jakarta.persistence-api:3.2.0")
    implementation("jakarta.validation:jakarta.validation-api:3.1.0")
    implementation("jakarta.ejb:jakarta.ejb-api:4.0.1")
    implementation("jakarta.enterprise:jakarta.enterprise.cdi-api:4.1.0")
    implementation("jakarta.inject:jakarta.inject-api:2.0.1")

    implementation("org.primefaces:primefaces:13.0.0:jakarta")
}

// useful
dependencies {
    compileOnly("org.projectlombok:lombok:1.18.34")
    implementation("org.projectlombok:lombok:1.18.34")
    annotationProcessor("org.projectlombok:lombok:1.18.34")
}

tasks.test {
    useJUnitPlatform()
}

tasks.war {
    archiveFileName.set("${project.name}.war")
}
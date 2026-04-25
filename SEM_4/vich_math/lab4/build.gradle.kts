plugins {
    kotlin("jvm") version "2.0.21"
    application
}

group = "ru.itmo"
version = "1.0.0"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(kotlin("test"))
    testImplementation("org.junit.jupiter:junit-jupiter:5.10.0")
}

application {
    mainClass.set("approximation.MainKt")
}

tasks.test {
    useJUnitPlatform()
    testLogging {
        events("passed", "skipped", "failed")
        showStandardStreams = true
    }
}

kotlin {
    // JDK 11 часто недоступен в toolchain на macOS aarch64 без ручной установки;
    // 17 — LTS, нормально ставится через Foojay и совместим с Kotlin 2.0.
    jvmToolchain(17)
}

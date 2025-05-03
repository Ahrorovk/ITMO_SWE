plugins {
    kotlin("jvm") version "1.9.23"
    application
}


group = "org.example"
version = "1.0"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(kotlin("test"))
    implementation(kotlin("stdlib"))
    implementation(files("pack/Pokemon.jar"))
}

application {
    mainClass.set("org.example.Main") // Specify your main class
}
tasks.test {
    useJUnitPlatform()
}
tasks{
    jar {
        manifest {
            attributes["Main-Class"] = "org.example.Main" // Replace with your main class
        }

        // Include all dependencies into the JAR (fat JAR)
        from(sourceSets.main.get().output)
        dependsOn(configurations.runtimeClasspath)
        from({
            configurations.runtimeClasspath.get().filter { it.name.endsWith("jar") }.map { zipTree(it) }
        })
    }
}
kotlin {
    jvmToolchain(17)
}
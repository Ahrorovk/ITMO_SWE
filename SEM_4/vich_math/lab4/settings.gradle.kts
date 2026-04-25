plugins {
    // Автозагрузка JDK по toolchain (иначе: «No matching toolchains… toolchain download repositories have not been configured»)
    id("org.gradle.toolchains.foojay-resolver-convention") version "0.8.0"
}

rootProject.name = "lab4-approximation"

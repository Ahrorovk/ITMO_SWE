package approximation

import java.io.File
import java.util.Locale

/**
 * Коэффициенты Kotlin: φ(x) = coef[0] + coef[1]x + … (возрастающая степень).
 * [numpy.polyval]: старшие степени первыми — [aₙ, aₙ₋₁, …, a₀].
 */
private fun toNumpyPoly1(coef: DoubleArray) = doubleArrayOf(coef[1], coef[0])

private fun toNumpyPoly2(coef: DoubleArray) = doubleArrayOf(coef[2], coef[1], coef[0])

private fun toNumpyPoly3(coef: DoubleArray) = doubleArrayOf(coef[3], coef[2], coef[1], coef[0])

private fun DoubleArray.toJsonArray(): String =
    joinToString(",", prefix = "[", postfix = "]") { String.format(Locale.US, "%.17g", it) }

/**
 * Пишет JSON рядом с отчётом (та же папка) и возвращает абсолютный путь к файлу.
 */
fun writePlotJson(
    reportPath: String,
    xs: DoubleArray,
    ys: DoubleArray,
    linear: ApproximationResult,
    poly2: ApproximationResult,
    poly3: ApproximationResult,
    showTrueCurveVariant1: Boolean
): String {
    val dir = File(reportPath).absoluteFile.parentFile ?: File(".")
    val jsonFile = File(dir, "plot_data.json")
    val p1 = toNumpyPoly1(linear.coefficients)
    val p2 = toNumpyPoly2(poly2.coefficients)
    val p3 = toNumpyPoly3(poly3.coefficients)
    val json = buildString {
        append("{")
        append("\"x_points\":").append(xs.toJsonArray()).append(',')
        append("\"y_points\":").append(ys.toJsonArray()).append(',')
        append("\"poly_linear\":").append(p1.toJsonArray()).append(',')
        append("\"poly_quad\":").append(p2.toJsonArray()).append(',')
        append("\"poly_cubic\":").append(p3.toJsonArray()).append(',')
        append("\"show_true_curve_variant1\":").append(showTrueCurveVariant1).append(',')
        append("\"x_smooth_low\":-0.5,")
        append("\"x_smooth_high\":2.5,")
        val xmin = xs.minOrNull()!! - 0.2
        val xmax = xs.maxOrNull()!! + 0.2
        append("\"x_plot_min\":").append(String.format(Locale.US, "%.6f", xmin)).append(',')
        append("\"x_plot_max\":").append(String.format(Locale.US, "%.6f", xmax))
        append("}")
    }
    jsonFile.writeText(json)
    return jsonFile.absolutePath
}

fun tryLaunchMatplotlibPlot(jsonPath: String): Boolean {
    val cwd = File(System.getProperty("user.dir") ?: ".")
    val script = File(cwd, "plot_approximation.py")
    if (!script.isFile) {
        System.err.println("Не найден ${script.absolutePath} (положите plot_approximation.py в каталог запуска).")
        return false
    }
    val python = findPythonExecutable() ?: run {
        System.err.println("Не найден интерпретатор Python (python3 / python).")
        return false
    }
    return try {
        val pb = ProcessBuilder(python, script.absolutePath, jsonPath)
        pb.directory(cwd)
        pb.redirectErrorStream(true)
        pb.inheritIO()
        val code = pb.start().waitFor()
        code == 0
    } catch (e: Exception) {
        System.err.println("Ошибка запуска графика: ${e.message}")
        false
    }
}

private fun findPythonExecutable(): String? {
    for (cmd in listOf("python3", "python")) {
        try {
            val p = ProcessBuilder(cmd, "--version").start()
            if (p.waitFor() == 0) return cmd
        } catch (_: Exception) {
            continue
        }
    }
    return null
}

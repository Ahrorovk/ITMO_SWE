package approximation

import kotlin.system.exitProcess

private fun List<ApproximationResult>.findByPrefix(prefix: String): ApproximationResult? =
    firstOrNull { it.name.startsWith(prefix) }

fun main(args: Array<String>) {
    val parsed = try {
        parseArgs(args)
    } catch (e: IllegalArgumentException) {
        System.err.println(e.message ?: e.toString())
        exitProcess(1)
    }

    val loaded = try {
        loadData(parsed)
    } catch (e: Exception) {
        System.err.println("Ошибка загрузки данных: ${e.message ?: e}")
        exitProcess(1)
    }

    val xs = loaded.xs
    val ys = loaded.ys

    println("=".repeat(60))
    println("Лабораторная работа №4. Аппроксимация функции методом наименьших квадратов")
    println(loaded.description)
    println("=".repeat(60))
    println()
    println("Исходные данные:")
    print("  xi: "); xs.forEach { print("%-8.3f".format(it)) }; println()
    print("  yi: "); ys.forEach { print("%-8.6f".format(it)) }; println()
    println()

    val results = runAllApproximations(xs, ys)

    val pearson = pearsonR(xs, ys)
    println("Коэффициент корреляции Пирсона (линейная): r = %.3f".format(pearson))
    println()

    println("%-32s | %-10s | %-10s | %-8s".format("Функция", "S", "δ", "R²"))
    println("-".repeat(70))
    results.forEach { r ->
        println("%-32s | %-10.3f | %-10.3f | %-8.3f".format(r.name, r.S, r.stdDeviation, r.r2))
    }
    println()

    val best = results.first()
    println("★ Лучшая аппроксимирующая функция: ${best.name}")
    println("  Коэффициенты: ${best.coefficients.joinToString(", ") { "%.6f".format(it) }}")
    println("  S = %.3f,  δ = %.3f,  R² = %.3f".format(best.S, best.stdDeviation, best.r2))
    println()

    listOf("Линейная", "Полиномиальная 2-й степени").forEach { name ->
        results.findByPrefix(name)?.let { r ->
            println("─".repeat(60))
            println(r)
            println("  xi      | yi         | φ(xi)      | εᵢ")
            xs.indices.forEach { i ->
                println("  %-7.3f | %-10.6f | %-10.6f | %-10.6f".format(
                    xs[i], ys[i], r.approximated[i], r.deviations[i]))
            }
            println()
        }
    }

    // ASCII chart
    val series = mutableListOf("Исходная f(x)" to ys)
    results.findByPrefix("Линейная")?.let { series.add(it.name to it.approximated) }
    results.findByPrefix("Полиномиальная 2-й степени")?.let { series.add(it.name to it.approximated) }
    results.find { it.name == best.name }?.let {
        if (!it.name.startsWith("Линейная") && !it.name.startsWith("Полиномиальная 2-й степени"))
            series.add(it.name to it.approximated)
    }
    println(asciiChart(xs, series))

    // report
    val outPath = parsed.reportPath
    writeReport(xs, ys, results, pearson, loaded.description, outPath)
    println("Отчёт сохранён: $outPath")

    // График matplotlib
    if (parsed.showPlot) {
        val linear = results.findByPrefix("Линейная")
        val poly2 = results.findByPrefix("Полиномиальная 2-й степени")
        val poly3 = results.findByPrefix("Полиномиальная 3-й степени")

        if (linear != null && poly2 != null && poly3 != null) {
            val showTrue = loaded.description.contains("Вариант 1", ignoreCase = true)
            val jsonPath = writePlotJson(outPath, xs, ys, linear, poly2, poly3, showTrue)
            println("Данные для графика: $jsonPath")
            if (tryLaunchMatplotlibPlot(jsonPath)) {
                println("График matplotlib выполнен (см. также approximation_plot.png рядом с отчётом).")
            }
        } else {
            System.err.println(
                "График не построен: не найдены результаты для линейной/квадратичной/кубической аппроксимации."
            )
        }
    }
}

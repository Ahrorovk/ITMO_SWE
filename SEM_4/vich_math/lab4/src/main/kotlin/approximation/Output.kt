package approximation

import java.io.File

// ─────────────────────────────────────────────────────────────
//  Simple ASCII chart (for console output)
// ─────────────────────────────────────────────────────────────

fun asciiChart(
    xs: DoubleArray,
    series: List<Pair<String, DoubleArray>>,
    width: Int = 70,
    height: Int = 20
): String {
    val allY = series.flatMap { (_, ys) -> ys.filter { it.isFinite() } }
    val yMin = allY.minOrNull()!! - 0.05
    val yMax = allY.maxOrNull()!! + 0.05
    val xMin = xs.first()
    val xMax = xs.last()

    val symbols = listOf('*', 'o', '+', '#', '@', 'x')
    val grid = Array(height + 1) { CharArray(width + 1) { ' ' } }

    // Draw axes
    val yZeroRow = ((yMax / (yMax - yMin)) * height).toInt().coerceIn(0, height)
    for (c in 0..width) grid[yZeroRow][c] = '-'
    val xZeroCol = ((-xMin / (xMax - xMin)) * width).toInt().coerceIn(0, width)
    for (r in 0..height) grid[r][xZeroCol] = '|'

    // Plot each series
    series.forEachIndexed { idx, (_, ys) ->
        val sym = symbols[idx % symbols.size]
        xs.indices.forEach { i ->
            if (ys[i].isFinite()) {
                val col = (((xs[i] - xMin) / (xMax - xMin)) * width).toInt().coerceIn(0, width)
                val row = (((yMax - ys[i]) / (yMax - yMin)) * height).toInt().coerceIn(0, height)
                grid[row][col] = sym
            }
        }
    }

    val sb = StringBuilder()
    sb.appendLine("Y")
    grid.forEach { row -> sb.appendLine(String(row)) }
    sb.appendLine("X".padStart(width))
    sb.appendLine()
    series.forEachIndexed { idx, (name, _) ->
        sb.appendLine("  ${symbols[idx % symbols.size]} = $name")
    }
    return sb.toString()
}

// ─────────────────────────────────────────────────────────────
//  Report to file
// ─────────────────────────────────────────────────────────────

fun writeReport(
    xs: DoubleArray,
    ys: DoubleArray,
    results: List<ApproximationResult>,
    pearson: Double,
    dataDescription: String,
    filePath: String
) {
    val sb = StringBuilder()
    sb.appendLine("Лабораторная работа №4. Аппроксимация функции методом наименьших квадратов")
    sb.appendLine(dataDescription)
    sb.appendLine("=".repeat(60))
    sb.appendLine()
    sb.appendLine("Исходные данные:")
    sb.appendLine("  xi: ${xs.joinToString(" | ") { "%.3f".format(it) }}")
    sb.appendLine("  yi: ${ys.joinToString(" | ") { "%.6f".format(it) }}")
    sb.appendLine()
    sb.appendLine("Коэффициент корреляции Пирсона (линейная): r = %.3f".format(pearson))
    sb.appendLine()
    sb.appendLine("─".repeat(60))
    sb.appendLine("Результаты аппроксимации (отсортированы по δ):")
    sb.appendLine("─".repeat(60))

    results.forEach { r ->
        sb.appendLine()
        sb.appendLine(r.toString())
        sb.appendLine("  xi      | yi       | φ(xi)    | εᵢ")
        xs.indices.forEach { i ->
            sb.appendLine("  %-7.3f | %-8.6f | %-8.6f | %-8.6f".format(
                xs[i], ys[i], r.approximated[i], r.deviations[i]))
        }
    }

    sb.appendLine()
    sb.appendLine("═".repeat(60))
    sb.appendLine("ЛУЧШАЯ аппроксимирующая функция: ${results.first().name}")
    sb.appendLine("  δ = %.3f,  S = %.3f,  R² = %.3f".format(
        results.first().stdDeviation, results.first().S, results.first().r2))

    // ASCII plots
    sb.appendLine()
    sb.appendLine("─".repeat(60))
    sb.appendLine("Графики (ASCII):")
    val series = mutableListOf("Исходная функция" to ys)
    results.take(3).forEach { r -> series.add(r.name to r.approximated) }
    sb.append(asciiChart(xs, series))

    File(filePath).writeText(sb.toString())
}

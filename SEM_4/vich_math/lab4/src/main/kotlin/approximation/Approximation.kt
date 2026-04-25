package approximation

import kotlin.math.*

data class ApproximationResult(
    val name: String,
    val coefficients: DoubleArray,
    val approximated: DoubleArray,
    val deviations: DoubleArray,       // εᵢ = φ(xᵢ) - yᵢ
    val S: Double,                     // Σεᵢ²
    val stdDeviation: Double,          // δ = sqrt(S/n)
    val r2: Double                     // достоверность аппроксимации
) {
    override fun toString(): String = buildString {
        appendLine("=== $name ===")
        appendLine("Коэффициенты: ${coefficients.joinToString(", ") { "%.6f".format(it) }}")
        appendLine("S = %.6f".format(S))
        appendLine("δ = %.6f".format(stdDeviation))
        appendLine("R² = %.6f".format(r2))
    }
}

//  A·x = b
fun gaussianElimination(a: Array<DoubleArray>, b: DoubleArray): DoubleArray {
    val n = b.size
    val aug = Array(n) { i -> DoubleArray(n + 1) { j -> if (j < n) a[i][j] else b[i] } }

    for (col in 0 until n) {
        // Partial pivoting
        var maxRow = col
        for (row in col + 1 until n) {
            if (abs(aug[row][col]) > abs(aug[maxRow][col])) maxRow = row
        }
        val tmp = aug[col]; aug[col] = aug[maxRow]; aug[maxRow] = tmp

        if (abs(aug[col][col]) < 1e-12) throw ArithmeticException("Singular matrix at column $col")

        for (row in col + 1 until n) {
            val factor = aug[row][col] / aug[col][col]
            for (k in col..n) aug[row][k] -= factor * aug[col][k]
        }
    }

    val x = DoubleArray(n)
    for (i in n - 1 downTo 0) {
        x[i] = aug[i][n]
        for (j in i + 1 until n) x[i] -= aug[i][j] * x[j]
        x[i] /= aug[i][i]
    }
    return x
}

//  S-matrix for polynomial MNK  (m)
fun buildNormalSystem(xs: DoubleArray, ys: DoubleArray, degree: Int): Pair<Array<DoubleArray>, DoubleArray> {
    val n = xs.size
    val m = degree + 1
    val A = Array(m) { DoubleArray(m) }
    val b = DoubleArray(m)

    for (row in 0 until m) {
        for (col in 0 until m) {
            A[row][col] = xs.sumOf { it.pow((row + col).toDouble()) }
        }
        b[row] = xs.indices.sumOf { i -> xs[i].pow(row.toDouble()) * ys[i] }
    }
    return A to b
}

//  Quality metrics
fun computeMetrics(
    xs: DoubleArray,
    ys: DoubleArray,
    phi: (Double) -> Double
): Triple<DoubleArray, Double, Double> {
    val n = xs.size
    val approx = DoubleArray(n) { phi(xs[it]) }
    val eps = DoubleArray(n) { approx[it] - ys[it] }
    val S = eps.sumOf { it * it }
    val delta = sqrt(S / n)
    return Triple(eps, S, delta)
}

fun computeR2(ys: DoubleArray, phi: DoubleArray): Double {
    val n = ys.size
    val ssRes = ys.indices.sumOf { (ys[it] - phi[it]).pow(2.0) }
    // denominator
    val sumPhi = phi.sum()
    val denom = phi.sumOf { it * it } - sumPhi * sumPhi / n
    return if (abs(denom) < 1e-12) 1.0 else 1.0 - ssRes / denom
}

//  Pearson correlation coefficient (linear)
fun pearsonR(xs: DoubleArray, ys: DoubleArray): Double {
    val n = xs.size
    val xMean = xs.average()
    val yMean = ys.average()
    val num = xs.indices.sumOf { (xs[it] - xMean) * (ys[it] - yMean) }
    val den = sqrt(xs.sumOf { (it - xMean).pow(2.0) } * ys.sumOf { (it - yMean).pow(2.0) })
    return if (abs(den) < 1e-12) 0.0 else num / den
}

//  Six approximation methods

fun linearApproximation(xs: DoubleArray, ys: DoubleArray): ApproximationResult {
    val (A, b) = buildNormalSystem(xs, ys, 1)
    val coef = gaussianElimination(A, b)          // coef[0]=b, coef[1]=a
    val phi: (Double) -> Double = { x -> coef[0] + coef[1] * x }
    val n = xs.size
    val approx = DoubleArray(n) { phi(xs[it]) }
    val (eps, S, delta) = computeMetrics(xs, ys, phi)
    val r2 = computeR2(ys, approx)
    return ApproximationResult("Линейная (ax+b)", coef, approx, eps, S, delta, r2)
}

fun poly2Approximation(xs: DoubleArray, ys: DoubleArray): ApproximationResult {
    val (A, b) = buildNormalSystem(xs, ys, 2)
    val coef = gaussianElimination(A, b)
    val phi: (Double) -> Double = { x -> coef[0] + coef[1] * x + coef[2] * x * x }
    val n = xs.size
    val approx = DoubleArray(n) { phi(xs[it]) }
    val (eps, S, delta) = computeMetrics(xs, ys, phi)
    return ApproximationResult("Полиномиальная 2-й степени(φ(x) = a₀ + a₁x + a₂x²)", coef, approx, eps, S, delta, computeR2(ys, approx))
}

fun poly3Approximation(xs: DoubleArray, ys: DoubleArray): ApproximationResult {
    val (A, b) = buildNormalSystem(xs, ys, 3)
    val coef = gaussianElimination(A, b)
    val phi: (Double) -> Double = { x -> coef[0] + coef[1] * x + coef[2] * x * x + coef[3] * x * x * x }
    val n = xs.size
    val approx = DoubleArray(n) { phi(xs[it]) }
    val (eps, S, delta) = computeMetrics(xs, ys, phi)
    return ApproximationResult("Полиномиальная 3-й степени(φ(x) = a₀ + a₁x + a₂x² + a₃x³)", coef, approx, eps, S, delta, computeR2(ys, approx))
}

fun exponentialApproximation(xs: DoubleArray, ys: DoubleArray): ApproximationResult {
    val validIdx = ys.indices.filter { ys[it] > 0.0 }
    val xsF = validIdx.map { xs[it] }.toDoubleArray()
    val ysF = validIdx.map { ln(ys[it]) }.toDoubleArray()
    val (A, b) = buildNormalSystem(xsF, ysF, 1)
    val coef = gaussianElimination(A, b)   // coef[0]=ln(a), coef[1]=b
    val a = exp(coef[0])
    val bCoef = coef[1]
    val phi: (Double) -> Double = { x -> a * exp(bCoef * x) }
    val n = xs.size
    val approx = DoubleArray(n) { phi(xs[it]) }
    val (eps, S, delta) = computeMetrics(xs, ys, phi)
    return ApproximationResult("Экспоненциальная (a·e^(bx) : линейная - ln(y) = ln(a) + b·x)", doubleArrayOf(a, bCoef), approx, eps, S, delta, computeR2(ys, approx))
}

/**
 *  valid for x > 0
 */
fun logarithmicApproximation(xs: DoubleArray, ys: DoubleArray): ApproximationResult {
    val validIdx = xs.indices.filter { xs[it] > 0.0 }
    val xsF = validIdx.map { ln(xs[it]) }.toDoubleArray()
    val ysF = validIdx.map { ys[it] }.toDoubleArray()
    val (A, b) = buildNormalSystem(xsF, ysF, 1)
    val coef = gaussianElimination(A, b)   // coef[0]=b, coef[1]=a
    val phi: (Double) -> Double = { x -> if (x > 0.0) coef[0] + coef[1] * ln(x) else Double.NaN }
    val n = xs.size
    val approx = DoubleArray(n) { phi(xs[it]) }
    val (eps, S, delta) = computeMetrics(xs, ys, phi)
    return ApproximationResult("Логарифмическая (a·ln(x)+b)", coef, approx, eps, S, delta, computeR2(ys, approx))
}

/**
 * valid for x > 0, y > 0
 */
fun powerApproximation(xs: DoubleArray, ys: DoubleArray): ApproximationResult {
    val validIdx = xs.indices.filter { xs[it] > 0.0 && ys[it] > 0.0 }
    val xsF = validIdx.map { ln(xs[it]) }.toDoubleArray()
    val ysF = validIdx.map { ln(ys[it]) }.toDoubleArray()
    val (A, b) = buildNormalSystem(xsF, ysF, 1)
    val coef = gaussianElimination(A, b)   // coef[0]=ln(a), coef[1]=b
    val a = exp(coef[0])
    val bCoef = coef[1]
    val phi: (Double) -> Double = { x -> if (x > 0.0) a * x.pow(bCoef) else Double.NaN }
    val n = xs.size
    val approx = DoubleArray(n) { phi(xs[it]) }
    val (eps, S, delta) = computeMetrics(xs, ys, phi)
    return ApproximationResult("Степенная (a·x^b: линейная - ln(y) = ln(a) + b·ln(x))", doubleArrayOf(a, bCoef), approx, eps, S, delta, computeR2(ys, approx))
}

//  Runner
fun runAllApproximations(xs: DoubleArray, ys: DoubleArray): List<ApproximationResult> {
    val results = mutableListOf<ApproximationResult>()
    results += linearApproximation(xs, ys)
    results += poly2Approximation(xs, ys)
    results += poly3Approximation(xs, ys)
    try { results += exponentialApproximation(xs, ys) } catch (_: Exception) {}
    try { results += logarithmicApproximation(xs, ys) } catch (_: Exception) {}
    try { results += powerApproximation(xs, ys) } catch (_: Exception) {}
    return results.sortedBy { it.stdDeviation }
}

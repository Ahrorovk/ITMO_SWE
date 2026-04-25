import java.io.File
import java.util.*
import kotlin.math.abs

data class IterationResult(
    val x: DoubleArray,
    val iterations: Int,
    val errors: DoubleArray,
    val matrixNorm: Double
)

class SimpleIterationSolver {

    fun makeDiagonallyDominant(A: Array<DoubleArray>, b: DoubleArray): Boolean {
        val n = A.size
        val usedRows = BooleanArray(n)
        val newA = Array(n) { DoubleArray(n) }
        val newB = DoubleArray(n)

        for (i in 0 until n) {
            var foundRow = -1
            for (j in 0 until n) {
                if (usedRows[j]) continue

                val diag = abs(A[j][i])
                val sumOthers = A[j].indices.filter { it != i }.sumOf { abs(A[j][it]) }

                if (diag >= sumOthers) {
                    foundRow = j
                    break
                }
            }

            if (foundRow != -1) {
                newA[i] = A[foundRow].clone()
                newB[i] = b[foundRow]
                usedRows[foundRow] = true
            } else {
                return false
            }
        }

        for (i in 0 until n) {
            A[i] = newA[i]
            b[i] = newB[i]
        }
        return true
    }

    fun solve(A: Array<DoubleArray>, b: DoubleArray, epsilon: Double, maxIter: Int = 1000): IterationResult? {
        val n = A.size

        val alpha = Array(n) { DoubleArray(n) }
        val beta = DoubleArray(n)

        for (i in 0 until n) {
            val aii = A[i][i]
            if (abs(aii) < 1e-15) return null

            beta[i] = b[i] / aii
            for (j in 0 until n) {
                alpha[i][j] = if (i == j) 0.0 else -A[i][j] / aii
            }
        }

        val norm = alpha.maxOf { row -> row.sumOf { abs(it) } }

        var xCurr = beta.clone()
        var iterations = 0
        var errors = DoubleArray(n)

        while (iterations < maxIter) {
            val xNext = DoubleArray(n)
            var maxError = 0.0

            for (i in 0 until n) {
                var sum = 0.0
                for (j in 0 until n) {
                    sum += alpha[i][j] * xCurr[j]
                }
                xNext[i] = beta[i] + sum

                val currentError = abs(xNext[i] - xCurr[i])
                errors[i] = currentError
                if (currentError > maxError) maxError = currentError
            }

            iterations++
            xCurr = xNext

            if (maxError <= epsilon) break
        }

        return IterationResult(xCurr, iterations, errors, norm)
    }
}

fun main() {
    val sc = Scanner(System.`in`).useLocale(Locale.US)
    val solver = SimpleIterationSolver()

    println("=== ЛР №1: Метод простых итераций ===")
    print("Ввод: 1 - Клавиатура, 2 - Файл: ")
    val inputSource = sc.nextInt()

    val n: Int
    val a: Array<DoubleArray>
    val b: DoubleArray
    val eps: Double

    try {
        val input = if (inputSource == 2) {
            print("Введите путь к файлу: ")
            Scanner(File(sc.next())).useLocale(Locale.US)
        } else sc

        if (inputSource == 1) print("Размерность n (<= 20): ")
        n = input.nextInt()
        if (n > 20) throw Exception("Размерность не должна превышать 20")

        a = Array(n) { DoubleArray(n) }
        if (inputSource == 1) println("Введите коэффициенты матрицы A (построчно):")
        for (i in 0 until n) {
            for (j in 0 until n) a[i][j] = input.nextDouble()
        }

        b = DoubleArray(n)
        if (inputSource == 1) println("Введите вектор B (сверху вниз):")
        for (i in 0 until n) b[i] = input.nextDouble()

        if (inputSource == 1) print("Точность epsilon: ")
        eps = input.nextDouble()

        if (!solver.makeDiagonallyDominant(a, b)) {
            println("\n[!] Диагональное преобладание не достигнуто. Метод может разойтись.")
        } else {
            println("\n[+] Диагональное преобладание обеспечено.")
        }

        val res = solver.solve(a, b, eps)

        if (res != null) {
            println("\n--- РЕЗУЛЬТАТЫ ---")
            println("Норма матрицы Alpha: %.4f".format(res.matrixNorm))
            println("Число итераций: ${res.iterations}")
            println("\nВектор X:")
            res.x.forEachIndexed { i, v -> println("x[%d] = %.6f".format(i + 1, v)) }
            println("\nВектор погрешностей |x(k) - x(k-1)|:")
            res.errors.forEachIndexed { i, v -> println("e[%d] = %.2e".format(i + 1, v)) }
        } else {
            println("Ошибка: деление на ноль (нулевой элемент на диагонали).")
        }

    } catch (e: Exception) {
        println("Ошибка при вводе данных: ${e.message}")
    }
}
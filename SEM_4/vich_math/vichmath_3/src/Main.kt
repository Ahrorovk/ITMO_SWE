import java.util.Scanner
import kotlin.math.*

/**
 * Лабораторная работа №3. Численное интегрирование
 * Студент: Ахроров Кароматуллохон Фирдавсович
 * Группа: P3210
 */

object TargetFunctions {
    // 1
    fun f1(x: Double): Double = -x.pow(3) - x.pow(2) - 2 * x + 1
    // 2
    fun f2(x: Double): Double = -3 * x.pow(3) - 5 * x.pow(2) + 4 * x - 2
    // 7
    fun f3(x: Double): Double = 4 * x.pow(3) - 5 * x.pow(2) + 6 * x - 7

    // 1/sqrt(x) на [0, 1] - сходящийся (разрыв в x=0)
    fun fImproperA(x: Double): Double = 1.0 / sqrt(x)
    // 1/sqrt(1-x) на [0, 1] - сходящийся (разрыв в точке b=1)
    fun fImproperB(x: Double): Double = 1.0 / sqrt(1.0 - x)
    // 1/(x-1) на [0, 2] - расходящийся (разрыв в x=1)
    fun fImproperInside(x: Double): Double = 1.0 / (x - 1.0)
}

object IntegrationMethods {

    fun leftRectangles(f: (Double) -> Double, a: Double, b: Double, n: Int): Double {
        val h = (b - a) / n
        return (0 until n).sumOf { f(a + it * h) } * h
    }

    fun rightRectangles(f: (Double) -> Double, a: Double, b: Double, n: Int): Double {
        val h = (b - a) / n
        return (1..n).sumOf { f(a + it * h) } * h
    }

    fun middleRectangles(f: (Double) -> Double, a: Double, b: Double, n: Int): Double {
        val h = (b - a) / n
        return (0 until n).sumOf { f(a + it * h + h / 2.0) } * h
    }

    fun trapezoidal(f: (Double) -> Double, a: Double, b: Double, n: Int): Double {
        val h = (b - a) / n
        val sum = (f(a) + f(b)) / 2.0 + (1 until n).sumOf { f(a + it * h) }
        return h * sum
    }

    fun simpson(f: (Double) -> Double, a: Double, b: Double, n: Int): Double {
        val adjustedN = if (n % 2 != 0) n + 1 else n
        val h = (b - a) / adjustedN
        var sum = f(a) + f(b)
        for (i in 1 until adjustedN) {
            val coef = if (i % 2 == 0) 2 else 4
            sum += coef * f(a + i * h)
        }
        return sum * h / 3.0
    }
}

fun main() {
    val sc = Scanner(System.`in`)

    println("--- Лабораторная работа №3 ---")

    val mode = readInt(
        sc,
        "1. Обычный режим\n2. Несобственный интеграл\nВыбор: ",
        1,
        2
    )

    if (mode == 1) runStandardMode(sc)
    else runImproperMode(sc)
}

fun runStandardMode(sc: Scanner) {

    println("\nВыберите функцию:")
    println("1: -x^3 - x^2 - 2x + 1")
    println("2: -3x^3 - 5x^2 + 4x - 2")
    println("3: 4x^3 - 5x^2 + 6x - 7")

    val fIdx = readInt(sc, "Ваш выбор: ", 1, 3)

    val f = when(fIdx) {
        1 -> TargetFunctions::f1
        2 -> TargetFunctions::f2
        else -> TargetFunctions::f3
    }

    println("Выберите метод:")
    println("1: Левые, 2: Правые, 3: Средние, 4: Трапеции, 5: Симпсон")

    val mIdx = readInt(sc, "Ваш выбор: ", 1, 5)

    val (method, order) = when(mIdx) {
        1 -> Pair(IntegrationMethods::leftRectangles, 1)
        2 -> Pair(IntegrationMethods::rightRectangles, 1)
        3 -> Pair(IntegrationMethods::middleRectangles, 2)
        4 -> Pair(IntegrationMethods::trapezoidal, 2)
        else -> Pair(IntegrationMethods::simpson, 4)
    }

    val (a, b) = readInterval(sc)
    val eps = readEps(sc)

    var n = 4
    var prevRes = method(f, a, b, n)
    var currRes: Double
    var error: Double
    var iter = 0

    while (true) {
        n *= 2
        currRes = method(f, a, b, n)
        error = abs(currRes - prevRes) / (2.0.pow(order) - 1)

        if (error <= eps) break

        prevRes = currRes
        if (iter++ > 20) {
            println("Не удалось достичь точности")
            break
        }
    }

    println("\n=== Результат ===")
    println("Интеграл: $currRes")
    println("n: $n")
    println("Погрешность: $error")
}

fun runImproperMode(sc: Scanner) {
    println("\n--- Несобственные интегралы 2 рода ---")
    println("1: 1/sqrt(x) на [0, 1] (Разрыв в точке a, сходится)")
    println("2: 1/sqrt(1-x) на [0, 1] (Разрыв в точке b, сходится)")
    println("3: 1/(x-1) на [0, 2] (Разрыв внутри в x=1, расходится)")
    val choice = readInt(sc,"Выберите функцию: ",1,3)

    val sigma = 1e-7
    val n = 10000

    when (choice) {
        1 -> {
            val res = IntegrationMethods.middleRectangles(TargetFunctions::fImproperA, 0.0 + sigma, 1.0, n)
            checkResult(res)
        }
        2 -> {
            val res = IntegrationMethods.middleRectangles(TargetFunctions::fImproperB, 0.0, 1.0 - sigma, n)
            checkResult(res)
        }
        3 -> {
            val f = TargetFunctions::fImproperInside

            if (abs(f(1.0 - sigma)) > 1e6 || abs(f(1.0 + sigma)) > 1e6) {
                println("Интеграл не существует")
            } else {
                val leftPart = IntegrationMethods.middleRectangles(f, 0.0, 1.0 - sigma, n)
                val rightPart = IntegrationMethods.middleRectangles(f, 1.0 + sigma, 2.0, n)
                checkResult(leftPart + rightPart)
            }
        }
    }
}

fun checkResult(res: Double) {
    if (res.isNaN() || res.isInfinite() || abs(res) > 1e6) {
        println("Интеграл не существует")
    } else {
        println("Результат вычисления: $res")
    }
}
fun readInt(sc: Scanner, message: String, min: Int = -1000, max: Int = 1000): Int {
    while (true) {
        print(message)
        try {
            val value = sc.nextInt()
            if (value in min..max) return value
            else println("Ошибка! Введите число от $min до $max")
        } catch (e: Exception) {
            println("Ошибка! Введите целое число.")
            sc.nextLine() // очистка буфера
        }
    }
}
fun readDouble(sc: Scanner, message: String, min: Double = -100000.0, max: Double= 100000.0): Double {
    while (true) {
        print(message)
        try {
            val value = sc.nextDouble()
            if (value in min..max) return value
            else println("Ошибка! Введите число от $min до $max")
        } catch (e: Exception) {
            println("Ошибка! Введите число (например: 1.5)")
            sc.nextLine()
        }
    }
}
fun readInterval(sc: Scanner): Pair<Double, Double> {
    while (true) {
        val a = readDouble(sc, "Введите a: ")
        val b = readDouble(sc, "Введите b: ")

        if (b > a) return Pair(a, b)
        else println("Ошибка! b должно быть больше a")
    }
}
fun readEps(sc: Scanner): Double {
    while (true) {
        val eps = readDouble(sc, "Введите точность: ",1e-6,0.1)
        if (eps > 0) return eps
        else println("Ошибка! Точность должна быть > 0")
    }
}

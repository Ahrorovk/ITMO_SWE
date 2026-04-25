import kotlin.math.*

data class Equation(
    val name: String,
    val f: (Double) -> Double,
    val df: (Double) -> Double,
    val d2f: (Double) -> Double
)

data class NonlinearSystem(
    val name: String,
    val f1: (Double, Double) -> Double,
    val f2: (Double, Double) -> Double,
    val jacobian: (Double, Double) -> DoubleArray
)


fun readInt(prompt: String, validRange: IntRange? = null): Int {
    while (true) {
        print(prompt)
        val input = readlnOrNull()?.trim()
        if (input.isNullOrEmpty()) {
            println("Ошибка: Ввод не может быть пустым. Повторите.")
            continue
        }
        try {
            val value = input.toInt()
            if (validRange != null && value !in validRange) {
                println("Ошибка: Выберите вариант из диапазона $validRange.")
                continue
            }
            return value
        } catch (e: NumberFormatException) {
            println("Ошибка: Введите целое число.")
        }
    }
}

fun readDouble(prompt: String, condition: ((Double) -> Boolean)? = null, conditionError: String = ""): Double {
    while (true) {
        print(prompt)
        val input = readlnOrNull()?.trim()?.replace(',', '.')
        if (input.isNullOrEmpty()) {
            println("Ошибка: Ввод не может быть пустым. Повторите.")
            continue
        }
        try {
            val value = input.toDouble()
            if (condition != null && !condition(value)) {
                println("Ошибка: $conditionError")
                continue
            }
            return value
        } catch (e: NumberFormatException) {
            println("Ошибка: Введите вещественное число (например, 1.5 или 1,5).")
        }
    }
}

fun main() {
    println("=== Лабораторная работа №2 ===")
    while (true) {
        println("\nГлавное меню:")
        println("1. Решение нелинейного уравнения")
        println("2. Решение системы нелинейных уравнений")
        println("0. Выход")

        when (readInt("Выбор: ", 0..2)) {
            1 -> solveSingleEquation()
            2 -> solveSystem()
            0 -> {
                println("Завершение работы программы.")
                return
            }
        }
    }
}

fun solveSingleEquation() {
    val equations = listOf(
        Equation(
            "1. 2.74*x^3 - 1.93*x^2 - 15.28*x - 3.72 = 0",
            { x -> 2.74 * x.pow(3) - 1.93 * x.pow(2) - 15.28 * x - 3.72 },
            { x -> 8.22 * x.pow(2) - 3.86 * x - 15.28 },
            { x -> 16.44 * x - 3.86 }
        ),
        Equation(
            "2. x^2 - e^x = 0 (Трансцендентное)",
            { x -> x * x - exp(x) },
            { x -> 2 * x - exp(x) },
            { x -> 2 - exp(x) }
        ),
        Equation(
            "3. sin(x) + 0.1*x - 0.5 = 0 (Трансцендентное)",
            { x -> sin(x) + 0.1 * x - 0.5 },
            { x -> cos(x) + 0.1 },
            { x -> -sin(x) }
        )
    )

    println("\nВыберите уравнение:")
    equations.forEach { println(it.name) }
    val eqIdx = readInt("Ввод: ", 1..equations.size) - 1
    val eq = equations[eqIdx]

    var a: Double
    var b: Double
    while (true) {
        a = readDouble("Введите левую границу интервала (a): ")
        b = readDouble("Введите правую границу интервала (b): ")
        if (a >= b) {
            println("Ошибка: Левая граница (a) должна быть строго меньше правой (b). Повторите ввод.")
        } else {
            break
        }
    }

    val epsilon = readDouble(
        prompt = "Введите погрешность (например, 0.01): ",
        condition = { it > 0 },
        conditionError = "Погрешность должна быть строго больше 0."
    )

    if (eq.f(a) * eq.f(b) > 0) {
        println("\nВНИМАНИЕ: На концах интервала [$a; $b] функция имеет одинаковые знаки (f(a)=${eq.f(a)}, f(b)=${eq.f(b)}).")
        println("Корней на интервале нет, либо их четное количество. Выберите другой интервал.")
        return
    }

    println("\nВыберите метод:")
    println("1. Метод хорд (Метод 2)")
    println("2. Метод Ньютона (Метод 3)")
    println("3. Метод простой итерации (Метод 5)")

    when (readInt("Ввод: ", 1..3)) {
        1 -> methodChord(eq, a, b, epsilon)
        2 -> methodNewton(eq, a, b, epsilon)
        3 -> methodSimpleIteration(eq, a, b, epsilon)
    }
}

fun methodChord(eq: Equation, a: Double, b: Double, epsilon: Double) {
    println("\n--- Метод хорд ---")
    var fixed: Double
    var current: Double
    if (eq.f(a) * eq.d2f(a) > 0) {
        fixed = a
        current = b
    } else {
        fixed = b
        current = a
    }

    var iter = 0
    var next: Double
    var diff: Double
    do {
        val fCurrent = eq.f(current)
        val fFixed = eq.f(fixed)
        if (abs(fCurrent - fFixed) < 1e-15) {
            println("Ошибка: Деление на ноль в формуле метода хорд.")
            return
        }
        next = current - (fCurrent * (current - fixed)) / (fCurrent - fFixed)
        diff = abs(next - current)
        current = next
        iter++

        if (iter > 10000) {
            println("Превышен лимит итераций (10000). Процесс расходится.")
            return
        }
    } while (abs(eq.f(current)) > epsilon && diff > epsilon)

    printResult(current, eq.f(current), iter)
}

fun methodNewton(eq: Equation, a: Double, b: Double, epsilon: Double) {
    println("\n--- Метод Ньютона ---")
    var current = if (eq.f(a) * eq.d2f(a) > 0) a else b

    var iter = 0
    var diff: Double
    do {
        val dfVal = eq.df(current)
        if (abs(dfVal) < 1e-15) {
            println("Ошибка: Производная равна нулю. Метод Ньютона не применим.")
            return
        }
        val next = current - eq.f(current) / dfVal
        diff = abs(next - current)
        current = next
        iter++

        if (iter > 10000) {
            println("Превышен лимит итераций (10000). Процесс расходится.")
            return
        }
    } while (abs(eq.f(current)) > epsilon && diff > epsilon)

    printResult(current, eq.f(current), iter)
}

fun methodSimpleIteration(eq: Equation, a: Double, b: Double, epsilon: Double) {
    println("\n--- Метод простой итерации ---")

    val steps = 100
    val step = (b - a) / steps
    var maxDf = 0.0
    for (i in 0..steps) {
        val x = a + i * step
        if (abs(eq.df(x)) > maxDf) maxDf = abs(eq.df(x))
    }

    if (maxDf < 1e-15) {
        println("Производная слишком близка к нулю на интервале.")
        return
    }

    val lambda = -1.0 / maxDf * sign(eq.df(a))

    var maxPhiDeriv = 0.0
    for (i in 0..steps) {
        val x = a + i * step
        val phiDeriv = 1.0 + lambda * eq.df(x)
        if (abs(phiDeriv) > maxPhiDeriv) maxPhiDeriv = abs(phiDeriv)
    }

    if (maxPhiDeriv >= 1.0) {
        println("ВНИМАНИЕ: Достаточное условие сходимости не выполнено! (|phi'(x)| = $maxPhiDeriv >= 1)")
        println("Попробуйте сузить интервал изоляции корня.")
    } else {
        println("Достаточное условие сходимости выполнено: max |phi'(x)| = $maxPhiDeriv < 1")
    }

    var current = a
    var iter = 0
    var diff: Double
    do {
        val next = current + lambda * eq.f(current)
        diff = abs(next - current)
        current = next
        iter++

        if (iter > 10000) {
            println("Процесс расходится. Достигнут лимит итераций (10000).")
            return
        }
    } while (diff > epsilon)

    printResult(current, eq.f(current), iter)
}

fun printResult(x: Double, fx: Double, iter: Int) {
    println("\n=== РЕЗУЛЬТАТ ===")
    println("Найденный корень: x = $x")
    println("Значение функции f(x) = $fx")
    println("Число итераций: $iter")
    println("=================\n")
}

fun solveSystem() {
    val systems = listOf(
        NonlinearSystem(
            "1. sin(x+1) - y = 1.2 \n   2x + cos(y) = 2",
            { x, y -> sin(x + 1) - y - 1.2 },
            { x, y -> 2 * x + cos(y) - 2.0 },
            { x, y -> doubleArrayOf(cos(x + 1), -1.0, 2.0, -sin(y)) }
        ),
        NonlinearSystem(
            "2. x^2 + 2y^2 = 1 \n   x - cos(y) = 3",
            { x, y -> x * x + 2 * y * y - 1.0 },
            { x, y -> x - cos(y) - 3.0 },
            { x, y -> doubleArrayOf(2 * x, 4 * y, 1.0, sin(y)) }
        )
    )

    println("\nВыберите систему нелинейных уравнений:")
    systems.forEachIndexed { index, sys -> println("${index + 1}.\n${sys.name}") }
    val sysIdx = readInt("Ввод: ", 1..systems.size) - 1
    val sys = systems[sysIdx]

    println("\nВведите начальное приближение:")
    var x = readDouble("x0 = ")
    var y = readDouble("y0 = ")

    val epsilon = readDouble(
        prompt = "Введите погрешность (например, 0.01): ",
        condition = { it > 0 },
        conditionError = "Погрешность должна быть строго больше 0."
    )

    println("\n--- Метод Ньютона для систем ---")
    var iter = 0
    var errorX: Double
    var errorY: Double

    do {
        val f1Val = sys.f1(x, y)
        val f2Val = sys.f2(x, y)

        val jac = sys.jacobian(x, y)
        val j11 = jac[0]; val j12 = jac[1]
        val j21 = jac[2]; val j22 = jac[3]

        val det = j11 * j22 - j12 * j21
        if (abs(det) < 1e-15) {
            println("Ошибка: Определитель матрицы Якоби равен нулю. Метод Ньютона не применим.")
            return
        }

        val deltaX = (-f1Val * j22 - (-f2Val) * j12) / det
        val deltaY = (j11 * (-f2Val) - j21 * (-f1Val)) / det

        x += deltaX
        y += deltaY
        errorX = abs(deltaX)
        errorY = abs(deltaY)

        iter++

        if (iter > 10000) {
            println("Превышен лимит итераций (10000). Решение расходится.")
            return
        }
    } while (max(errorX, errorY) > epsilon)

    println("\n=== РЕЗУЛЬТАТ ===")
    println("Вектор неизвестных: x1 = $x, x2 = $y")
    println("Количество итераций: $iter")
    println("Вектор погрешностей: |dx| = $errorX, |dy| = $errorY")

    println("\nПроверка (должны быть близки к 0):")
    println("f1(x,y) = ${sys.f1(x, y)}")
    println("f2(x,y) = ${sys.f2(x, y)}")
    println("=================\n")
}
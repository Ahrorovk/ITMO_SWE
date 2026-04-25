package approximation

import java.io.File
import java.io.IOException
import java.util.Scanner
import kotlin.math.pow
import kotlin.system.exitProcess

/** По заданию Л.Р. №4 таблица y = f(x) должна содержать 10–12 точек. */
private const val MIN_POINTS = 6
private const val MAX_POINTS = 12

private fun validatePointCount(n: Int, context: String = "") {
    require(n in MIN_POINTS..MAX_POINTS) {
        val c = if (context.isNotEmpty()) "$context: " else ""
        "По заданию Л.Р. №4 таблица должна содержать $MIN_POINTS–$MAX_POINTS точек; ${c}получено $n."
    }
}

fun variant1DemoData(): Pair<DoubleArray, DoubleArray> {
    val xs = DoubleArray(11) { i -> i * 0.2 }
    val ys = xs.map { x -> 2 * x / (x.pow(4.0) + 1) }.toDoubleArray()
    return xs to ys
}

fun generateData(): Pair<DoubleArray, DoubleArray> = variant1DemoData()

private const val DATA_DIR = "data"

fun resolveDataFilePath(userInput: String): File {
    val p = userInput.trim().trim { it == '"' || it == '\'' }
    if (p.isEmpty()) throw IllegalArgumentException("Путь к файлу пустой.")
    val direct = File(p)
    if (direct.isAbsolute) {
        if (!direct.isFile) throw fileNotFoundWithHint(direct, userInput)
        return direct
    }
    val inData = when {
        p.startsWith("$DATA_DIR/") || p.startsWith("$DATA_DIR\\") -> File(p)
        else -> File(DATA_DIR, p.replace(File.separator, "/").removePrefix("/"))
    }.normalize().absoluteFile
    if (inData.isFile) return inData
    throw fileNotFoundWithHint(inData, userInput)
}

private fun fileNotFoundWithHint(tried: File, originalInput: String): Nothing {
    val sb = StringBuilder()
    sb.append("Файл не найден: ${tried.path}")
    if (originalInput.isNotBlank() && originalInput != tried.path) {
        sb.append(" (введено: «").append(originalInput.trim()).append("»)")
    }
    sb.appendLine()
    val dataDir = File(DATA_DIR)
    if (!dataDir.isDirectory) {
        sb.append("Создайте папку «$DATA_DIR» в каталоге запуска и положите туда файл с данными.")
        throw IllegalArgumentException(sb.toString())
    }
    val names = dataDir.list()?.sorted()?.filter { it.isNotEmpty() } ?: emptyList()
    if (names.isNotEmpty()) {
        sb.append("В папке «$DATA_DIR»: ").append(names.joinToString(", ")).appendLine()
        val base = File(originalInput.trim()).name
        suggestSimilarFileName(base, names)?.let { guess ->
            sb.append("Похожее имя: ").append(File(DATA_DIR, guess).path)
        }
    } else {
        sb.append("Папка «$DATA_DIR» пуста — добавьте в неё .txt с парами x y.")
    }
    throw IllegalArgumentException(sb.toString())
}

private fun suggestSimilarFileName(wrong: String, candidates: List<String>): String? {
    if (wrong.isEmpty() || candidates.isEmpty()) return null
    val w = wrong.lowercase()
    var best: String? = null
    var bestD = Int.MAX_VALUE
    for (c in candidates) {
        val d = levenshtein(w, c.lowercase())
        if (d < bestD && d <= 4) {
            bestD = d
            best = c
        }
    }
    return best?.takeIf { bestD <= 4 }
}

private fun levenshtein(a: String, b: String): Int {
    val n = a.length
    val m = b.length
    if (n == 0) return m
    if (m == 0) return n
    var prev = IntArray(m + 1) { it }
    var cur = IntArray(m + 1)
    for (i in 1..n) {
        cur[0] = i
        for (j in 1..m) {
            val cost = if (a[i - 1] == b[j - 1]) 0 else 1
            cur[j] = minOf(cur[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost)
        }
        val t = prev; prev = cur; cur = t
    }
    return prev[m]
}

fun readFromFile(path: String): Pair<DoubleArray, DoubleArray> {
    val file = resolveDataFilePath(path)
    return parseDataFromFile(file.absolutePath)
}


private val numberToken = Regex("""[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?""")

fun parseDataFromFile(path: String): Pair<DoubleArray, DoubleArray> {
    val text = try {
        File(path).readText()
    } catch (e: IOException) {
        throw IllegalArgumentException("Не удалось прочитать файл: $path (${e.message ?: e.javaClass.simpleName})", e)
    }
    val lines = text.lines().map { it.trim() }.filter { it.isNotEmpty() && !it.startsWith("#") }

    if (lines.isEmpty()) throw IllegalArgumentException("Файл пуст или не содержит данных: $path")

    // Two-line format: x: ... and y: ...
    val xLine = lines.firstOrNull { it.lowercase().startsWith("x") && (it.contains(":") || it.contains("=")) }
    val yLine = lines.firstOrNull { it.lowercase().startsWith("y") && (it.contains(":") || it.contains("=")) }
    if (xLine != null && yLine != null) {
        val xs = numberToken.findAll(xLine).map { it.value.toDouble() }.toList()
        val ys = numberToken.findAll(yLine).map { it.value.toDouble() }.toList()
        if (xs.size != ys.size) throw IllegalArgumentException("Число xi и yi не совпадает: ${xs.size} и ${ys.size}")
        if (xs.isEmpty()) throw IllegalArgumentException("Не удалось разобрать строки x и y")
        validatePointCount(xs.size, "файл (строки x / y)")
        return xs.toDoubleArray() to ys.toDoubleArray()
    }

    val pairs = mutableListOf<Pair<Double, Double>>()
    for (line in lines) {
        val nums = numberToken.findAll(line).map { it.value.toDouble() }.toList()
        when (nums.size) {
            2 -> pairs.add(nums[0] to nums[1])
            0 -> { /* comment line already filtered */ }
            else -> throw IllegalArgumentException(
                "Ожидается строка \"x y\" (два числа), получено ${nums.size} чисел: $line"
            )
        }
    }
    if (pairs.isEmpty()) throw IllegalArgumentException("В файле нет ни одной пары (x, y)")
    val xs = pairs.map { it.first }.toDoubleArray()
    val ys = pairs.map { it.second }.toDoubleArray()
    validatePointCount(xs.size, "файл")
    return xs to ys
}

fun readFromConsole(scanner: Scanner): Pair<DoubleArray, DoubleArray> {
    println("Ввод табличных данных (таблица y = f(x)).")
    print("Количество точек n ($MIN_POINTS–$MAX_POINTS по заданию): ")
    val n = scanner.nextInt()
    validatePointCount(n, "консоль")

    val xs = DoubleArray(n)
    val ys = DoubleArray(n)
    println("Введите $n пар (xi и yi) — каждая пара с новой строки, два числа через пробел.")
    for (i in 0 until n) {
        print("  точка ${i + 1}: ")
        xs[i] = scanner.nextDouble()
        ys[i] = scanner.nextDouble()
    }
    return xs to ys
}

enum class DataSourceMode {
    DEMO, FILE, CONSOLE, INTERACTIVE
}

data class ParsedArgs(
    val mode: DataSourceMode,
    val inputFile: String?,
    val reportPath: String,
    val showPlot: Boolean = true
)

fun parseArgs(args: Array<String>): ParsedArgs {
    if (args.isEmpty()) return ParsedArgs(DataSourceMode.INTERACTIVE, null, "output_report.txt", showPlot = true)

    if (args.size == 1 && !args[0].startsWith("-")) {
        return ParsedArgs(DataSourceMode.DEMO, null, args[0], showPlot = true)
    }

    var mode: DataSourceMode = DataSourceMode.DEMO
    var inputFile: String? = null
    var reportPath = "output_report.txt"
    var showPlot = true
    var i = 0
    while (i < args.size) {
        when (args[i]) {
            "--out", "-o" -> {
                require(i + 1 < args.size) { "После ${args[i]} нужен путь к файлу отчёта" }
                reportPath = args[i + 1]
                i += 2
            }
            "--file", "-f" -> {
                require(i + 1 < args.size) { "После ${args[i]} нужен путь к файлу с данными" }
                mode = DataSourceMode.FILE
                inputFile = args[i + 1]
                i += 2
            }
            "--console", "-c" -> {
                mode = DataSourceMode.CONSOLE
                i++
            }
            "--demo", "-d" -> {
                mode = DataSourceMode.DEMO
                i++
            }
            "--no-plot" -> {
                showPlot = false
                i++
            }
            "--help", "-h" -> {
                printUsage()
                exitProcess(0)
            }
            else -> throw IllegalArgumentException("Неизвестный аргумент: ${args[i]}\n${usageText()}")
        }
    }
    return ParsedArgs(mode, inputFile, reportPath, showPlot)
}

private fun usageText(): String = """
Использование:
  java -jar ...                           интерактивный выбор источника данных
  java -jar ... <отчёт.txt>               демо-данные (вариант 1), отчёт в указанный файл
  java -jar ... --file <данные.txt> [-o отчёт.txt]
  java -jar ... --console [-o отчёт.txt]
  java -jar ... --demo [-o отчёт.txt]
  java -jar ... --no-plot              не вызывать Python-график

Файлы с данными по умолчанию кладутся в папку data/ (имя файла или data/имя).
Формат (10–12 точек по заданию Л.Р. №4):
  • построчно: x y (пробел или запятая), строки с # — комментарии;
  • или две строки:  x: x1 x2 ...   и   y: y1 y2 ...
""".trimIndent()

private fun printUsage() {
    println(usageText())
}

data class LoadedData(
    val xs: DoubleArray,
    val ys: DoubleArray,
    val description: String
)

fun loadData(parsed: ParsedArgs): LoadedData {
    return when (parsed.mode) {
        DataSourceMode.DEMO -> {
            val (xs, ys) = variant1DemoData()
            LoadedData(xs, ys, variant1Description())
        }
        DataSourceMode.FILE -> {
            val path = parsed.inputFile ?: error("Не указан путь к файлу (--file)")
            val resolved = resolveDataFilePath(path)
            val (xs, ys) = parseDataFromFile(resolved.absolutePath)
            LoadedData(xs, ys, "Данные из файла: ${resolved.path}, n = ${xs.size}")
        }
        DataSourceMode.CONSOLE -> {
            val (xs, ys) = readFromConsole(Scanner(System.`in`))
            LoadedData(xs, ys, "Ввод с консоли, n = ${xs.size}")
        }
        DataSourceMode.INTERACTIVE -> interactiveChooseData()
    }
}

private fun variant1Description() =
    "Вариант 1: y = 2x / (x^4 + 1),  x ∈ [0, 2], h = 0.2"

private fun interactiveChooseData(): LoadedData {
    val scanner = Scanner(System.`in`)
    println()
    println("Выберите способ ввода данных (1 - консоль, 2 - файл):")
    val choice = scanner.next()
    var filePath: String? = null
    var resolvedPath: String? = null
    val points = when (choice) {
        "1" -> readFromConsole(scanner)
        "2" -> {
            println("Введите имя файла в папке «$DATA_DIR» (например variant1_sample.txt), либо полный путь.")
            println("Повтор при ошибке; q — выход.")
            var data: Pair<DoubleArray, DoubleArray>? = null
            while (data == null) {
                print("Файл: ")
                filePath = scanner.next()
                if (filePath.equals("q", ignoreCase = true)) {
                    throw IllegalArgumentException("Ввод из файла отменён пользователем.")
                }
                try {
                    val resolved = resolveDataFilePath(filePath!!)
                    data = parseDataFromFile(resolved.absolutePath)
                    resolvedPath = resolved.path
                } catch (e: IllegalArgumentException) {
                    println(e.message ?: e.toString())
                }
            }
            data!!
        }
        else -> {
            println("Неверный выбор. Используются данные по умолчанию (Вариант 1).")
            generateData()
        }
    }
    val description = when (choice) {
        "1" -> "Ввод с консоли, n = ${points.first.size}"
        "2" -> "Данные из файла: ${resolvedPath ?: filePath!!}, n = ${points.first.size}"
        else -> variant1Description()
    }
    return LoadedData(points.first, points.second, description)
}

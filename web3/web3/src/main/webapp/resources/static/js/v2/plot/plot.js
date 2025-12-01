/**
 * plot.js
 * Отвечает за отрисовку графика, осей и точек.
 */

let canvas = document.getElementById('graph');
let ctx = canvas.getContext('2d');

// Конфигурация графика
const config = {
    radius: 200, // Визуальный радиус в пикселях (масштаб)
    colors: {
        axis: 'black',
        hit: '#00FF00',      // Ярко-зеленый для попадания
        miss: '#FF0000',     // Ярко-красный для промаха
        shapeFill: 'rgba(30, 144, 255, 0.4)', // Полупрозрачный синий для области
        shapeStroke: '#1E90FF'
    }
};

// Инициализация при загрузке
function initGraph() {
    canvas = document.getElementById('graph');
    if (canvas) {
        ctx = canvas.getContext('2d');
        const currentR = getCurrentR();
        drawPlot(currentR);
        // Загрузка точек из таблицы после отрисовки
        loadPointsFromBackend();
    }
}

/**
 * Главная функция перерисовки
 */
function drawPlot(R) {
    if (!canvas || !ctx) return;

    // Очистка canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Рисуем фигуру (область)
    drawArea(R);

    // 2. Рисуем оси и метки
    drawAxis();
    drawLabels(R);

    // 3. Рисуем точки (фильтруем их внутри функции)
    drawPoints(R);
}

/**
 * Отрисовка осей координат
 */
function drawAxis() {
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.strokeStyle = config.colors.axis;
    ctx.lineWidth = 2;

    ctx.beginPath();
    // Ось X
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    // Стрелка X
    ctx.lineTo(width - 10, centerY - 5);
    ctx.moveTo(width, centerY);
    ctx.lineTo(width - 10, centerY + 5);

    // Ось Y
    ctx.moveTo(centerX, height);
    ctx.lineTo(centerX, 0);
    // Стрелка Y
    ctx.lineTo(centerX - 5, 10);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX + 5, 10);

    ctx.stroke();
}

/**
 * Отрисовка области (фигуры)
 * Основано на вашем массиве getKeyPoints:
 * 1 четверть: Треугольник
 * 2 четверть: Сектор (дуга)
 * 3 четверть: Прямоугольник
 */
function drawArea(R) {
    if (R <= 0) return; // Не рисуем область, если R некорректен

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scalePixels = config.radius; // R соответствует config.radius пикселей

    ctx.fillStyle = config.colors.shapeFill;
    ctx.strokeStyle = config.colors.shapeStroke;
    ctx.beginPath();

    // -- 1 Четверть (Треугольник) --
    // От (0,0) к (R,0) к (0,R) - но в Canvas Y инвертирован
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + scalePixels, centerY); // (R, 0)
    ctx.lineTo(centerX, centerY - scalePixels); // (0, R)
    ctx.lineTo(centerX, centerY);

    // -- 2 Четверть (Сектор/Дуга) --
    // Четверть круга радиусом R/2
    // arc(x, y, radius, startAngle, endAngle, counterClockwise)
    // Рисуем дугу в Q2 (x < 0, y > 0). Углы: PI (лево) до 1.5PI (верх)
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, scalePixels / 2, Math.PI, 1.5 * Math.PI, false);
    ctx.lineTo(centerX, centerY);

    // -- 3 Четверть (Прямоугольник) --
    // От (0,0) до (-R/2, -R)
    ctx.rect(centerX - scalePixels / 2, centerY, scalePixels / 2, scalePixels);

    ctx.fill();
    ctx.stroke();
}

/**
 * Отрисовка меток (R, R/2 и т.д.)
 */
function drawLabels(R) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const rStep = config.radius;     // Расстояние для R
    const rHalf = config.radius / 2; // Расстояние для R/2

    ctx.fillStyle = 'black';
    ctx.font = '14px Arial';

    // Метки по X
    ctx.fillText(R, centerX + rStep - 5, centerY + 15);
    ctx.fillText(R/2, centerX + rHalf - 10, centerY + 15);
    ctx.fillText(-R, centerX - rStep - 5, centerY + 15);
    ctx.fillText(-R/2, centerX - rHalf - 10, centerY + 15);

    // Метки по Y
    ctx.fillText(R, centerX + 10, centerY - rStep + 5);
    ctx.fillText(R/2, centerX + 10, centerY - rHalf + 5);
    ctx.fillText(-R, centerX + 10, centerY + rStep + 5);
    ctx.fillText(-R/2, centerX + 10, centerY + rHalf + 5);

    ctx.fillText("X", canvas.width - 20, centerY - 10);
    ctx.fillText("Y", centerX + 10, 20);
}

/**
 * Парсинг таблицы результатов и отрисовка точек
 */
function loadPointsFromBackend() {
    // Находим таблицу. Селектор может отличаться в зависимости от PrimeFaces версии
    // Обычно это .ui-datatable-data > tr
    const rows = document.querySelectorAll('.ui-datatable-data tr');
    // Очищаем массив точек (или можно просто перечитывать DOM каждый раз)
    const pointsData = [];

    rows.forEach(row => {
        const cells = row.children;
        if (cells.length >= 3) {
            // Предполагаем порядок: X, Y, R, Result
            const x = parseFloat(cells[0].innerText.trim());
            const y = parseFloat(cells[1].innerText.trim());
            const r = parseFloat(cells[2].innerText.trim());

            // Определяем попадание по тексту или классу
            // (Адаптируйте строку под ваш вывод: "Попал", "Yes", "Hit" и т.д.)
            const resultText = cells[3] ? cells[3].innerText.trim().toLowerCase() : "";
            const isHit = resultText.includes('попал') || resultText.includes('true') || resultText.includes('да');

            if (!isNaN(x) && !isNaN(y) && !isNaN(r)) {
                pointsData.push({ x, y, r, isHit });
            }
        }
    });

    return pointsData;
}

/**
 * Рисует точки, соответствующие текущему R
 */
function drawPoints(currentR) {
    const points = loadPointsFromBackend();

    points.forEach(p => {
        // Рисуем точку только если ее радиус совпадает с текущим (с небольшой погрешностью)
        if (Math.abs(p.r - currentR) < 0.01) {
            drawSinglePoint(p.x, p.y, p.isHit, currentR);
        } else {
            // Опционально: можно рисовать точки других радиусов прозрачными или серыми
            // Но обычно в ТЗ просят только для текущего R
        }
    });
}

function drawSinglePoint(x, y, isHit, R) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Перевод координат:
    // 1 единица графика = (config.radius / R) пикселей
    const scale = config.radius / R;

    const pixelX = centerX + x * scale;
    const pixelY = centerY - y * scale; // Y инвертирован на canvas

    ctx.beginPath();
    ctx.arc(pixelX, pixelY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = isHit ? config.colors.hit : config.colors.miss;
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.stroke();
}

/**
 * Получение текущего R из формы
 */
function getCurrentR() {
    // Проверяем скрытый инпут или радио-кнопки
    // Обычно в JSF PrimeFaces значение R хранится в скрытом input, если используется p:selectBooleanCheckbox или подобное
    // Адаптируйте селектор под вашу верстку

    // Вариант 1: Ищем выбранную радиокнопку (как в вашем старом коде)
    const rRadios = document.querySelectorAll('input[type="radio"]:checked');
    for (let radio of rRadios) {
        // Проверяем имя, чтобы не взять X
        if (radio.name.includes('r')) {
            return parseFloat(radio.value);
        }
    }

    // Вариант 2: Если не нашли радио, ищем скрытый инпут или текстовое поле
    // Возвращаем дефолт, если ничего не найдено
    return window.currentRValue || 1;
}

// Глобальные функции для вызова из update.js или XHTML
window.filterPointsByCurrentR = function() {
    const r = getCurrentR();
    drawPlot(r);
};

window.resizeCanvas = function() {
    drawPlot(getCurrentR());
}

// Запуск при загрузке
document.addEventListener("DOMContentLoaded", initGraph);
let canvas = document.getElementById('graph');
let ctx = canvas.getContext('2d');

// Конфигурация графика
const config = {
    radius: 200,
    colors: {
        axis: 'black',
        hit: '#09a53d',
        miss: '#a50909',
        shapeFill: 'rgba(30, 144, 255, 0.4)',
        shapeStroke: '#1E90FF'
    }
};

window.graphConfig = config;

function initGraph() {
    canvas = document.getElementById('graph');
    if (canvas) {
        ctx = canvas.getContext('2d');
        const currentR = getCurrentR();
        window.currentRValue = currentR;
        drawPlot(currentR);
        loadPointsFromBackend();
    }
}

let lastRForShapes = null;

function drawPlot(R, forceRedrawShapes = false) {
    if (!canvas || !ctx) return;

    if (!R || R <= 0) {
        R = getCurrentR();
    }

    const shouldRedrawShapes = forceRedrawShapes || (lastRForShapes === null) || (lastRForShapes !== R);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (shouldRedrawShapes) {
        drawArea(R);
        drawLabels(R);
        lastRForShapes = R;
    } else {
        drawArea(lastRForShapes);
        drawLabels(lastRForShapes);
    }

    drawAxis();

    drawPoints(R);
}

window.drawPlot = drawPlot;

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
 */
function drawArea(R) {
    if (R <= 0 || !canvas || !ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = config.radius / R;
    
    ctx.fillStyle = config.colors.shapeFill;
    ctx.strokeStyle = config.colors.shapeStroke;
    ctx.lineWidth = 2;
    ctx.beginPath();

    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + R * scale, centerY);
    ctx.lineTo(centerX, centerY - R * scale);
    ctx.closePath();

    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, config.radius/2, Math.PI, Math.PI/2, true);
    ctx.lineTo(centerX, centerY);

    ctx.rect(centerX, centerY, (R / 2) * scale, R * scale);

    ctx.fill();
    ctx.stroke();
}
function drawLabels(R) {
    if (!canvas || !ctx || R <= 0) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = config.radius / R;
    const rStep = R * scale;
    const rHalf = (R / 2) * scale;

    ctx.fillStyle = 'black';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(R.toString(), centerX + rStep, centerY + 5);
    ctx.fillText((R/2).toString(), centerX + rHalf, centerY + 5);
    ctx.fillText((-R).toString(), centerX - rStep, centerY + 5);
    ctx.fillText((-R/2).toString(), centerX - rHalf, centerY + 5);

    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(R.toString(), centerX - 5, centerY - rStep);
    ctx.fillText((R/2).toString(), centerX - 5, centerY - rHalf);
    ctx.fillText((-R).toString(), centerX - 5, centerY + rStep);
    ctx.fillText((-R/2).toString(), centerX - 5, centerY + rHalf);

    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillText("X", canvas.width - 15, centerY - 10);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText("Y", centerX + 10, 15);
}

/**
 * Парсинг таблицы результатов и отрисовка точек
 */
function loadPointsFromBackend() {
    // Таблица находится вне формы, поэтому ищем по ID таблицы напрямую
    let tbodyElement = document.getElementById('table_data');
    
    // Если не нашли, пробуем найти через селектор PrimeFaces
    if (!tbodyElement) {
        const table = document.getElementById('table');
        if (table) {
            // PrimeFaces создает tbody с классом ui-datatable-data
            tbodyElement = table.querySelector('tbody.ui-datatable-data') || table.querySelector('tbody');
        }
    }
    
    // Если все еще не нашли, пробуем найти через класс
    if (!tbodyElement) {
        tbodyElement = document.querySelector('table[id*="table"] tbody') || 
                       document.querySelector('.ui-datatable-data');
    }

    if (!tbodyElement) {
        console.warn("Table tbody not found. Cannot load points.");
        return [];
    }

    // Ищем только прямые строки в tbody
    const rows = tbodyElement.querySelectorAll('tr');
    const pointsData = [];

    rows.forEach(row => {
        // Пропускаем строки заголовков или пустые сообщения
        if (row.classList.contains('ui-widget-header') || row.classList.contains('ui-datatable-empty-message')) {
            return;
        }

        const cells = row.querySelectorAll('td');
        // У вас 6 колонок: X, Y, R, Результат, Время, Бенчмарк
        if (cells.length >= 4) {

            const xText = cells[0].textContent.trim();
            const yText = cells[1].textContent.trim();
            const rText = cells[2].textContent.trim();
            const resultText = cells[3].textContent.trim().toLowerCase();

            // ВАЖНО: JSF f:convertNumber выводит запятую в некоторых локалях. Заменяем на точку.
            const x = parseFloat(xText.replace(',', '.'));
            const y = parseFloat(yText.replace(',', '.'));
            const r = parseFloat(rText.replace(',', '.'));

            if (!isNaN(x) && !isNaN(y) && !isNaN(r)) {
                // Определяем попадание по тексту из таблицы (должно соответствовать 'Попал' / 'Не попал')
                const normalizedResult = resultText.replace(/\s+/g, ' ').trim();
                const isHit = normalizedResult === 'попал';

                pointsData.push({ x, y, r, isHit });
            }
        }
    });

    return pointsData;
}
/**
 * Рисует ВСЕ точки из базы данных
 * Каждая точка масштабируется по своему собственному R (p.r)
 * Это означает, что при изменении текущего R точки будут сжиматься/разжиматься
 * на основе их исходного R, а не текущего выбранного R
 */
function drawPoints(currentR) {
    const points = loadPointsFromBackend();
    console.log('Загружено точек для отрисовки:', points.length, 'текущий R:', currentR);

    points.forEach(p => {
        // ВАЖНО: Используем R каждой точки (p.r) для масштабирования
        // Это позволяет точкам сохранять их относительное положение
        // независимо от текущего выбранного R
        const pointR = p.r || currentR;
        drawSinglePoint(p.x, p.y, p.isHit, pointR);
    });
}

function drawSinglePoint(x, y, isHit, R) {
    if (!canvas || !ctx || R <= 0) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const pixelX = centerX + x * config.radius / R;
    const pixelY = centerY - y * config.radius / R;

    // Используем зеленый цвет для попадания, красный для промаха
    ctx.fillStyle = isHit ? config.colors.hit : config.colors.miss;
    ctx.beginPath();
    ctx.arc(pixelX, pixelY, 5, 0, 2 * Math.PI);
    ctx.fill();

}

// Экспортируем функцию для использования в других местах
window.drawSinglePoint = drawSinglePoint;

function getCurrentR() {
    const rRadios = document.querySelectorAll('input[type="radio"]:checked');
    for (let radio of rRadios) {
        const name = radio.name || '';
        const id = radio.id || '';
        if ((name.toLowerCase().includes('r') || id.toLowerCase().includes('r')) &&
            !name.toLowerCase().includes('x') && !id.toLowerCase().includes('x')) {
            const value = parseFloat(radio.value);
            if (!isNaN(value) && value > 0) {
                return value;
            }
        }
    }

    const possibleSelectors = [
        'input[name*="r"][type="radio"]:checked',
        'input[id*="r"][type="radio"]:checked',
        'input[name="form:r"][type="radio"]:checked',
        'input[name*="j_idt"][type="radio"]:checked'
    ];
    
    for (let selector of possibleSelectors) {
        const radio = document.querySelector(selector);
        if (radio) {
            const value = parseFloat(radio.value);
            if (!isNaN(value) && value > 0) {
                return value;
            }
        }
    }

    if (window.currentRValue && window.currentRValue > 0) {
        return window.currentRValue;
    }

    return 1;
}

window.filterPointsByCurrentR = function() {
    const currentR = getCurrentR();
    clearAllPoints();

    // ИСПРАВЛЕНО: используйте полный ID 'form:table'
    // или более универсальный селектор: document.getElementById(PrimeFaces.escapeClientId('form:table'));
    const table = document.getElementById('form:table');
    if (!table) return;

    // Также проверьте селектор строк. В PrimeFaces dataTable тело таблицы - это 'tbody'.
    // Часто используют .ui-datatable-data для выбора тела таблицы.
    // Если ваша таблица имеет класс 'ui-datatable'
    const rows = table.querySelector('tbody').querySelectorAll('tr');
    drawPlot(currentR);
};

window.resizeCanvas = function() {
    drawPlot(getCurrentR());
}

window.refreshPlot = function(newR) {
    if (newR && newR > 0) {
        window.currentRValue = parseFloat(newR);
        drawPlot(window.currentRValue, true);
    } else {
        const r = getCurrentR();
        drawPlot(r, true);
    }
}

window.refreshPointsOnly = function() {
    if (!canvas || !ctx) return;
    const currentR = getCurrentR();
    if (currentR > 0) {
        // Перерисовываем график, но не фигуру (forceRedrawShapes = false)
        // Это перерисует оси и точки, но сохранит фигуру
        drawPlot(currentR, false);
    }
}

function initializePlotSystem() {
    if (document.readyState === 'loading') {
        document.addEventListener("DOMContentLoaded", initGraph);
    } else {
        initGraph();
    }

    // Обработка PrimeFaces AJAX запросов
    if (typeof PrimeFaces !== 'undefined') {
        PrimeFaces.ajax.addOnComplete(function(xhr, status, args) {
            setTimeout(function() {
                console.log('AJAX запрос завершен, обновляем график и таблицу...', status);
                const currentR = getCurrentR();
                if (currentR > 0) {
                    // Всегда перерисовываем точки после AJAX запроса
                    if (window.refreshPointsOnly) {
                        window.refreshPointsOnly();
                    } else {
                        // Fallback - полная перерисовка
                        drawPlot(currentR, false);
                    }
                }
            }, 150);
        });
        
        // Также обрабатываем успешное завершение AJAX
        PrimeFaces.ajax.addOnSuccess(function(data, status, xhr) {
            setTimeout(function() {
                console.log('AJAX запрос успешно завершен, обновляем график...');
                const currentR = getCurrentR();
                if (currentR > 0) {
                    if (window.refreshPointsOnly) {
                        window.refreshPointsOnly();
                    } else {
                        drawPlot(currentR, false);
                    }
                }
            }, 100);
        });
    }

    // Обработка стандартных JSF AJAX запросов (f:ajax)
    // Слушаем события обновления DOM после AJAX
    function setupTableObserver() {
        const tableContainer = document.getElementById('results');
        if (tableContainer) {
            const ajaxObserver = new MutationObserver(function(mutations) {
                let shouldUpdate = false;
                mutations.forEach(function(mutation) {
                    // Проверяем любые изменения в таблице (добавление, удаление, изменение)
                    if (mutation.type === 'childList') {
                        if (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0) {
                            shouldUpdate = true;
                        }
                    }
                    // Также проверяем изменения атрибутов (например, обновление данных)
                    if (mutation.type === 'attributes') {
                        shouldUpdate = true;
                    }
                });
                if (shouldUpdate) {
                    console.log('Обнаружены изменения в таблице, обновляем график...');
                    setTimeout(function() {
                        const currentR = getCurrentR();
                        if (currentR > 0) {
                            if (window.refreshPointsOnly) {
                                window.refreshPointsOnly();
                            } else {
                                drawPlot(currentR, false);
                            }
                        }
                    }, 150);
                }
            });

            ajaxObserver.observe(tableContainer, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class', 'style']
            });
        }
    }
    
    // Вызываем setupTableObserver только один раз
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupTableObserver);
    } else {
        setupTableObserver();
    }
}

// Старая функция setupTableObserver заменена новой внутри initializePlotSystem
// Оставляем для обратной совместимости, но она не используется
function setupTableObserverOld() {
    const tableObserver = new MutationObserver(function(mutations) {
        const currentR = getCurrentR();
        if (currentR > 0) {
            const rForShapes = lastRForShapes || currentR;
            drawPlot(rForShapes, false);
        }
    });

    setTimeout(function() {
        const table = document.querySelector('table.table, [id*="table"]');
        if (table) {
            tableObserver.observe(table, {
                childList: true,
                subtree: true
            });
        }
    }, 500);
}

// Инициализация системы графиков
initializePlotSystem();
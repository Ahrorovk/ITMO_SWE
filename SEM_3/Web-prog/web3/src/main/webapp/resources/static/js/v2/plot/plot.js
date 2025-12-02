/**
 * Отвечает за отрисовку графика, осей и точек.
 */

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
    let rows = document.querySelectorAll('#form\\:table_data tr, .ui-datatable-data tr, table[id*="table"] tbody tr');

    if (rows.length === 0) {
        const table = document.querySelector('table.table, [id*="table"]');
        if (table) {
            rows = table.querySelectorAll('tbody tr, tr[data-ri]');
        }
    }

    const pointsData = [];

    rows.forEach(row => {
        if (row.classList.contains('ui-widget-header') || row.classList.contains('ui-datatable-empty-message')) {
            return;
        }

        const cells = row.querySelectorAll('td');
        if (cells.length >= 4) {
            // Порядок: X, Y, R, Результат
            const xText = cells[0].textContent.trim();
            const yText = cells[1].textContent.trim();
            const rText = cells[2].textContent.trim();
            const resultText = cells[3].textContent.trim().toLowerCase();

            const x = parseFloat(xText);
            const y = parseFloat(yText);
            const r = parseFloat(rText);

            if (!isNaN(x) && !isNaN(y) && !isNaN(r)) {
                // Определяем попадание по тексту из таблицы
                const normalizedResult = resultText.replace(/\s+/g, ' ').trim();
                const hitTokens = ['попал', 'hit', 'true', 'да', 'yes', '1'];

                const isHit = hitTokens.includes(normalizedResult);

                pointsData.push({ x, y, r, isHit });
            }
        }
    });

    return pointsData;
}

/**
 * Рисует ВСЕ точки из базы данных
 * Каждая точка масштабируется по своему собственному R
 */
function drawPoints(currentR) {
    const points = loadPointsFromBackend();

    points.forEach(p => {
        drawSinglePoint(p.x, p.y, p.isHit, p.r);
    });
}

function drawSinglePoint(x, y, isHit, R) {
    if (!canvas || !ctx || R <= 0) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const pixelX = centerX + x * config.radius / R;
    const pixelY = centerY - y * config.radius / R;

    ctx.fillStyle = isHit ? config.colors.hit : config.colors.miss;
    ctx.beginPath();
    ctx.arc(pixelX, pixelY, 5, 0, 2 * Math.PI);
    ctx.fill();
}

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
    const r = getCurrentR();
    drawPlot(r);
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
        const rForShapes = lastRForShapes || currentR;
        drawPlot(rForShapes, false);
    }
}

function initializePlotSystem() {
    if (document.readyState === 'loading') {
        document.addEventListener("DOMContentLoaded", initGraph);
    } else {
        initGraph();
    }

    if (typeof PrimeFaces !== 'undefined') {
        PrimeFaces.ajax.addOnComplete(function() {
            setTimeout(function() {
                const currentR = getCurrentR();
                if (currentR > 0) {
                    if (lastRForShapes !== null && lastRForShapes !== currentR) {
                        drawPlot(currentR, true);
                    } else if (lastRForShapes === null) {
                        drawPlot(currentR, true);
                    } else {
                        if (window.refreshPointsOnly) {
                            window.refreshPointsOnly();
                        }
                    }
                }
            }, 100);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupTableObserver);
    } else {
        setupTableObserver();
    }
}

function setupTableObserver() {
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
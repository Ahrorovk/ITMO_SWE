document.addEventListener('DOMContentLoaded', function () {

    const yInput = document.getElementById('form:y');
    const canvas = document.getElementById('graph');

    // Глобальная переменная для R, синхронизируемая с выбором пользователя
    window.currentRValue = 1;

    // --- Обработка клика по графику ---
    if (canvas) {
        canvas.addEventListener('click', function (event) {
            const rect = canvas.getBoundingClientRect();
            // Координаты клика внутри элемента Canvas
            const clickX = event.clientX - rect.left;
            const clickY = event.clientY - rect.top;

            // Центр канваса
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Текущий R (берем из функции в plot.js или локальной переменной)
            // Важно: plot.js должен быть подключен ДО update.js или функции должны быть доступны
            let r = 1;
            if (typeof getCurrentR === 'function') {
                r = getCurrentR();
            } else {
                r = window.currentRValue;
            }

            // Масштаб: config.radius пикселей = R единиц
            // Если config.radius в plot.js = 200:
            const scale = 200 / r;

            // Перевод пикселей в координаты графика
            let mathX = (clickX - centerX) / scale;
            let mathY = (centerY - clickY) / scale; // Y инвертирован

            // Округление для красоты (не обязательно, если backend принимает double)
            mathX = mathX.toFixed(3);
            mathY = mathY.toFixed(3);

            console.log(`Click: ${mathX}, ${mathY}, R=${r}`);

            // --- ОТПРАВКА НА СЕРВЕР ---
            // Вызываем PrimeFaces RemoteCommand.
            // Имя 'addPoint' должно совпадать с name="addPoint" в p:remoteCommand
            if (typeof addPoint === 'function') {
                addPoint([
                    {name: 'x', value: mathX},
                    {name: 'y', value: mathY},
                    {name: 'r', value: r}
                ]);
            } else {
                console.error("RemoteCommand 'addPoint' not found! Add <p:remoteCommand name='addPoint'...> to your .xhtml");
            }
        });
    }

    // --- Валидация Y (из вашего кода) ---
    if (yInput) {
        yInput.addEventListener('input', function () {
            let yValue = yInput.value.replace(/[^0-9.,-]/g, '');
            yValue = yValue.replace(/,/g, '.');

            if (yValue && (parseFloat(yValue) < -5 || parseFloat(yValue) > 5)) {
                // Пример ограничения диапазона (-5 ... 5)
                // yValue = parseFloat(yValue) > 5 ? '5' : '-5';
            }
            yInput.value = yValue;
        });
    }

    // --- Слушатель изменения R ---
    // Находим все радиокнопки, относящиеся к R (PrimeFaces часто добавляет сложные ID)
    // Ищем по частичному совпадению имени или класса
    const rInputs = document.querySelectorAll('input[type="radio"]');
    rInputs.forEach(radio => {
        // Фильтр, чтобы не цеплять X
        if (radio.name.indexOf('r') !== -1) {
            radio.addEventListener('change', function() {
                window.currentRValue = this.value;
                console.log("R changed to: " + this.value);

                // Перерисовываем график
                if (typeof filterPointsByCurrentR === 'function') {
                    filterPointsByCurrentR();
                }
            });
        }
    });

    // Инициализация дефолтных значений
    window.currentRValue = getCurrentR ? getCurrentR() : 1;
});

// Перехват AJAX запросов JSF/PrimeFaces для перерисовки после обновления таблицы
// Это стандартный способ для JSF 2.x
if (typeof jsf !== 'undefined') {
    jsf.ajax.addOnEvent(function(data) {
        if (data.status === 'success') {
            setTimeout(() => {
                if (typeof filterPointsByCurrentR === 'function') {
                    filterPointsByCurrentR();
                }
            }, 100);
        }
    });
}
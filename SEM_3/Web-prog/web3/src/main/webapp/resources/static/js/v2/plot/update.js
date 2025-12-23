document.addEventListener('DOMContentLoaded', function () {
    let rValue = 1;

    const rButtons = document.getElementsByClassName('r-button');
    const yInput = document.getElementById('form:y');
    const xInput = document.getElementById('form:x');
    const canvas = document.getElementById('graph');
    const configRadius = (window.graphConfig && window.graphConfig.radius) || 200;

    if (canvas) {
        // === Обработка клика по графику ===
        canvas.addEventListener('click', function (event) {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const canvasX = (event.clientX - rect.left) * scaleX;
            const canvasY = (event.clientY - rect.top) * scaleY;

            const currentR = getCurrentR();

            if (!currentR || currentR <= 0) {
                alert('Выберите значение R перед кликом по графику');
                return;
            }

            // В plot.js используется: scale = config.radius / R
            const scale = configRadius / currentR;
            let realX = (canvasX - canvas.width / 2) / scale;
            let realY = (canvas.height / 2 - canvasY) / scale;

            // Округляем Y до 3 знаков после запятой для точности
            realY = Math.round(realY * 1000) / 1000;

            // Немедленно отрисовываем точку на графике (временно, до получения ответа от сервера)
            if (window.drawSinglePoint) {
                // Вычисляем попадание локально для предварительной отрисовки
                const isHit = checkPointHit(realX, realY, currentR);
                window.drawSinglePoint(realX, realY, isHit, currentR);
            }

            sendPointRequest(realX, realY, currentR);
        });
    }



    function getCurrentR() {
        const rRadios = document.querySelectorAll('input[type="radio"]:checked');
        for (let radio of rRadios) {
            const name = (radio.name || '').toLowerCase();
            const id = (radio.id || '').toLowerCase();
            if ((name.includes('r') || id.includes('r')) && 
                !name.includes('x') && !id.includes('x')) {
                const value = parseFloat(radio.value);
                if (!isNaN(value) && value > 0) {
                    return value;
                }
            }
        }
        
        if (window.currentRValue && window.currentRValue > 0) {
            return window.currentRValue;
        }
        
        return rValue || 1;
    }

    // Флаг для предотвращения перезаписи X при программной установке
    let isSettingXProgrammatically = false;

    function setFormValues(x, y, r) {
        console.log('Установка значений формы:', {x: x, y: y, r: r});
        
        // Устанавливаем флаг, чтобы предотвратить перезапись X
        isSettingXProgrammatically = true;
        
        // Устанавливаем X - JSF использует скрытое поле для h:selectOneRadio
        // Ищем скрытое поле с именем, содержащим 'x'
        const hiddenInputs = document.querySelectorAll('input[type="hidden"]');
        let xHiddenInput = null;
        
        for (let input of hiddenInputs) {
            const name = (input.name || '').toLowerCase();
            const id = (input.id || '').toLowerCase();
            if ((name.includes('x') || id.includes('x')) && 
                !name.includes('r') && !id.includes('r')) {
                xHiddenInput = input;
                break;
            }
        }
        
        // Если нашли скрытое поле, устанавливаем значение напрямую
        if (xHiddenInput) {
            xHiddenInput.value = String(x);
            console.log('X установлен через скрытое поле:', xHiddenInput.name, '=', x);
        }
        
        // Также устанавливаем через радио-кнопки для визуального отображения
        const allRadios = document.querySelectorAll('input[type="radio"]');
        let xRadioGroupName = null;
        const xRadioArray = [];
        
        for (let radio of allRadios) {
            const name = (radio.name || '').toLowerCase();
            const id = (radio.id || '').toLowerCase();
            const isX = (name.includes('x') || id.includes('x')) && 
                   !name.includes('r') && !id.includes('r');
            if (isX) {
                if (!xRadioGroupName && radio.name) {
                    xRadioGroupName = radio.name;
                }
                xRadioArray.push(radio);
            }
        }

        // Устанавливаем визуально выбранную радио-кнопку
        if (xRadioGroupName) {
            const groupRadios = document.querySelectorAll(`input[type="radio"][name="${xRadioGroupName}"]`);
            groupRadios.forEach(r => r.checked = false);
            
            const xValueStr = String(x);
        for (let radio of xRadioArray) {
                if (radio.value === xValueStr || Math.abs(parseFloat(radio.value) - x) < 0.0001) {
                radio.checked = true;
                    // Используем dispatchEvent вместо click, чтобы не триггерить лишние события
                    const changeEvent = new Event('change', { bubbles: true, cancelable: true });
                    radio.dispatchEvent(changeEvent);
                    console.log('X радио-кнопка выбрана:', radio.value);
                break;
            }
        }
        }
        
        // Снимаем флаг после небольшой задержки
        setTimeout(() => {
            isSettingXProgrammatically = false;
        }, 300);

        // Устанавливаем Y (ограниченный диапазоном -3 до 3)
        if (yInput) {
            yInput.value = String(y);
            console.log('Y установлен:', y);
            
            // Триггерим события для JSF
            const inputEvent = new Event('input', { bubbles: true, cancelable: true });
            yInput.dispatchEvent(inputEvent);
            
            const changeEvent = new Event('change', { bubbles: true, cancelable: true });
            yInput.dispatchEvent(changeEvent);
            
            const blurEvent = new Event('blur', { bubbles: true, cancelable: true });
            yInput.dispatchEvent(blurEvent);
        }

        // Устанавливаем R (если еще не установлен)
        const currentR = getCurrentR();
        if (Math.abs(currentR - r) > 0.0001) {
            const rRadios = document.querySelectorAll('input[type="radio"]');
            const rRadioArray = Array.from(rRadios).filter(function(radio) {
                const name = (radio.name || '').toLowerCase();
                const id = (radio.id || '').toLowerCase();
                return (name.includes('r') || id.includes('r')) &&
                       !name.includes('x') && !id.includes('x');
            });

            for (let radio of rRadioArray) {
                if (Math.abs(parseFloat(radio.value) - r) < 0.01) {
                    radio.checked = true;
                    radio.dispatchEvent(new Event('change', { bubbles: true }));
                    radio.dispatchEvent(new Event('click', { bubbles: true }));
                    if (radio.parentElement) {
                        radio.parentElement.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                    setR(r);
                    break;
                }
            }
        }
    }

    function submitForm() {
        // Ищем кнопку submit - PrimeFaces может генерировать разные ID
        let submitButton = document.getElementById('form:submit');
        
        console.log('Поиск кнопки submit, найдено:', submitButton);
        
        // Если не нашли, пробуем найти через селектор
        if (!submitButton) {
            const buttons = document.querySelectorAll('button[id*="submit"], input[type="submit"][id*="submit"], button[type="button"][id*="submit"]');
            console.log('Найдено кнопок через селектор:', buttons.length);
            for (let btn of buttons) {
                if (btn.id && btn.id.includes('submit')) {
                    submitButton = btn;
                    console.log('Найдена кнопка:', btn.id);
                    break;
                }
            }
        }
        
        if (submitButton) {
            console.log('Кнопка найдена, отправка через клик. PrimeFaces доступен:', typeof PrimeFaces !== 'undefined');
            // Используем PrimeFaces для AJAX отправки
            if (typeof PrimeFaces !== 'undefined' && PrimeFaces.ajax) {
                // PrimeFaces обработает AJAX запрос при клике
                // Создаем событие клика для PrimeFaces
                const clickEvent = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                submitButton.dispatchEvent(clickEvent);
            } else {
                // Fallback на обычный клик
            submitButton.click();
            }
        } else {
            console.warn('Кнопка submit не найдена, пробуем альтернативные способы');
            // Альтернативный способ - использовать jsf.ajax.request если доступно
            if (typeof jsf !== 'undefined' && jsf.ajax) {
                console.log('Используем jsf.ajax.request');
                const form = document.getElementById('form');
                if (form) {
                    jsf.ajax.request(form, null, {
                        execute: '@form',
                        render: 'form:table'
                    });
                }
            } else {
                // Последний вариант - обычная отправка формы
                console.log('Используем обычную отправку формы');
            const form = document.getElementById('form');
            if (form) {
                form.submit();
                } else {
                    console.error('Форма не найдена!');
                }
            }
        }
    }

    function sendPointRequest(x, y, r) {
        console.log('Отправка точки:', {x: x, y: y, r: r});
        setFormValues(x, y, r);
        // Увеличиваем задержку, чтобы JSF/PrimeFaces успел обработать изменения значений формы
        // Особенно важно для радио-кнопок, которые требуют времени на обработку
        setTimeout(function() {
            console.log('Отправка формы...');
            // ВАЖНО: Устанавливаем X непосредственно перед отправкой, чтобы гарантировать правильное значение
            const hiddenInputs = document.querySelectorAll('input[type="hidden"]');
            for (let input of hiddenInputs) {
                const name = (input.name || '').toLowerCase();
                if (name.includes('x') && !name.includes('r')) {
                    input.value = String(x);
                    console.log('X установлен перед отправкой в скрытое поле:', input.name, '=', x);
                }
            }
            
            // Также устанавливаем через радио-кнопки
            const allRadios = document.querySelectorAll('input[type="radio"]');
            let xRadioGroupName = null;
            for (let radio of allRadios) {
                const name = (radio.name || '').toLowerCase();
                if (name.includes('x') && !name.includes('r')) {
                    if (!xRadioGroupName) {
                        xRadioGroupName = radio.name;
                    }
                }
            }
            
            if (xRadioGroupName) {
                const groupRadios = document.querySelectorAll(`input[type="radio"][name="${xRadioGroupName}"]`);
                groupRadios.forEach(r => r.checked = false);
                const xValueStr = String(x);
                for (let radio of groupRadios) {
                    if (radio.value === xValueStr || Math.abs(parseFloat(radio.value) - x) < 0.0001) {
                        radio.checked = true;
                        console.log('X радио-кнопка установлена перед отправкой:', radio.value);
                        break;
                    }
                }
            }
            
            submitForm();
        }, 250);
    }

    window.sendPointRequest = sendPointRequest;
    
    // Функция для проверки попадания точки (локально, до отправки на сервер)
    function checkPointHit(x, y, r) {
        const inTriangle = (x >= 0 && y >= 0 && x + y <= r);
        const inRectangle = (x >= 0 && x <= r/2 && y <= 0 && y >= -r);
        const inCircle = (x <= 0 && y <= 0 && (x * x + y * y <= (r/2) * (r/2)));
        return inTriangle || inRectangle || inCircle;
    }
    
    // Экспортируем функцию для использования в других местах
    window.checkPointHit = checkPointHit;

    // Ищем все радио-кнопки R (JSF может генерировать разные имена)
    const rRadioButtons = document.querySelectorAll('input[type="radio"]');
    const rButtonsArray = Array.from(rRadioButtons).filter(function(radio) {
        const name = (radio.name || '').toLowerCase();
        const id = (radio.id || '').toLowerCase();
        // Проверяем, что это R, а не X
        return (name.includes('r') || id.includes('r')) && 
               !name.includes('x') && !id.includes('x');
    });

    rButtonsArray.forEach(function (radioButton) {
        radioButton.addEventListener('change', function () {
            const selectedRValue = parseFloat(this.value);
            if (!isNaN(selectedRValue) && selectedRValue > 0) {
                setR(selectedRValue);
                console.log("Selected R value: " + selectedRValue);
                // Немедленно обновляем график - вызываем напрямую для гарантии
                setTimeout(() => {
                    if (window.refreshPlot) {
                        window.refreshPlot(selectedRValue);
                    } else if (window.drawPlot) {
                        window.drawPlot(selectedRValue, true);
                    }
                }, 10);
            }
        });
    });
    
    // Предотвращаем перезапись X при ручном выборе, если мы только что установили его программно
    const xRadioButtons = document.querySelectorAll('input[type="radio"]');
    const xRadioButtonsArray = Array.from(xRadioButtons).filter(function(radio) {
        const name = (radio.name || '').toLowerCase();
        const id = (radio.id || '').toLowerCase();
        return (name.includes('x') || id.includes('x')) && 
               !name.includes('r') && !id.includes('r');
    });
    
    xRadioButtonsArray.forEach(function (radioButton) {
        radioButton.addEventListener('change', function (event) {
            // Если мы устанавливаем X программно, игнорируем это событие
            if (isSettingXProgrammatically) {
                console.log('Игнорируем изменение X, так как оно установлено программно');
                event.stopPropagation();
                return;
            }
        });
    });

    setDefaults();

    function setDefaults() {
        const xRadioInputs = document.querySelectorAll('input[type="radio"]');
        const xRadios = Array.from(xRadioInputs).filter(function(radio) {
            const name = (radio.name || '').toLowerCase();
            const id = (radio.id || '').toLowerCase();
            return (name.includes('x') || id.includes('x')) && 
                   !name.includes('r') && !id.includes('r');
        });
        for (let radio of xRadios) {
            if (radio.value === "0") {
                radio.checked = true;
                break;
            }
        }
        if (yInput) {
            yInput.value = 0;
        }
        if (xInput) {
            xInput.value = 0;
        }
        if(rValue){
            rValue.value = 0;
        }
    }

    function setR(r) {
        rValue = parseFloat(r);
        if (isNaN(rValue) || rValue <= 0) {
            rValue = 1;
        }

        // Сохраняем текущее значение R
        window.currentRValue = rValue;

        // Немедленно обновляем график при изменении R
        // Фигура перерисовывается с новым R, точки масштабируются по их собственному R
        if (window.refreshPlot) {
            window.refreshPlot(rValue);
        } else if (window.drawPlot) {
            window.drawPlot(rValue, true); // forceRedrawShapes = true для перерисовки фигуры
        } else if (window.filterPointsByCurrentR) {
            window.filterPointsByCurrentR();
        }

        for (let button of rButtons) {
            button.classList.remove('selected');
        }
        for (let button of rButtons) {
            if (parseFloat(button.value) == rValue) {
                button.classList.add('selected');
                break;
            }
        }
    }

    for (let button of rButtons) {
        button.addEventListener('click', function () {
            setR(this.value);
        });
    }

    yInput.addEventListener('input', function () {
        let yValue = yInput.value.replace(/[^0-9.,-]/g, '');

        yValue = yValue.replace(/,/g, '.');

        console.log(yValue);

        if (yValue && (parseFloat(yValue) < -3 || parseFloat(yValue) > 5)) {
            yValue = parseFloat(yValue) > 5 ? '5' : '-3';
        }

        yValue = String(yValue);

        if (yValue.indexOf('.') !== -1 && yValue.split('.')[1].length > 5) {
            yValue = yValue.substring(0, yValue.indexOf('.') + 4);
        }

        if ((yValue.match(/\./g) || []).length > 1) {
            yValue = yValue.substring(0, yValue.lastIndexOf('.'));
        }

        if ((yValue.match(/\./g) || []).length === 1 && yValue.indexOf('.') === 0) {
            yValue = '0' + yValue;
        }

        yInput.value = yValue;
    });
});
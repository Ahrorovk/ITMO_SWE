document.addEventListener('DOMContentLoaded', function () {
    let rValue = 1;

    const rButtons = document.getElementsByClassName('r-button');
    const yInput = document.getElementById('form:y');
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
            const realX = (canvasX - canvas.width / 2) / scale;
            const realY = (canvas.height / 2 - canvasY) / scale;

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

    function setFormValues(x, y, r) {
        // Устанавливаем X (радио-кнопки)
        const xRadios = document.querySelectorAll('input[type="radio"]');
        const xRadioArray = Array.from(xRadios).filter(function(radio) {
            const name = (radio.name || '').toLowerCase();
            const id = (radio.id || '').toLowerCase();
            return (name.includes('x') || id.includes('x')) &&
                   !name.includes('r') && !id.includes('r');
        });

        let xMatched = false;
        for (let radio of xRadioArray) {
            if (Math.abs(parseFloat(radio.value) - x) < 0.0001) {
                radio.checked = true;
                xMatched = true;
                // Триггерим событие change для JSF
                radio.dispatchEvent(new Event('change', { bubbles: true }));
                break;
            }
        }
        if (!xMatched && xRadioArray.length > 0) {
            // Если не нашли точного совпадения (например, x = 1.2), выбираем ближайшее
            const closestRadio = xRadioArray.reduce((prev, curr) => {
                return Math.abs(parseFloat(curr.value) - x) < Math.abs(parseFloat(prev.value) - x) ? curr : prev;
            });
            closestRadio.checked = true;
            closestRadio.dispatchEvent(new Event('change', { bubbles: true }));
        }

        // Устанавливаем Y
        if (yInput) {
            yInput.value = y;
            yInput.dispatchEvent(new Event('input', { bubbles: true }));
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
                    setR(r);
                    break;
                }
            }
        }
    }

    function submitForm() {
        const submitButton = document.getElementById('form:submit');
        if (submitButton) {
            submitButton.click();
        } else {
            // Альтернативный способ - найти форму и отправить
            const form = document.getElementById('form');
            if (form) {
                form.submit();
            }
        }
    }

    function sendPointRequest(x, y, r) {
        setFormValues(x, y, r);
        submitForm();
    }

    window.sendPointRequest = sendPointRequest;

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
    }

    function setR(r) {
        rValue = parseFloat(r);
        if (isNaN(rValue) || rValue <= 0) {
            rValue = 1;
        }

        if (window.refreshPlot) {
            window.refreshPlot(rValue);
        } else if (window.drawPlot) {
            window.drawPlot(rValue);
        } else if (window.filterPointsByCurrentR) {
            window.currentRValue = rValue;
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
import numpy as np

TOL = 1e-3
MAX_ITER = 100

# ---------------------
# ФУНКЦИЯ
# ---------------------

def f(x):
    return 1.442 * (np.sin(2*x) + 0.7*np.cos(3*x/2) + 0.5*np.sin(5*x/3))

def df(x):
    return 1.442 * (
        2*np.cos(2*x)
        - 1.05*np.sin(3*x/2)
        + (5/6)*np.cos(5*x/3)
    )

def d2f(x):
    return 1.442 * (
        -4*np.sin(2*x)
        - 1.575*np.cos(3*x/2)
        - (25/18)*np.sin(5*x/3)
    )

def bisection(a, b, log):
    it = 0
    log.append("\nМетод половинного деления:")
    while abs(b - a) > TOL:
        m = (a + b) / 2
        log.append(f"  Итерация {it}: a={a:.4f}, b={b:.4f}, mid={m:.4f}")
        if df(a) * df(m) <= 0:
            b = m
        else:
            a = m
        it += 1
    root = (a + b) / 2
    log.append(f"  Итог: x = {root:.3f}\n")
    return root

def secant(a, b, log):
    it = 0
    log.append("\nМетод хорд:")
    for _ in range(MAX_ITER):
        fa, fb = df(a), df(b)
        if abs(fb - fa) < 1e-10:
            break
        x = a - fa*(a-b)/(fa - fb)
        log.append(f"  Итерация {it}: a={a:.4f}, b={b:.4f}, x={x:.4f}")
        if abs(df(x)) < TOL:
            break
        if df(a)*df(x) < 0:
            b = x
        else:
            a = x
        it += 1
    log.append(f"  Итог: x = {x:.3f}\n")
    return x

def newton(x0, log):
    x = x0
    it = 0
    log.append("\nМетод Ньютона:")
    for _ in range(MAX_ITER):
        dfx = df(x)
        d2fx = d2f(x)
        if abs(d2fx) < 1e-10:
            break
        x_new = x - dfx/d2fx
        log.append(f"  Итерация {it}: x={x:.4f} → x_new={x_new:.4f}")
        if abs(x_new - x) < TOL:
            x = x_new
            break
        x = x_new
        it += 1
    log.append(f"  Итог: x = {x:.3f}\n")
    return x


def golden(a, b, is_min, log):
    phi = (1 + np.sqrt(5)) / 2
    resphi = 2 - phi
    it = 0

    log.append("\nМетод золотого сечения:")

    while abs(b - a) > TOL:
        x1 = a + resphi*(b-a)
        x2 = b - resphi*(b-a)

        f1 = f(x1)
        f2 = f(x2)

        if not is_min:
            f1, f2 = -f1, -f2

        log.append(f"  Итерация {it}: a={a:.4f}, b={b:.4f}")

        if f1 < f2:
            b = x2
        else:
            a = x1

        it += 1

    root = (a+b)/2
    log.append(f"  Итог: x = {root:.3f}\n")
    return root


x_grid = np.linspace(-8, 8, 20000)
intervals = []

for i in range(len(x_grid)-1):
    if df(x_grid[i]) * df(x_grid[i+1]) < 0:
        intervals.append((x_grid[i], x_grid[i+1]))

clean_intervals = []
for a,b in intervals:
    if not clean_intervals or abs(a - clean_intervals[-1][0]) > 1e-2:
        clean_intervals.append((a,b))


log_data = []
log_data.append("Экстремумы функции на [-8,8]\n")

for idx, (a,b) in enumerate(clean_intervals):
    log_data.append(f"\n==============================")
    log_data.append(f"\nЭкстремум #{idx+1}")
    log_data.append(f"\nИнтервал: [{a:.3f}, {b:.3f}]")

    x_bis = bisection(a,b,log_data)
    kind = "минимум" if d2f(x_bis) > 0 else "максимум"
    log_data.append(f"\nТип экстремума: {kind}")

    secant(a,b,log_data)
    newton((a+b)/2,log_data)
    golden(a,b, kind=="минимум",log_data)

# ---------------------
# ЗАПИСЬ В TXT
# ---------------------

with open("results.txt", "w", encoding="utf-8") as file:
    for line in log_data:
        file.write(line + "\n")

print("Файл results.txt успешно создан.")
import numpy as np
import matplotlib.pyplot as plt

TOL = 1e-3
MAX_ITER = 20

# -----------------
# Функция
# -----------------

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

# Возьмём один найденный интервал вручную
a, b = -6.964, -6.963

# -----------------
# 1️⃣ Половинное деление
# -----------------

bis_points = []
a1, b1 = a, b

while abs(b1 - a1) > TOL:
    m = (a1 + b1) / 2
    bis_points.append(m)
    if df(a1) * df(m) <= 0:
        b1 = m
    else:
        a1 = m

# -----------------
# 2️⃣ Метод хорд
# -----------------

sec_points = []
a2, b2 = a, b

for _ in range(MAX_ITER):
    fa, fb = df(a2), df(b2)
    if abs(fb - fa) < 1e-10:
        break
    x = a2 - fa*(a2-b2)/(fa - fb)
    sec_points.append(x)
    if abs(df(x)) < TOL:
        break
    if df(a2)*df(x) < 0:
        b2 = x
    else:
        a2 = x

# -----------------
# 3️⃣ Метод Ньютона
# -----------------

newton_points = []
x = (a+b)/2

for _ in range(MAX_ITER):
    newton_points.append(x)
    dfx = df(x)
    d2fx = d2f(x)
    if abs(d2fx) < 1e-10:
        break
    x_new = x - dfx/d2fx
    if abs(x_new - x) < TOL:
        newton_points.append(x_new)
        break
    x = x_new

# -----------------
# 4️⃣ Золотое сечение
# -----------------

gold_points = []
phi = (1 + np.sqrt(5)) / 2
resphi = 2 - phi
a3, b3 = a, b

while abs(b3 - a3) > TOL:
    x1 = a3 + resphi*(b3-a3)
    x2 = b3 - resphi*(b3-a3)
    gold_points.append(x1)
    gold_points.append(x2)
    if f(x1) < f(x2):
        b3 = x2
    else:
        a3 = x1

# -----------------
# Визуализация
# -----------------

xs = np.linspace(a-1, b+1, 1000)

plt.figure(figsize=(10,6))
plt.plot(xs, f(xs), label="f(x)")

# Половинное деление
plt.scatter(bis_points, [f(x) for x in bis_points],
            color="blue", label="Половинное деление")

# Хорды
plt.scatter(sec_points, [f(x) for x in sec_points],
            color="purple", label="Хорды")

# Ньютон
plt.scatter(newton_points, [f(x) for x in newton_points],
            color="red", label="Ньютон")

# Золотое сечение
plt.scatter(gold_points, [f(x) for x in gold_points],
            color="green", label="Золотое сечение")

plt.legend()
plt.grid()
plt.title("Итерации всех методов для одного экстремума")
plt.show()
import math

def f(x):
    return x**2 + x + math.sin(x)

x1 = -1
x3 = 0
x2 = (x1 + x3) / 2

eps = 0.0001
iteration = 0

while True:
    f1 = f(x1)
    f2 = f(x2)
    f3 = f(x3)

    numerator = (x2-x1)**2*(f2-f3) - (x2-x3)**2*(f2-f1)
    denominator = (x2-x1)*(f2-f3) - (x2-x3)*(f2-f1)

    if denominator == 0:
        break

    x_new = x2 - 0.5 * numerator / denominator

    # если вершина вне интервала
    if x_new <= x1 or x_new >= x3:
        delta = (x3 - x1) / 4

        # центрируемся и берём новые 3 точки
        x2 = (x1 + x3) / 2
        x1 = x2 - delta
        x3 = x2 + delta

        print("Итерация:", iteration, "(перестроение точек)")
        print(f"x1={x1}, x2={x2}, x3={x3}")
        iteration += 1
        continue

    print("Итерация:", iteration)
    print("x_new =", x_new)

    if abs(x_new - x2) < eps:
        break

    # обновление интервала
    if x_new < x2:
        x3 = x2
    else:
        x1 = x2

    x2 = x_new
    iteration += 1

print("\nМинимум функции:")
print("x* =", x_new)
print("f(x*) =", f(x_new))
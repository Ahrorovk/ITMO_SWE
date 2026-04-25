import numpy as np
import matplotlib.pyplot as plt

# ==============================================================================
# ДАННЫЕ ИЗ ВАРИАНТА 14
# Используем те же 5 точек (x, y, z), что и в задании на гауссиану
# ==============================================================================
data = np.array([
    [0.93, 1.12, -0.03],
    [1.96, 2.04,  1.90],
    [3.01, 2.89,  3.96],
    [3.92, 3.95,  1.92],
    [4.95, 4.96,  0.03]
])

# Признаки (features): столбцы 0 и 1
X_data = data[:, :2]   # shape (5, 2) — матрица объект-признак
# Целевой признак (target): столбец 2
Z_data = data[:, 2]    # shape (5,)


# ==============================================================================
# КЛАСС: K-MEANS (обучение без учителя)
# Используется для инициализации центров РБФ-нейронов
# ==============================================================================
class KMeans:
    """
    Реализация алгоритма K-средних с нуля (без sklearn).
    Алгоритм:
      0. Инициализируем центры — случайно выбираем k объектов из датасета.
      1. Каждый объект приписываем к ближайшему центру (евклидово расстояние).
      2. Пересчитываем центры как среднее арифметическое объектов в кластере.
      3. Повторяем до сходимости (малое смещение центров) или до max_iter итераций.
    """

    def __init__(self, k=2, max_iter=100, tol=1e-6, random_state=42):
        self.k = k                   # количество кластеров (= количество РБФ-нейронов)
        self.max_iter = max_iter     # максимальное число итераций
        self.tol = tol               # порог сходимости (epsilon)
        self.random_state = random_state
        self.centers = None          # итоговые центры кластеров, shape (k, n_features)

    def fit(self, X):
        """
        Обучение K-Means на данных X (shape: n_samples x n_features).
        Возвращает self для удобства цепочки вызовов.
        """
        np.random.seed(self.random_state)
        n_samples = X.shape[0]

        # Шаг 0: случайно выбираем k различных объектов в качестве начальных центров
        idx = np.random.choice(n_samples, self.k, replace=False)
        self.centers = X[idx].copy()  # shape (k, n_features)

        print("\n" + "=" * 60)
        print("K-MEANS: поиск центров РБФ-нейронов")
        print("=" * 60)
        print(f"Начальные центры (случайный выбор из датасета):")
        for j, c in enumerate(self.centers):
            print(f"  c{j+1} = ({c[0]:.4f}, {c[1]:.4f})")

        for it in range(self.max_iter):
            # Шаг 1: присваиваем каждый объект ближайшему центру
            labels = self._assign(X)

            # Шаг 2: пересчитываем центры
            new_centers = np.zeros_like(self.centers)
            for j in range(self.k):
                members = X[labels == j]
                if len(members) == 0:
                    # Если кластер пустой — оставляем старый центр
                    new_centers[j] = self.centers[j]
                else:
                    new_centers[j] = members.mean(axis=0)

            # Шаг 3: проверяем сходимость
            shift = np.linalg.norm(new_centers - self.centers)
            print(f"  Итерация {it}: центры сместились на {shift:.6f}")
            for j, c in enumerate(new_centers):
                members_idx = np.where(labels == j)[0] + 1  # 1-based
                print(f"    c{j+1} = ({c[0]:.4f}, {c[1]:.4f}), объекты в кластере: {list(members_idx)}")

            self.centers = new_centers.copy()

            if shift < self.tol:
                print(f"  Сходимость достигнута на итерации {it}.")
                break

        print(f"\nИтоговые центры K-Means:")
        for j, c in enumerate(self.centers):
            print(f"  c{j+1} = ({c[0]:.4f}, {c[1]:.4f})")
        return self

    def _assign(self, X):
        """
        Для каждого объекта находим индекс ближайшего центра.
        Расстояние: евклидово ||x - c_j||_2
        """
        # distances shape: (n_samples, k)
        distances = np.array([
            np.linalg.norm(X - self.centers[j], axis=1)
            for j in range(self.k)
        ]).T  # shape (n_samples, k)
        return np.argmin(distances, axis=1)  # shape (n_samples,)


# ==============================================================================
# КЛАСС: RBF NETWORK (обучение с учителем через градиентный спуск)
# Модель: z_RBF = w1*G1(x,y) + w2*G2(x,y) + w0
# где Gj(x,y) = exp(-( (x-c_jx)^2 + (y-c_jy)^2 ) / (2*sigma_j^2))
# Параметры: centers (c_jx, c_jy), widths (sigma_j), weights (w0, w1, w2)
# ==============================================================================
class RBFNetwork:
    """
    RBF-сеть с двумя скрытыми нейронами (Стратегия 2 из лекций):
      - Шаг 1: K-Means инициализирует центры.
      - Шаг 2: Градиентный спуск обновляет ВСЕ параметры: centers, sigmas, weights.
    Loss = MSE = (1 / (2*N)) * sum((z_RBF^i - z^i)^2)
    """

    def __init__(self, n_rbf=2, lr=0.05, max_iter=2000, tol=1e-9,
                 random_state=42, eps=1e-8):
        self.n_rbf = n_rbf           # количество РБФ-нейронов (скрытых нейронов)
        self.lr = lr                 # скорость обучения (learning rate, гиперпараметр)
        self.max_iter = max_iter     # максимальное число итераций градиентного спуска
        self.tol = tol               # порог сходимости по изменению Loss
        self.random_state = random_state
        self.eps = eps               # малая добавка для числовой стабильности (избегаем деления на 0)

        # Параметры модели (инициализируются в fit)
        self.centers = None   # shape (n_rbf, 2) — координаты центров
        self.sigmas  = None   # shape (n_rbf,)   — ширины гауссиан
        self.weights = None   # shape (n_rbf+1,) — [w0, w1, w2]

        self.loss_history = []  # история значений Loss по итерациям

    # ------------------------------------------------------------------
    # ПРЯМОЙ ПРОХОД (forward pass)
    # ------------------------------------------------------------------
    def _rbf_activations(self, X):
        """
        Вычисляем активации скрытых нейронов для всех объектов.
        G_j(x,y) = exp(-((x-c_jx)^2 + (y-c_jy)^2) / (2*sigma_j^2))
        Возвращает матрицу G shape (n_samples, n_rbf).
        """
        n_samples = X.shape[0]
        G = np.zeros((n_samples, self.n_rbf))
        for j in range(self.n_rbf):
            # Расстояния от каждого объекта до j-го центра (по обоим признакам)
            diff = X - self.centers[j]          # shape (n_samples, 2)
            sq_dist = np.sum(diff ** 2, axis=1) # shape (n_samples,)
            denom = 2.0 * self.sigmas[j] ** 2 + self.eps
            G[:, j] = np.exp(-sq_dist / denom)
        return G  # shape (n_samples, n_rbf)

    def predict(self, X):
        """
        Предсказание модели: z_RBF = w0 + w1*G1 + w2*G2 + ...
        Возвращает вектор предсказаний shape (n_samples,).
        """
        G = self._rbf_activations(X)    # shape (n_samples, n_rbf)
        # weights[0] = w0 (bias), weights[1:] = [w1, w2, ...]
        z_pred = self.weights[0] + G @ self.weights[1:]
        return z_pred

    def _loss(self, z_pred, z_true):
        """
        MSE Loss = (1 / (2*N)) * sum((z_pred - z_true)^2)
        Коэффициент 1/2 упрощает вид производных.
        """
        N = len(z_true)
        return 0.5 * np.mean((z_pred - z_true) ** 2)

    # ------------------------------------------------------------------
    # ГРАДИЕНТЫ (аналитические производные Loss по всем параметрам)
    # ------------------------------------------------------------------
    def _compute_gradients(self, X, z_true):
        """
        Вычисляем аналитические градиенты Loss по всем параметрам.

        Обозначения:
          e^i = z_RBF^i - z^i  — ошибка на i-м объекте
          G_j^i                 — активация j-го нейрона на i-м объекте
          d_j^i = (x^i - c_jx)^2 + (y^i - c_jy)^2  — квадрат расстояния

        Производные (из лекционных слайдов):
          dL/dw0     = (1/N) * sum(e^i)
          dL/dw_j    = (1/N) * sum(e^i * G_j^i)
          dL/dc_jx   = (1/N) * sum(e^i * w_j * G_j^i * (x^i - c_jx) / sigma_j^2)
          dL/dc_jy   = (1/N) * sum(e^i * w_j * G_j^i * (y^i - c_jy) / sigma_j^2)
          dL/dsigma_j= (1/N) * sum(e^i * w_j * G_j^i * d_j^i / sigma_j^3)
        """
        N = X.shape[0]
        G = self._rbf_activations(X)      # shape (N, n_rbf)
        z_pred = self.weights[0] + G @ self.weights[1:]
        errors = z_pred - z_true          # shape (N,)   — вектор ошибок e^i

        # Градиент по w0 (bias)
        grad_w0 = np.mean(errors)

        # Градиенты по весам w_j и по параметрам центров и ширин
        grad_weights = np.zeros(self.n_rbf)
        grad_centers = np.zeros_like(self.centers)   # shape (n_rbf, 2)
        grad_sigmas  = np.zeros(self.n_rbf)

        for j in range(self.n_rbf):
            wj = self.weights[j + 1]         # скалярный вес j-го нейрона
            Gj = G[:, j]                     # shape (N,) — активации j-го нейрона

            # dL/dw_j = (1/N)*sum(e^i * G_j^i)
            grad_weights[j] = np.mean(errors * Gj)

            # Разности координат: x^i - c_jx и y^i - c_jy
            diff = X - self.centers[j]       # shape (N, 2)
            sq_dist = np.sum(diff ** 2, axis=1)  # d_j^i, shape (N,)

            # Общий множитель для производных по центрам и sigma:
            # common = e^i * w_j * G_j^i
            common = errors * wj * Gj        # shape (N,)

            sigma2 = self.sigmas[j] ** 2 + self.eps  # sigma_j^2 (защита от нуля)

            # dL/dc_jx = (1/N)*sum(common * (x^i - c_jx) / sigma_j^2)
            grad_centers[j, 0] = np.mean(common * diff[:, 0] / sigma2)
            # dL/dc_jy = (1/N)*sum(common * (y^i - c_jy) / sigma_j^2)
            grad_centers[j, 1] = np.mean(common * diff[:, 1] / sigma2)

            # dL/dsigma_j = (1/N)*sum(common * d_j^i / sigma_j^3)
            sigma3 = self.sigmas[j] ** 3 + self.eps  # sigma_j^3 (защита от нуля)
            grad_sigmas[j]  = np.mean(common * sq_dist / sigma3)

        return grad_w0, grad_weights, grad_centers, grad_sigmas

    # ------------------------------------------------------------------
    # ОБУЧЕНИЕ (fit)
    # ------------------------------------------------------------------
    def fit(self, X, z_true, log_every=100):
        """
        Полный цикл обучения:
          1. K-Means инициализирует центры (обучение без учителя).
          2. Градиентный спуск оптимизирует все параметры (обучение с учителем).
        """
        N = X.shape[0]
        np.random.seed(self.random_state)

        # ---- ШАГ 1: K-Means для инициализации центров ----
        km = KMeans(k=self.n_rbf, random_state=self.random_state)
        km.fit(X)
        self.centers = km.centers.copy()   # shape (n_rbf, 2)

        # ---- Инициализация sigma: половина расстояния между двумя центрами ----
        if self.n_rbf == 2:
            dist_centers = np.linalg.norm(self.centers[0] - self.centers[1])
            sigma_init = dist_centers / 2.0
        else:
            sigma_init = 1.0
        self.sigmas = np.full(self.n_rbf, sigma_init)  # shape (n_rbf,)

        # ---- Инициализация весов: малые случайные значения ----
        # weights[0] = w0 (bias), weights[1:] = [w1, ..., w_k]
        self.weights = np.random.randn(self.n_rbf + 1) * 0.1
        self.weights[0] = 0.0   # bias стартует с нуля

        print("\n" + "=" * 60)
        print("НАЧАЛЬНОЕ ПРИБЛИЖЕНИЕ ДЛЯ ГРАДИЕНТНОГО СПУСКА")
        print("=" * 60)
        for j in range(self.n_rbf):
            print(f"  c{j+1}     = ({self.centers[j,0]:.4f}, {self.centers[j,1]:.4f})")
        for j in range(self.n_rbf):
            print(f"  sigma{j+1}  = {self.sigmas[j]:.4f}")
        print(f"  weights = {np.round(self.weights, 4)}")
        print(f"  lr (скорость обучения) = {self.lr}")

        # ---- ШАГ 2: Градиентный спуск ----
        print("\n" + "=" * 60)
        print("ГРАДИЕНТНЫЙ СПУСК: оптимизация всех параметров")
        print("=" * 60)

        prev_loss = np.inf
        self.loss_history = []

        for it in range(self.max_iter):
            # Прямой проход — предсказания
            z_pred = self.predict(X)
            loss   = self._loss(z_pred, z_true)
            self.loss_history.append(loss)

            # Детальный лог на нулевой итерации и каждые log_every итераций
            if it % log_every == 0 or it == 0:
                print(f"\nИтерация {it:5d} | Loss (MSE) = {loss:.8f}")
                print(f"  Предсказания: {np.round(z_pred, 4)}")
                print(f"  Истинные:     {np.round(z_true, 4)}")
                for j in range(self.n_rbf):
                    print(f"  c{j+1}=({self.centers[j,0]:.4f},{self.centers[j,1]:.4f})"
                          f"  sigma{j+1}={self.sigmas[j]:.4f}"
                          f"  w{j+1}={self.weights[j+1]:.4f}")
                print(f"  w0={self.weights[0]:.4f}")

            # Проверка сходимости по изменению Loss
            if abs(prev_loss - loss) < self.tol and it > 0:
                print(f"\n  Сходимость достигнута на итерации {it}. Loss = {loss:.10f}")
                break
            prev_loss = loss

            # Вычисляем градиенты
            grad_w0, grad_weights, grad_centers, grad_sigmas = \
                self._compute_gradients(X, z_true)

            # Шаг градиентного спуска (обновляем ВСЕ параметры):
            # param^{it+1} = param^{it} - lr * dL/dparam
            self.weights[0]  -= self.lr * grad_w0
            self.weights[1:] -= self.lr * grad_weights
            self.centers     -= self.lr * grad_centers
            # Ограничиваем sigmas снизу (sigma > 0)
            self.sigmas      -= self.lr * grad_sigmas
            self.sigmas       = np.maximum(self.sigmas, 1e-3)

        return self

    # ------------------------------------------------------------------
    # ИТОГОВЫЙ ОТЧЁТ
    # ------------------------------------------------------------------
    def print_final_report(self, X, z_true):
        """
        Печатает финальную модель, предсказания и невязки.
        """
        z_pred = self.predict(X)
        final_loss = self._loss(z_pred, z_true)

        print("\n" + "=" * 60)
        print("ИТОГОВАЯ МОДЕЛЬ")
        print("=" * 60)
        print(f"z_RBF = {self.weights[0]:.4f}")
        for j in range(self.n_rbf):
            cjx, cjy = self.centers[j]
            sj = self.sigmas[j]
            wj = self.weights[j + 1]
            print(f"  + {wj:.4f} * exp(-((x1 - {cjx:.4f})^2 + (x2 - {cjy:.4f})^2)"
                  f" / (2 * {sj:.4f}^2))")

        print(f"\nFinальный Loss (MSE) = {final_loss:.8f}")
        print("\nНевязки по каждому объекту:")
        print(f"  {'i':>3}  {'z_true':>8}  {'z_pred':>8}  {'|error|':>10}")
        for i in range(len(z_true)):
            err = abs(z_pred[i] - z_true[i])
            print(f"  {i+1:>3}  {z_true[i]:>8.4f}  {z_pred[i]:>8.4f}  {err:>10.6f}")

    # ------------------------------------------------------------------
    # ВИЗУАЛИЗАЦИЯ
    # ------------------------------------------------------------------
    def plot_loss(self):
        """Кривая обучения: Loss vs Iteration."""
        plt.figure(figsize=(8, 4))
        plt.plot(self.loss_history, color='steelblue', linewidth=1.5, label='Loss (MSE)')
        plt.yscale('log')
        plt.xlabel('Итерация')
        plt.ylabel('Loss (MSE, логарифмическая шкала)')
        plt.title('Кривая обучения RBF-сети')
        plt.grid(True, alpha=0.4)
        plt.legend()
        plt.tight_layout()
        plt.savefig('rbf_loss_curve.png', dpi=150)
        plt.show()
        print("График Loss сохранён: rbf_loss_curve.png")

    def plot_model(self, X, z_true):
        """3D-поверхность модели + линии уровня с точками данных."""
        x_grid = np.linspace(0, 6, 60)
        y_grid = np.linspace(0, 6, 60)
        XX, YY = np.meshgrid(x_grid, y_grid)
        # Объединяем узлы сетки в матрицу (N_grid, 2) и вычисляем предсказания
        XY_grid = np.column_stack([XX.ravel(), YY.ravel()])
        ZZ = self.predict(XY_grid).reshape(XX.shape)

        fig = plt.figure(figsize=(14, 6))

        # --- 3D ---
        ax1 = fig.add_subplot(121, projection='3d')
        ax1.plot_surface(XX, YY, ZZ, cmap='viridis', alpha=0.8)
        ax1.scatter(X[:, 0], X[:, 1], z_true, c='red', s=60, zorder=5, label='Данные')
        for j in range(self.n_rbf):
            z_c = self.predict(self.centers[j:j+1])[0]
            ax1.scatter(*self.centers[j], z_c, c='yellow', marker='*',
                        s=120, zorder=6, label=f'Центр {j+1}')
        ax1.set_xlabel('X1'); ax1.set_ylabel('X2'); ax1.set_zlabel('Z')
        ax1.set_title('RBF-сеть: 3D поверхность')
        ax1.legend(fontsize=8)

        # --- Линии уровня ---
        ax2 = fig.add_subplot(122)
        cf = ax2.contourf(XX, YY, ZZ, levels=25, cmap='viridis', alpha=0.85)
        ax2.contour(XX, YY, ZZ, levels=10, colors='white', alpha=0.3, linewidths=0.5)
        sc = ax2.scatter(X[:, 0], X[:, 1], c=z_true, s=100, edgecolors='red',
                         linewidths=1.5, cmap='viridis', zorder=5, label='Данные')
        for j in range(self.n_rbf):
            ax2.scatter(*self.centers[j], marker='*', s=200, c='yellow',
                        edgecolors='black', linewidths=0.8, zorder=6, label=f'Центр {j+1}')
            # Окружность радиуса sigma_j вокруг центра
            theta = np.linspace(0, 2 * np.pi, 200)
            ax2.plot(self.centers[j, 0] + self.sigmas[j] * np.cos(theta),
                     self.centers[j, 1] + self.sigmas[j] * np.sin(theta),
                     '--', color='white', linewidth=1.0, alpha=0.7,
                     label=f'σ{j+1}={self.sigmas[j]:.2f}')
        plt.colorbar(cf, ax=ax2, label='Z')
        ax2.set_xlabel('X1'); ax2.set_ylabel('X2')
        ax2.set_title('RBF-сеть: линии уровня + данные')
        ax2.legend(fontsize=7, loc='upper left')
        ax2.grid(True, alpha=0.3)

        plt.tight_layout()
        plt.savefig('rbf_model_surface.png', dpi=150)
        plt.show()
        print("График модели сохранён: rbf_model_surface.png")


# ==============================================================================
# ГЛАВНЫЙ РАЗДЕЛ (main)
# ==============================================================================
if __name__ == "__main__":
    print("=" * 60)
    print("RBF NEURAL NETWORK — ВАРИАНТ 14")
    print("=" * 60)

    print("\nДатасет (вариант 14):")
    print(f"  {'i':>3}  {'x1':>6}  {'x2':>6}  {'z':>6}")
    for i, row in enumerate(data):
        print(f"  {i+1:>3}  {row[0]:>6.2f}  {row[1]:>6.2f}  {row[2]:>6.2f}")

    # Создаём и обучаем RBF-сеть
    rbf = RBFNetwork(
        n_rbf=2,          # два РБФ-нейрона (как в лекциях)
        lr=0.05,          # скорость обучения
        max_iter=5000,    # максимум итераций
        tol=1e-10,        # порог сходимости
        random_state=0
    )

    rbf.fit(X_data, Z_data, log_every=500)

    # Итоговый отчёт с невязками
    rbf.print_final_report(X_data, Z_data)

    # Графики
    rbf.plot_loss()
    rbf.plot_model(X_data, Z_data)

    print("\n✅ Готово! RBF-сеть обучена на данных варианта 14.")
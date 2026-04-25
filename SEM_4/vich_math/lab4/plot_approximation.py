#!/usr/bin/env python3
"""
График по данным из Kotlin (MNK): читает plot_data.json (рядом с отчётом).
Запуск: python3 plot_approximation.py <path/to/plot_data.json>
"""
import json
import sys
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np


def main() -> int:
    if len(sys.argv) < 2:
        print("Usage: python3 plot_approximation.py <plot_data.json>", file=sys.stderr)
        return 1
    path = Path(sys.argv[1])
    data = json.loads(path.read_text(encoding="utf-8"))

    x_points = np.array(data["x_points"], dtype=float)
    y_points = np.array(data["y_points"], dtype=float)
    coeffs_lin = np.array(data["poly_linear"], dtype=float)
    coeffs_quad = np.array(data["poly_quad"], dtype=float)
    coeffs_cub = np.array(data["poly_cubic"], dtype=float)

    show_true = bool(data.get("show_true_curve_variant1", False))
    x_lo = float(data.get("x_smooth_low", -0.5))
    x_hi = float(data.get("x_smooth_high", 2.5))
    x_plot_min = float(data.get("x_plot_min", x_points.min() - 0.2))
    x_plot_max = float(data.get("x_plot_max", x_points.max() + 0.2))

    x_smooth = np.linspace(x_lo, x_hi, 400)

    plt.figure(figsize=(10, 6))

    if show_true:
        y_true = (2.0 * x_smooth) / (x_smooth**4 + 1.0)
        plt.plot(x_smooth, y_true, "k--", linewidth=1.5, label="Истинная f(x) = 2x/(x⁴+1)")

    y_lin = np.polyval(coeffs_lin, x_smooth)
    y_quad = np.polyval(coeffs_quad, x_smooth)
    y_cub = np.polyval(coeffs_cub, x_smooth)

    plt.scatter(x_points, y_points, color="red", s=40, zorder=5, label="Табличные узлы")
    plt.plot(x_smooth, y_lin, label="Линейная (коэффициенты из Kotlin)", alpha=0.85)
    plt.plot(x_smooth, y_quad, label="Квадратичная (Kotlin)", alpha=0.85)
    plt.plot(x_smooth, y_cub, label="Кубическая (Kotlin)", alpha=0.95, linewidth=2)

    plt.title("Аппроксимация методом наименьших квадратов")
    plt.xlabel("x")
    plt.ylabel("y")
    plt.xlim(x_plot_min, x_plot_max)
    y_all = np.concatenate([y_points, y_lin, y_quad, y_cub])
    if show_true:
        y_all = np.concatenate([y_all, (2.0 * x_smooth) / (x_smooth**4 + 1.0)])
    pad = 0.5 * (y_all.max() - y_all.min() + 1e-9)
    plt.ylim(y_points.min() - pad, y_points.max() + pad)
    plt.grid(True, linestyle="--", alpha=0.6)
    plt.legend(loc="best")

    out_png = path.parent / "approximation_plot.png"
    plt.savefig(out_png, dpi=150, bbox_inches="tight")
    print(f"PNG сохранён: {out_png}")
    plt.show()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

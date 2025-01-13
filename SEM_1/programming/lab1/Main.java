import java.util.Random;

import static java.lang.Math.*;

public class Main {
    private static final int ARR_W = 11;
    private static final int ARR_X = 14;

    private static double calculate(int w, double x) {
        return switch (w) {
            case 16 -> asin(pow(sin(x), 2.0));
            case 2, 4, 14, 20, 22 -> pow((3 / 4) / (1 - sin(pow(x, 1.0 / 3.0))), 2.0);
            default ->
                    pow(pow(0.25 / (pow(3 / 4 - pow(x, 1.0 / 3.0), 2.0)), sin(pow(x / (0.25 + x), 2.0))), (1.0 / 3.0));
        };
    }

    private static void printAnswer(double[][] q) {
        for (int i = 0; i < ARR_W; i++) {
            for (int j = 0; j < ARR_X; j++) {
                System.out.printf("%.2f ", q[i][j]);
                System.out.print(" ");
            }
            System.out.println();
        }
    }

    private static double[][] changeMatrix(int[] w, double[] x) {
        double[][] ans = new double[ARR_W][ARR_X];
        for (int i = 0; i < ARR_W; i++) {
            for (int j = 0; j < ARR_X; j++) {
                ans[i][j] = calculate(w[i], x[j]);
            }
        }
        return ans;
    }

    private static double[] setRandom() {
        double[] x = new double[ARR_X];
        Random random = new Random();
        int min = -6;
        int max = 10;
        for (int i = 0; i < ARR_X; i++) {
            x[i] = random.nextInt(max - min + 1) + min;
        }
        return x;
    }

    private static int[] setEvens() {
        int[] w = new int[ARR_W];
        int j = 0;
        for (int i = 22; i >= 2; i -= 2) {
            w[j] = i;
            j++;
        }
        return w;
    }

    public static void main(String[] args) {
        int[] w = setEvens();

        System.out.print("First array: \n");

        for (int val : w) {
            System.out.print(val + " ");
        }

        System.out.println();

        System.out.print("Second array: \n");

        double[] x = setRandom();

        for (double val : x) {
            System.out.print(val + " ");
        }

        System.out.println();

        System.out.print("Matrix: \n");

        double[][] q = changeMatrix(w, x);

        printAnswer(q);

    }
}
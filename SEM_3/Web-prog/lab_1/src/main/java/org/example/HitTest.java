package org.example;

public class HitTest {
    public static boolean check(double x, double y, double r) {
        boolean rect = (x >= -r && x <= 0) && (y >= 0 && y <= r/2.0);
        boolean circle = (x <= 0 && y <= 0 && (x*x + y*y <= r*r));
        boolean triangle = (x >= 0 && y <= 0 && y >= x - r);
        return rect || circle || triangle;
    }
}

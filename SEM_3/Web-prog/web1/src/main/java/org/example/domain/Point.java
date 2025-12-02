package org.example.domain;

import org.example.services.ValidationException;

import java.util.Objects;

/**
 * Value object representing a point with coordinates
 */
public final class Point {
    private final int x;
    private final double y;
    private final double r;
    private static final double MIN_Y = -3.0;
    private static final double MAX_Y = 5.0;
    private static final double MIN_R = 1.0;
    private static final double MAX_R = 3.0;
    public Point(int x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public int getX() {
        return x;
    }

    public double getY() throws ValidationException {
        if (y < MIN_Y || y > MAX_Y) {
            throw new ValidationException("y has forbidden value");
        }
        return y;
    }

    public double getR() throws ValidationException {
        if (r < MIN_R || r > MAX_R) {
            throw new ValidationException("r has forbidden value");
        }
        return r;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Point point = (Point) o;
        return x == point.x && 
               Double.compare(point.y, y) == 0 &&
               Double.compare(point.r, r) == 0;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y, r);
    }

    @Override
    public String toString() {
        return String.format("Point{x=%d, y=%.2f, r=%.2f}", x, y, r);
    }
}

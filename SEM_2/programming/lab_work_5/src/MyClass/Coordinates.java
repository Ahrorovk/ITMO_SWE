package MyClass;

import java.io.Serializable;

public class Coordinates implements Serializable {
    private Long x; // Значение должно быть > -26, не null
    private Long y; // Не null

    public Coordinates(Long x, Long y) {
        if (x == null || x <= -26) {
            throw new IllegalArgumentException("X не может быть null и должно быть больше -26");
        }
        if (y == null) {
            throw new IllegalArgumentException("Y не может быть null");
        }
        this.x = x;
        this.y = y;
    }

    public Long getX() {
        return x;
    }

    public void setX(Long x) {
        if (x == null || x <= -26) {
            throw new IllegalArgumentException("X не может быть null и должно быть больше -26");
        }
        this.x = x;
    }

    public Long getY() {
        return y;
    }

    public void setY(Long y) {
        if (y == null) {
            throw new IllegalArgumentException("Y не может быть null");
        }
        this.y = y;
    }

    @Override
    public String toString() {
        return "Coordinates{" +
                "x=" + x +
                ", y=" + y +
                '}';
    }
}



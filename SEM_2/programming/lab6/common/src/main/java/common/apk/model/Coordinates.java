package common.apk.model;

import java.io.Serializable;

public class Coordinates implements Serializable {
    private Long x;
    private Long y;

    public Coordinates() {
    }

    public Coordinates(Long x, Long y) {
        this.x = x;
        this.y = y;
    }

    public Long getX() {
        return x;
    }

    public void setX(Long x) {
        this.x = x;
    }

    public Long getY() {
        return y;
    }

    public void setY(Long y) {
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



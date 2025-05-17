package common.model;

import java.io.Serializable;

public class Coordinates implements Serializable, Validatable {
  private Long x; // Значение должно быть > -26, не null
  private Long y; // Не null

  public Coordinates(Long x, Long y) {
    if (x == null) {
      throw new IllegalArgumentException("X can`t be a null and should be greater than -26");
    }
    if (y == null) {
      throw new IllegalArgumentException("Y can`t be a null");
    }
    this.x = x;
    this.y = y;
  }

  public Coordinates(String s) {
    try {
      try {
        this.x = Long.parseLong(s.split(";")[0]);
      } catch (NumberFormatException e) {
        this.x = 1L;
      }
      try {
        this.y = Long.parseLong(s.split(";")[1]);
      } catch (NumberFormatException e) {
        this.y = 1L;
      }
    } catch (ArrayIndexOutOfBoundsException e) {
      this.x = 1L;
      this.y = 1L;
    }
  }


  @Override
  public boolean validate() {
    if (x == null || y == null) return false;
    return true;
  }

  @Override
  public void validation() {

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



package com.ahrorovk.managment;

import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Named
@SessionScoped
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AttemptBean implements Serializable {
    double x = 0;
    double y = 0;
    double r = 0;
    boolean result;

    public double getX() {return x;}
    public double getY() {return y;}
    public double getR() {return r;}

    public void setX(double x) {this.x = x;}
    public void setY(double y) {this.y = y;}
    public void setR(double r) {this.r = r;}
    public boolean isResult() {return result;}

    public String checkPoint() {
        boolean inTriangle = (x >= 0 && y >= 0 && x + y <= r);
        boolean inRectangle = (x >= 0 && x <= r/2 && y <= 0 && y >= -r);
        boolean inCircle = (x <= 0 && y <= 0 && (x * x + y * y <= (r/2) * (r/2)));
        result = inTriangle || inRectangle || inCircle;
        return "app.xhtml";
    }
}

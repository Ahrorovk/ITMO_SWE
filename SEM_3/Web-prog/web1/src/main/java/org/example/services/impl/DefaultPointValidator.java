package org.example.services.impl;

import org.example.domain.Point;
import org.example.services.PointValidator;
import org.example.services.ValidationException;

/**
 * Default implementation of PointValidator
 * Follows Open/Closed Principle (OCP) - open for extension, closed for modification
 */
public class DefaultPointValidator implements PointValidator {
    
    private static final int MIN_X = -2;
    private static final int MAX_X = 2;
    private static final double MIN_Y = -3.0;
    private static final double MAX_Y = 5.0;
    private static final double MIN_R = 1.0;
    private static final double MAX_R = 3.0;

    @Override
    public void validate(Point point) throws ValidationException {
        validateX(point.getX());
        validateY(point.getY());
        validateR(point.getR());
    }

    private void validateX(int x) throws ValidationException {
        if (x < MIN_X || x > MAX_X) {
            throw new ValidationException("x has forbidden value");
        }
    }

    private void validateY(double y) throws ValidationException {
        if (y < MIN_Y || y > MAX_Y) {
            throw new ValidationException("y has forbidden value");
        }
    }

    private void validateR(double r) throws ValidationException {
        if (r < MIN_R || r > MAX_R) {
            throw new ValidationException("r has forbidden value");
        }
    }
}


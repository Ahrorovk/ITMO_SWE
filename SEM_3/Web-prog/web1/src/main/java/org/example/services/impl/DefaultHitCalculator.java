package org.example.services.impl;

import org.example.domain.Point;
import org.example.services.HitCalculator;
import org.example.services.ValidationException;

/**
 * Default implementation of HitCalculator
 * Implements the geometric calculation logic
 * Follows Single Responsibility Principle (SRP)
 */
public class DefaultHitCalculator implements HitCalculator {

    @Override
    public boolean calculateHit(Point point) {
        float x = point.getX();
        double y = 0;
        try {
            y = point.getY();
        } catch (ValidationException e) {
            throw new RuntimeException(e);
        }
        double r = 0;
        try {
            r = point.getR();
        } catch (ValidationException e) {
            throw new RuntimeException(e);
        }

        // Quadrant I (x > 0, y > 0): Circle check
        if (x > 0 && y > 0) {
            return (x * x + y * y) <= (r * r);
        }
        
        // Quadrant II (x < 0, y > 0): Always false
        if (x < 0 && y > 0) {
            return false;
        }
        
        // Quadrant III (x < 0, y < 0): Triangle check
        if (x < 0 && y < 0) {
            return (x + y) >= -r;
        }
        
        // Quadrant IV (x > 0, y < 0): Rectangle check
        if (x > 0 && y < 0) {
            return x <= r && y >= -r/2;
        }
        
        // On axes - consider as hit if within bounds
        return true;
    }
}

package org.example.services;

import org.example.domain.Point;

/**
 * Interface for calculating if a point hits the target area
 * Follows Single Responsibility Principle (SRP)
 */
public interface HitCalculator {
    /**
     * Calculates if the given point hits the target area
     * @param point the point to check
     * @return true if the point hits the area, false otherwise
     */
    boolean calculateHit(Point point);
}

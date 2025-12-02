package org.example.services;

import org.example.domain.Point;

/**
 * Interface for validating points according to business rules
 * Follows Single Responsibility Principle (SRP)
 */
public interface PointValidator {
    /**
     * Validates if the point coordinates are within allowed ranges
     * @param point the point to validate
     * @throws ValidationException if validation fails
     */
    void validate(Point point) throws ValidationException;
}

package org.example.services;

/**
 * Exception thrown when validation fails
 * Follows Single Responsibility Principle (SRP)
 */
public class ValidationException extends Exception {
    public ValidationException(String message) {
        super(message);
    }
}


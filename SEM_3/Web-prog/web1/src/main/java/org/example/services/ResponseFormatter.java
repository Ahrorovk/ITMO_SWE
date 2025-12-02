package org.example.services;

import org.example.domain.CalculationResult;
import org.example.domain.ErrorResult;

/**
 * Interface for formatting responses
 * Follows Single Responsibility Principle (SRP)
 */
public interface ResponseFormatter {
    /**
     * Formats a successful calculation result into HTTP response
     * @param result the calculation result
     * @return formatted HTTP response string
     */
    String formatSuccess(CalculationResult result);
    
    /**
     * Formats an error result into HTTP response
     * @param error the error result
     * @return formatted HTTP response string
     */
    String formatError(ErrorResult error);
}

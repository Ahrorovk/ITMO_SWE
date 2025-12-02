package org.example.services;

import org.example.domain.CalculationResult;
import org.example.domain.ErrorResult;
import org.example.domain.Point;
import org.example.mvi.model.ApplicationState;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

/**
 * Main service coordinating the calculation process
 * Follows Single Responsibility Principle (SRP) - coordinates the calculation flow
 * Follows Dependency Inversion Principle (DIP) - depends on abstractions
 */
public class CalculationService {
    private final QueryParser queryParser;
    private final PointValidator pointValidator;
    private final HitCalculator hitCalculator;

    public CalculationService(QueryParser queryParser, 
                            PointValidator pointValidator, 
                            HitCalculator hitCalculator) {
        this.queryParser = queryParser;
        this.pointValidator = pointValidator;
        this.hitCalculator = hitCalculator;
    }

    /**
     * Processes a calculation request and returns the appropriate state
     * @param queryString the query string to process
     * @return the resulting application state
     */
    public ApplicationState processCalculation(String queryString) {
        try {
            // Parse the query string into a Point
            Point point = queryParser.parse(queryString);
            
            // Validate the point
            pointValidator.validate(point);
            
            // Calculate the result
            Instant startTime = Instant.now();
            boolean isHit = hitCalculator.calculateHit(point);
            Instant endTime = Instant.now();
            
            // Create the result
            long executionTime = ChronoUnit.NANOS.between(startTime, endTime);
            CalculationResult result = new CalculationResult(executionTime, LocalDateTime.now(), isHit);
            
            return ApplicationState.success(result);
            
        } catch (ValidationException e) {
            ErrorResult error = new ErrorResult(LocalDateTime.now(), e.getMessage());
            return ApplicationState.error(error);
        }
    }
}

package org.example.services;

import org.example.mvi.view.HttpResponseView;
import org.example.services.impl.DefaultHitCalculator;
import org.example.services.impl.DefaultPointValidator;
import org.example.services.impl.DefaultQueryParser;
import org.example.services.impl.JsonResponseFormatter;

/**
 * Factory for creating service instances
 * Follows DRY principle - centralizes object creation
 * Follows Dependency Inversion Principle (DIP) - provides concrete implementations
 */
public class ServiceFactory {
    
    /**
     * Creates a new CalculationService with default implementations
     * @return configured CalculationService
     */
    public static CalculationService createCalculationService() {
        QueryParser queryParser = new DefaultQueryParser();
        PointValidator pointValidator = new DefaultPointValidator();
        HitCalculator hitCalculator = new DefaultHitCalculator();
        
        return new CalculationService(queryParser, pointValidator, hitCalculator);
    }
    
    /**
     * Creates a new ResponseFormatter with JSON implementation
     * @return configured ResponseFormatter
     */
    public static ResponseFormatter createResponseFormatter() {
        return new JsonResponseFormatter();
    }
    
    /**
     * Creates a new HttpResponseView with JSON formatter
     * @return configured HttpResponseView
     */
    public static HttpResponseView createHttpResponseView() {
        ResponseFormatter formatter = createResponseFormatter();
        return new HttpResponseView(formatter);
    }
}

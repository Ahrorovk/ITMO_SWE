package org.example.services.impl;

import org.example.domain.CalculationResult;
import org.example.domain.ErrorResult;
import org.example.services.ResponseFormatter;

import java.nio.charset.StandardCharsets;

/**
 * JSON implementation of ResponseFormatter
 * Follows Single Responsibility Principle (SRP)
 */
public class JsonResponseFormatter implements ResponseFormatter {
    
    private static final String SUCCESS_TEMPLATE = """
            Content-Type: application/json
            Content-Length: %d
            
            %s
            """;
    
    private static final String ERROR_TEMPLATE = """
            Content-Type: application/json
            Content-Length: %d
            
            %s
            """;
    
    private static final String SUCCESS_JSON = """
            {
                "time": "%d",
                "now": "%s",
                "result": %s
            }
            """;
    
    private static final String ERROR_JSON = """
            {
                "now": "%s",
                "reason": "%s"
            }
            """;

    @Override
    public String formatSuccess(CalculationResult result) {
        String json = String.format(SUCCESS_JSON, 
                result.getExecutionTimeNanos(), 
                result.getTimestamp(), 
                result.isHit());
        
        return String.format(SUCCESS_TEMPLATE, 
                json.getBytes(StandardCharsets.UTF_8).length + 2, 
                json);
    }

    @Override
    public String formatError(ErrorResult error) {
        String json = String.format(ERROR_JSON, 
                error.getTimestamp(), 
                error.getReason());
        
        return String.format(ERROR_TEMPLATE, 
                json.getBytes(StandardCharsets.UTF_8).length + 2, 
                json);
    }
}

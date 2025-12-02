package org.example.services.impl;

import org.example.domain.Point;
import org.example.services.QueryParser;
import org.example.services.ValidationException;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Default implementation of QueryParser
 * Follows Single Responsibility Principle (SRP)
 */
public class DefaultQueryParser implements QueryParser {

    @Override
    public Point parse(String queryString) throws ValidationException {
        if (queryString == null || queryString.isEmpty()) {
            throw new ValidationException("Missing query string");
        }
        
        Map<String, String> params = parseQueryString(queryString);
        validateRequiredParams(params);
        
        int x = parseInteger(params.get("x"), "x");
        double y = parseDouble(params.get("y"), "y");
        double r = parseDouble(params.get("r"), "r");
        
        return new Point(x, y, r);
    }

    private Map<String, String> parseQueryString(String query) {
        return Arrays.stream(query.split("&"))
                .map(pair -> pair.split("="))
                .collect(Collectors.toMap(
                        pairParts -> URLDecoder.decode(pairParts[0], StandardCharsets.UTF_8),
                        pairParts -> URLDecoder.decode(pairParts[1], StandardCharsets.UTF_8),
                        (a, b) -> b,
                        HashMap::new
                ));
    }

    private void validateRequiredParams(Map<String, String> params) throws ValidationException {
        if (!params.containsKey("x")) {
            throw new ValidationException("x is invalid");
        }
        if (!params.containsKey("y")) {
            throw new ValidationException("y is invalid");
        }
        if (!params.containsKey("r")) {
            throw new ValidationException("r is invalid");
        }
    }

    private int parseInteger(String value, String paramName) throws ValidationException {
        if (value == null || value.isEmpty()) {
            throw new ValidationException(paramName + " is invalid");
        }
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            throw new ValidationException(paramName + " is not a number");
        }
    }

    private float parseFloat(String value, String paramName) throws ValidationException {
        if (value == null || value.isEmpty()) {
            throw new ValidationException(paramName + " is invalid");
        }
        try {
            return Float.parseFloat(value);
        } catch (NumberFormatException e) {
            throw new ValidationException(paramName + " is not a number");
        }
    }
    private double parseDouble(String value, String paramName) throws ValidationException {
        if (value == null || value.isEmpty()) {
            throw new ValidationException(paramName + " is invalid");
        }
        try {
            return Double.parseDouble(value);
        } catch (NumberFormatException e) {
            throw new ValidationException(paramName + " is not a number");
        }
    }
}

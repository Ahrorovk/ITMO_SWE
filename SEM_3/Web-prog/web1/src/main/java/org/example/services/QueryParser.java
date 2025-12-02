package org.example.services;

import org.example.domain.Point;

/**
 * Interface for parsing query strings into Point objects
 * Follows Single Responsibility Principle (SRP)
 */
public interface QueryParser {
    /**
     * Parses a query string into a Point object
     * @param queryString the query string to parse
     * @return a Point object with parsed coordinates
     * @throws ValidationException if parsing fails
     */
    Point parse(String queryString) throws ValidationException;
}

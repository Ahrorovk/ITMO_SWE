package org.example.mvi.intent;

/**
 * Intent representing a request to calculate if a point hits the target area
 * Follows MVI pattern - Intent represents user actions
 */
public final class CalculateHitIntent implements Intent {
    private final String queryString;

    public CalculateHitIntent(String queryString) {
        this.queryString = queryString;
    }

    public String getQueryString() {
        return queryString;
    }

    @Override
    public String toString() {
        return String.format("CalculateHitIntent{queryString='%s'}", queryString);
    }
}

package org.example.mvi.model;

import org.example.domain.CalculationResult;
import org.example.domain.ErrorResult;

/**
 * Immutable state representing the current application state
 * Follows MVI pattern - Model represents the state
 */
public final class ApplicationState {
    private final boolean isLoading;
    private final CalculationResult result;
    private final ErrorResult error;
    private final boolean hasError;

    private ApplicationState(boolean isLoading, CalculationResult result, ErrorResult error, boolean hasError) {
        this.isLoading = isLoading;
        this.result = result;
        this.error = error;
        this.hasError = hasError;
    }

    public static ApplicationState initial() {
        return new ApplicationState(false, null, null, false);
    }

    public static ApplicationState loading() {
        return new ApplicationState(true, null, null, false);
    }

    public static ApplicationState success(CalculationResult result) {
        return new ApplicationState(false, result, null, false);
    }

    public static ApplicationState error(ErrorResult error) {
        return new ApplicationState(false, null, error, true);
    }

    public boolean isLoading() {
        return isLoading;
    }

    public CalculationResult getResult() {
        return result;
    }

    public ErrorResult getError() {
        return error;
    }

    public boolean hasError() {
        return hasError;
    }

    public boolean hasResult() {
        return result != null;
    }

    @Override
    public String toString() {
        return String.format("ApplicationState{loading=%s, hasResult=%s, hasError=%s}", 
                           isLoading, hasResult(), hasError);
    }
}

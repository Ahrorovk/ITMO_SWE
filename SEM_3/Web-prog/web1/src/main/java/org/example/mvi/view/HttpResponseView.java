package org.example.mvi.view;

import org.example.mvi.model.ApplicationState;
import org.example.services.ResponseFormatter;

/**
 * HTTP response implementation of View
 * Follows Single Responsibility Principle (SRP)
 */
public class HttpResponseView implements View {
    private final ResponseFormatter formatter;

    public HttpResponseView(ResponseFormatter formatter) {
        this.formatter = formatter;
    }

    @Override
    public void render(ApplicationState state) {
        if (state.hasError()) {
            System.out.println(formatter.formatError(state.getError()));
        } else if (state.hasResult()) {
            System.out.println(formatter.formatSuccess(state.getResult()));
        }
        // Loading state doesn't need to render anything for HTTP responses
    }
}

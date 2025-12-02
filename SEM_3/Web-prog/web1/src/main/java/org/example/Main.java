package org.example;

import com.fastcgi.FCGIInterface;
import org.example.mvi.intent.CalculateHitIntent;
import org.example.mvi.model.ApplicationState;
import org.example.mvi.view.HttpResponseView;
import org.example.services.CalculationService;
import org.example.services.ServiceFactory;

/**
 * Main application class using MVI architecture
 * Follows SOLID principles and DRY/KISS principles
 * 
 * Architecture:
 * - Model: ApplicationState (immutable state)
 * - View: HttpResponseView (renders state to HTTP response)
 * - Intent: CalculateHitIntent (represents user actions)
 */
public class Main {
    
    private final CalculationService calculationService;
    private final HttpResponseView view;

    public Main() {
        // Dependency injection through factory (DIP principle)
        this.calculationService = ServiceFactory.createCalculationService();
        this.view = ServiceFactory.createHttpResponseView();
    }

    public static void main(String[] args) {
        Main app = new Main();
        app.run();
    }

    /**
     * Main application loop
     * Follows KISS principle - simple and straightforward
     */
    private void run() {
        var fcgi = new FCGIInterface();
        while (fcgi.FCGIaccept() >= 0) {
            processRequest();
        }
    }

    /**
     * Processes a single request
     * Follows Single Responsibility Principle (SRP)
     */
    private void processRequest() {
        try {
            String queryString = System.getProperties().getProperty("QUERY_STRING");
            CalculateHitIntent intent = new CalculateHitIntent(queryString);
            
            // Process the intent and get the state
            ApplicationState state = calculationService.processCalculation(intent.getQueryString());
            
            // Render the state
            view.render(state);
            
        } catch (Exception e) {
            // Handle unexpected errors gracefully
            System.err.println("Unexpected error: " + e.getMessage());
            // TODO: Return error response to user
        }
    }
}
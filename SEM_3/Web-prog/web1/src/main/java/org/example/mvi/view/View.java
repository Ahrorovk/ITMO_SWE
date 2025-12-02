package org.example.mvi.view;

import org.example.mvi.model.ApplicationState;

/**
 * Interface for views in MVI pattern
 */
public interface View {
    void render(ApplicationState state);
}

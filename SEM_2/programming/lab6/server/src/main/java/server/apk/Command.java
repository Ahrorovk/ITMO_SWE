package server.apk;

import java.io.Serializable;

public abstract class Command implements Serializable {
    private final String name;
    private final String description;

    protected Command(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public abstract Object execute();
} 
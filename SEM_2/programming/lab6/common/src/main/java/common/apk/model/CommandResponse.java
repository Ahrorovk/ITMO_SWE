package common.apk.model;

import java.io.Serializable;

public class CommandResponse implements Serializable {
    private final boolean success;
    private final String message;
    private final Object data;

    public CommandResponse(boolean success, String message, Object data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public Object getData() {
        return data;
    }
} 
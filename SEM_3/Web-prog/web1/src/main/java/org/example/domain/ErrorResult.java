package org.example.domain;

import java.time.LocalDateTime;
import java.util.Objects;

public final class ErrorResult {
    private final LocalDateTime timestamp;
    private final String reason;

    public ErrorResult(LocalDateTime timestamp, String reason) {
        this.timestamp = timestamp;
        this.reason = reason;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public String getReason() {
        return reason;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ErrorResult that = (ErrorResult) o;
        return Objects.equals(timestamp, that.timestamp) && 
               Objects.equals(reason, that.reason);
    }

    @Override
    public int hashCode() {
        return Objects.hash(timestamp, reason);
    }

    @Override
    public String toString() {
        return String.format("ErrorResult{timestamp=%s, reason='%s'}", timestamp, reason);
    }
}

package org.example.domain;

import java.time.LocalDateTime;
import java.util.Objects;

public final class CalculationResult {
    private final long executionTimeNanos;
    private final LocalDateTime timestamp;
    private final boolean isHit;

    public CalculationResult(long executionTimeNanos, LocalDateTime timestamp, boolean isHit) {
        this.executionTimeNanos = executionTimeNanos;
        this.timestamp = timestamp;
        this.isHit = isHit;
    }

    public long getExecutionTimeNanos() {
        return executionTimeNanos;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public boolean isHit() {
        return isHit;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CalculationResult that = (CalculationResult) o;
        return executionTimeNanos == that.executionTimeNanos && 
               isHit == that.isHit && 
               Objects.equals(timestamp, that.timestamp);
    }

    @Override
    public int hashCode() {
        return Objects.hash(executionTimeNanos, timestamp, isHit);
    }

    @Override
    public String toString() {
        return String.format("CalculationResult{executionTime=%dns, timestamp=%s, isHit=%s}", 
                           executionTimeNanos, timestamp, isHit);
    }
}

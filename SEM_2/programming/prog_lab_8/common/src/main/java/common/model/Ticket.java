package common.model;

import java.io.Serializable;
import java.util.Objects;

/**
 * Represents a ticket bundle for an event.
 */
public class Ticket implements Serializable {
    private long id;
    private long eventId;
    private int totalCount;
    private int soldCount;

    public Ticket() { }

    public Ticket(long id, long eventId, int totalCount, int soldCount) {
        this.id         = id;
        this.eventId    = eventId;
        this.totalCount = totalCount;
        this.soldCount  = soldCount;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        if (id <= 0) throw new IllegalArgumentException("Ticket ID must be positive");
        this.id = id;
    }

    public long getEventId() {
        return eventId;
    }

    public void setEventId(long eventId) {
        this.eventId = eventId;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        if (totalCount < 0) throw new IllegalArgumentException("Total count cannot be negative");
        this.totalCount = totalCount;
    }

    public int getSoldCount() {
        return soldCount;
    }

    public void setSoldCount(int soldCount) {
        if (soldCount < 0 || soldCount > totalCount)
            throw new IllegalArgumentException("Sold count must be between 0 and totalCount");
        this.soldCount = soldCount;
    }

    /** Returns how many tickets remain available. */
    public int getAvailableCount() {
        return totalCount - soldCount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Ticket)) return false;
        Ticket ticket = (Ticket) o;
        return id == ticket.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Ticket{" +
               "id=" + id +
               ", eventId=" + eventId +
               ", totalCount=" + totalCount +
               ", soldCount=" + soldCount +
               ", available=" + getAvailableCount() +
               '}';
    }
}

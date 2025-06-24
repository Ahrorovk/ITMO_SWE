package common.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

public class Booking implements Serializable {
    private long id;
    private long userId;
    private long ticketId;
    private int quantity;
    private LocalDateTime bookedAt;
    private Ticket ticket;  // Optional nested object with ticket details

    public Booking() { }

    public Booking(long id, long userId, long ticketId, int quantity, LocalDateTime bookedAt) {
        this.id        = id;
        this.userId    = userId;
        this.ticketId  = ticketId;
        this.quantity  = quantity;
        this.bookedAt  = bookedAt;
    }

    // Full constructor
    public Booking(long id, long userId, long ticketId, int quantity, LocalDateTime bookedAt, Ticket ticket) {
        this(id, userId, ticketId, quantity, bookedAt);
        this.ticket = ticket;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getTicketId() {
        return ticketId;
    }

    public void setTicketId(long ticketId) {
        this.ticketId = ticketId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be > 0");
        }
        this.quantity = quantity;
    }

    public LocalDateTime getBookedAt() {
        return bookedAt;
    }

    public void setBookedAt(LocalDateTime bookedAt) {
        this.bookedAt = bookedAt;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Booking)) return false;
        Booking booking = (Booking) o;
        return id == booking.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Booking{" +
               "id=" + id +
               ", userId=" + userId +
               ", ticketId=" + ticketId +
               ", quantity=" + quantity +
               ", bookedAt=" + bookedAt +
               (ticket != null ? ", ticket=" + ticket : "") +
               '}';
    }
}

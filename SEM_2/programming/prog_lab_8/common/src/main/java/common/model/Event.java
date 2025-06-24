package common.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * Represents a historical event with location, ticket availability, and an optional image.
 */
public class Event implements Serializable {
    private long id;
    private String title;
    private String description;
    private Coordinates location;
    private LocalDate createdAt;
    private LocalDate eventDate;
    private int availableTickets;
    private Image image;
    private long createdBy;  // user id who created the event

    public Event() { }

    public Event(long id,
                 String title,
                 String description,
                 Coordinates location,
                 LocalDate createdAt,
                 LocalDate eventDate,
                 int availableTickets,
                 Image image,
                 long createdBy) {
        this.id               = id;
        this.title            = title;
        this.description      = description;
        this.location         = location;
        this.createdAt        = createdAt;
        this.eventDate        = eventDate;
        this.availableTickets = availableTickets;
        this.image            = image;
        this.createdBy        = createdBy;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        if (id <= 0) throw new IllegalArgumentException("Event ID must be positive");
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        if (title == null || title.isBlank()) throw new IllegalArgumentException("Title cannot be empty");
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        if (description == null) throw new IllegalArgumentException("Description cannot be null");
        this.description = description;
    }

    public Coordinates getLocation() {
        return location;
    }

    public void setLocation(Coordinates location) {
        this.location = location;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }

    public int getAvailableTickets() {
        return availableTickets;
    }

    public void setAvailableTickets(int availableTickets) {
        if (availableTickets < 0) throw new IllegalArgumentException("Available tickets cannot be negative");
        this.availableTickets = availableTickets;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(long createdBy) {
        this.createdBy = createdBy;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Event event = (Event) o;
        return id == event.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Event{" +
               "id=" + id +
               ", title='" + title + '\'' +
               ", description='" + description + '\'' +
               ", location=" + location +
               ", createdAt=" + createdAt +
               ", eventDate=" + eventDate +
               ", availableTickets=" + availableTickets +
               ", image=" + image +
               ", createdBy=" + createdBy +
               '}';
    }
}

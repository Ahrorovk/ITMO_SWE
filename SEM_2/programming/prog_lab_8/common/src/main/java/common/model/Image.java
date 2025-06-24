package common.model;

import java.io.Serializable;
import java.util.Objects;

/**
 * Represents an image associated with an event.
 */
public class Image implements Serializable {
    private long id;
    private String name;
    private long eventId;

    public Image() { }

    public Image(long id, String name, long eventId) {
        this.id      = id;
        this.name    = name;
        this.eventId = eventId;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        if (id <= 0) throw new IllegalArgumentException("Image ID must be positive");
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        if (name == null || name.isBlank()) throw new IllegalArgumentException("Image name cannot be empty");
        this.name = name;
    }

    public long getEventId() {
        return eventId;
    }

    public void setEventId(long eventId) {
        this.eventId = eventId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Image)) return false;
        Image image = (Image) o;
        return id == image.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Image{" +
               "id=" + id +
               ", name='" + name + '\'' +
               ", eventId=" + eventId +
               '}';
    }
}

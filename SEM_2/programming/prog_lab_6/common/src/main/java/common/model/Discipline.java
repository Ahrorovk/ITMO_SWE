package common.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Objects;

public class Discipline implements Serializable {
  private String name; // Поле не может быть null, строка не может быть пустой
  private int practiceHours; // Часы практики (может быть любое значение)

  public Discipline(String name, int practiceHours) {
    this.name = name;
    this.practiceHours = practiceHours;
  }

  public Discipline(String serialized) {
    // expect exactly two parts: "name;practiceHours"
    String[] parts = serialized.split(";", 2);
    this.name = parts[0];
    if (parts.length > 1 && !parts[1].isBlank()) {
      try {
        this.practiceHours = Integer.parseInt(parts[1]);
      } catch (NumberFormatException e) {
        throw new IllegalArgumentException(
          "Invalid practiceHours: " + parts[1], e);
      }
    } else {
      this.practiceHours = 0; // or whatever default you prefer
    }
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getPracticeHours() {
    return practiceHours;
  }

  public void setPracticeHours(int practiceHours) {
    this.practiceHours = practiceHours;
  }

  @Override
  public String toString() {
    return "\nDiscipline{" +
      "name='" + name + '\'' +
      ", practiceHours=" + practiceHours +
      '}';
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Discipline that = (Discipline) o;
    return Objects.equals(name, that.name); // Only comparing names for uniqueness
  }

  @Override
  public int hashCode() {
    return Objects.hash(name); // Hashcode based only on name
  }
}

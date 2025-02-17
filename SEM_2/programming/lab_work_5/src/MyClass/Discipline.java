package MyClass;

import java.io.Serializable;
import java.util.Objects;

public class Discipline implements Serializable {
    private String name; // Поле не может быть null, строка не может быть пустой
    private int practiceHours; // Часы практики (может быть любое значение)

    public Discipline(String name, int practiceHours) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Название дисциплины не может быть null или пустым");
        }
        this.name = name;
        this.practiceHours = practiceHours;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Название дисциплины не может быть null или пустым");
        }
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
        return "Discipline{" +
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

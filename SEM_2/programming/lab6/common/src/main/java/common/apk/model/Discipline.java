package common.apk.model;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import common.apk.utility.Element;

public class Discipline extends Element {
    private Integer id;
    private String name;
    private int practiceHours;
    private static final Map<Integer, Discipline> disciplines = new HashMap<>();

    public Discipline() {
    }

    public Discipline(String name, int practiceHours) {
        this.name = name;
        this.practiceHours = practiceHours;
    }

    public String getName() {
        return name;
    }
    public static void put(Integer id, Discipline organization) {
        disciplines.put(id, organization);
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
        return  "Name of the Discipline: '" + name + '\n' +
                "Hours of practice: " + practiceHours +"h";
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Discipline that = (Discipline) o;
        return Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name); // Hashcode based only on name
    }


    public int getId() {
        return id;
    }

    @Override
    public boolean validate() {
        if(id==null){
            return false;
        }
        if(practiceHours < 0) {
            return false;
        }
        if(name == null || name.trim().isEmpty()) {
            return false;
        }
        return true;
    }

    @Override
    public void validation() {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Название дисциплины не может быть null или пустым");
        }
        if (practiceHours < 0) {
            throw new IllegalArgumentException("Часы практики не могут быть нулевыми");}
    }

    @Override
    public int compareTo(Element o) {
        return (int) (this.getId() - o.getId());
    }

    public void setId(int id) {
        this.id = id;
    }
}

package model;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class LabWork implements Serializable {

    private Long id; //Поле не может быть null, Значение поля должно быть больше 0, Значение этого поля должно быть уникальным, Значение этого поля должно генерироваться автоматически
    private String name; //Поле не может быть null, Строка не может быть пустой
    private Coordinates coordinates; //Поле не может быть null
    private LocalDate creationDate; //Поле не может быть null, Значение этого поля должно генерироваться автоматически
    private double minimalPoint; //Значение поля должно быть больше 0
    private Integer maximumPoint; //Поле не может быть null, Значение поля должно быть больше 0
    private int personalQualitiesMaximum; //Значение поля должно быть больше 0
    private Difficulty difficulty; //Поле может быть null
    private Discipline discipline; //Поле может быть null

    public LabWork(String name, Coordinates coordinates, double minimalPoint, Integer maximumPoint, int personalQualitiesMaximum, Difficulty difficulty, Discipline discipline) {
        if (name == null || name.isEmpty()) throw new IllegalArgumentException("Name cannot be null or empty");
        if (coordinates == null) throw new IllegalArgumentException("Coordinates cannot be null");
        if (minimalPoint <= 0) throw new IllegalArgumentException("Minimal point must be greater than 0");
        if (maximumPoint == null || maximumPoint <= 0) throw new IllegalArgumentException("Maximum point must be greater than 0 and not null");
        if (personalQualitiesMaximum <= 0) throw new IllegalArgumentException("Personal qualities maximum must be greater than 0");

        this.name = name;
        this.coordinates = coordinates;
        this.creationDate = LocalDate.now();
        this.minimalPoint = minimalPoint;
        this.maximumPoint = maximumPoint;
        this.personalQualitiesMaximum = personalQualitiesMaximum;
        this.difficulty = difficulty;
        this.discipline = discipline;
    }
    public LabWork(long id,String name, Coordinates coordinates, double minimalPoint, Integer maximumPoint, int personalQualitiesMaximum, Difficulty difficulty, Discipline discipline) {
        if (name == null || name.isEmpty()) throw new IllegalArgumentException("Name cannot be null or empty");
        if (coordinates == null) throw new IllegalArgumentException("Coordinates cannot be null");
        if (minimalPoint <= 0) throw new IllegalArgumentException("Minimal point must be greater than 0");
        if (maximumPoint == null || maximumPoint <= 0) throw new IllegalArgumentException("Maximum point must be greater than 0 and not null");
        if (personalQualitiesMaximum <= 0) throw new IllegalArgumentException("Personal qualities maximum must be greater than 0");

        this.id = id;
        this.name = name;
        this.coordinates = coordinates;
        this.creationDate = LocalDate.now();
        this.minimalPoint = minimalPoint;
        this.maximumPoint = maximumPoint;
        this.personalQualitiesMaximum = personalQualitiesMaximum;
        this.difficulty = difficulty;
        this.discipline = discipline;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Coordinates getCoordinates() {
        return coordinates;
    }

    public String getCreationDate() {
        return creationDate.format(DateTimeFormatter.ISO_LOCAL_DATE);
    }

    public double getMinimalPoint() {
        return minimalPoint;
    }

    public Integer getMaximumPoint() {
        return maximumPoint;
    }

    public int getPersonalQualitiesMaximum() {
        return personalQualitiesMaximum;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public Discipline getDiscipline() {
        return discipline;
    }

    public void setId(Long id) {
        if (id == null || id <= 0) throw new IllegalArgumentException("ID must be greater than 0 and not null");
        this.id = id;
    }

    public void setName(String name) {
        if (name == null || name.isEmpty()) throw new IllegalArgumentException("Name cannot be null or empty");
        this.name = name;
    }

    public void setCoordinates(Coordinates coordinates) {
        if (coordinates == null) throw new IllegalArgumentException("Coordinates cannot be null");
        this.coordinates = coordinates;
    }

    public void setMinimalPoint(double minimalPoint) {
        if (minimalPoint <= 0) throw new IllegalArgumentException("Minimal point must be greater than 0");
        this.minimalPoint = minimalPoint;
    }

    public void setMaximumPoint(Integer maximumPoint) {
        if (maximumPoint == null || maximumPoint <= 0) throw new IllegalArgumentException("Maximum point must be greater than 0 and not null");
        this.maximumPoint = maximumPoint;
    }

    public void setPersonalQualitiesMaximum(int personalQualitiesMaximum) {
        if (personalQualitiesMaximum <= 0) throw new IllegalArgumentException("Personal qualities maximum must be greater than 0");
        this.personalQualitiesMaximum = personalQualitiesMaximum;
    }

    public void setDifficulty(Difficulty difficulty) {
        this.difficulty = difficulty;
    }

    public void setDiscipline(Discipline discipline) {
        this.discipline = discipline;
    }

    @Override
    public String toString() {
        return "LabWork{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", coordinates=" + coordinates +
                ", creationDate=" + creationDate +
                ", minimalPoint=" + minimalPoint +
                ", maximumPoint=" + maximumPoint +
                ", personalQualitiesMaximum=" + personalQualitiesMaximum +
                ", difficulty=" + difficulty +
                ", discipline=" + discipline +
                '}';
    }
}


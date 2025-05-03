package common.model;

import common.util.IdGenerator;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;

public class LabWork extends Element implements Serializable, Validatable {

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
    this.id = IdGenerator.next();
    this.name = name;
    this.coordinates = coordinates;
    this.creationDate = LocalDate.now();
    this.minimalPoint = minimalPoint;
    this.maximumPoint = maximumPoint;
    this.personalQualitiesMaximum = personalQualitiesMaximum;
    this.difficulty = difficulty;
    this.discipline = discipline;
  }


  public LabWork(Long id, String name, Coordinates coordinates, double minimalPoint, Integer maximumPoint, int personalQualitiesMaximum, Difficulty difficulty, Discipline discipline, LocalDate creationDate) {
    this.id = id;
    this.name = name;
    this.coordinates = coordinates;
    this.creationDate = creationDate;
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
    if (coordinates == null)
      return new Coordinates(0l, 0l);
    return coordinates;
  }

  public LocalDate getCreationDate() {
    return creationDate;
  }

  public Double getMinimalPoint() {
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
    this.id = id;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setCoordinates(Coordinates coordinates) {
    this.coordinates = coordinates;
  }

  public void setMinimalPoint(double minimalPoint) {
    this.minimalPoint = minimalPoint;
  }

  public void setMaximumPoint(Integer maximumPoint) {
    this.maximumPoint = maximumPoint;
  }

  public void setPersonalQualitiesMaximum(int personalQualitiesMaximum) {
    this.personalQualitiesMaximum = personalQualitiesMaximum;
  }

  public void setDifficulty(Difficulty difficulty) {
    this.difficulty = difficulty;
  }

  public void setDiscipline(Discipline discipline) {
    this.discipline = discipline;
  }

  public static String[] toArray(LabWork e) {
    var list = new ArrayList<String>();
    list.add(e.getId() == null ? "null" : e.getId().toString());
    list.add(e.getName());
    list.add(e.getCoordinates() == null ? "null" : e.getCoordinates().toString());
    list.add(e.getCreationDate().format(DateTimeFormatter.ISO_DATE));
    list.add(e.getMaximumPoint() == null ? "null" : e.getMaximumPoint().toString());
    list.add(e.getMinimalPoint() == null ? "null" : e.getMinimalPoint().toString());
    list.add(e.getDifficulty().toString());
    list.add(String.valueOf(e.getPersonalQualitiesMaximum()));
    list.add(e.getDiscipline() == null ? "null" : e.getDiscipline().toString());
    return list.toArray(new String[0]);
  }


  public static LabWork fromArray(String[] a) {
    Long id;
    String name;
    Coordinates coordinates;
    LocalDate creationDate;
    Integer maximumPoint;
    Double minimalPoint;
    Integer personalQualitiesMaximum;
    Difficulty difficulty;
    Discipline discipline;
    try {
      try {
        id = Long.parseLong(a[0]);
      } catch (NumberFormatException e) {
        id = null;
      }
      name = a[1];
      coordinates = new Coordinates(a[2]);
      try {
        creationDate = LocalDate.parse(a[3], DateTimeFormatter.ISO_DATE);
      } catch (DateTimeParseException e) {
        creationDate = null;
      }
      try {
        maximumPoint = (a[4].equals("null") ? null : Integer.parseInt(a[4]));
      } catch (NumberFormatException e) {
        maximumPoint = null;
      }
      try {
        minimalPoint = (a[5].equals("null") ? null : Double.parseDouble(a[5]));
      } catch (NullPointerException | IllegalArgumentException e) {
        minimalPoint = null;
      }
      try {
        difficulty = (a[6].equals("null") ? null : Difficulty.valueOf(a[6]));
        ;
      } catch (NullPointerException | IllegalArgumentException e) {
        difficulty = null;
      }
      try {
        personalQualitiesMaximum = (a[7].equals("null") ? null : Integer.parseInt(a[7]));
      } catch (NullPointerException | IllegalArgumentException e) {
        personalQualitiesMaximum = null;
      }
      discipline = (a[8].equals("null") ? null : new Discipline(a[8]));
      return new LabWork(id, name, coordinates, minimalPoint, maximumPoint, personalQualitiesMaximum, difficulty, discipline, creationDate);
    } catch (ArrayIndexOutOfBoundsException e) {
    }
    return null;
  }

  @Override
  public boolean validate() {
    if (id == null || id <= 0) return false;
    if (name == null || name.isEmpty()) return false;
    if (coordinates == null) return false;
    if (creationDate == null) return false;
    if (maximumPoint == null || maximumPoint <= 0) return false;
    if (minimalPoint <= 0) return false;
    if (personalQualitiesMaximum <= 0) return false;
    return true;
  }

  @Override
  public void validation() {

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

  @Override
  public int compareTo(Element element) {
    return (int) (this.id - element.getId());
  }
}


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
  public LabWork(Long id, String name, Coordinates coordinates, double minimalPoint, Integer maximumPoint, int personalQualitiesMaximum, Difficulty difficulty, Discipline discipline) {
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
    list.add(e.getId() == null          ? "null" : e.getId().toString());
    list.add(e.getName());
    list.add(e.getCoordinates() == null ? "null" : e.getCoordinates().toString());
    list.add(e.getCreationDate().format(DateTimeFormatter.ISO_DATE));
    list.add(e.getMaximumPoint() == null ? "null" : e.getMaximumPoint().toString());
    list.add(e.getMinimalPoint() == null ? "null" : e.getMinimalPoint().toString());
    list.add(e.getDifficulty() == null   ? "null" : e.getDifficulty().name());
    list.add(String.valueOf(e.getPersonalQualitiesMaximum()));
    // Now output Discipline as two flat columns:
    if (e.getDiscipline() != null) {
      list.add(e.getDiscipline().getName());
      list.add(String.valueOf(e.getDiscipline().getPracticeHours()));
    } else {
      list.add("null");
      list.add("null");
    }
    return list.toArray(new String[0]);
  }

  public static LabWork fromArray(String[] a) {
    try {
      Long   id   = parseLongOrNull(a[0]);
      String name = a[1];
      Coordinates coords = new Coordinates(a[2]);
      LocalDate creationDate = parseDateOrNull(a[3]);
      Integer maxP = parseIntOrNull(a[4]);
      Double  minP = parseDoubleOrNull(a[5]);
      Difficulty difficulty = parseEnumOrNull(Difficulty.class, a[6]);
      Integer pqm = parseIntOrNull(a[7]);

      // Now read two more fields for Discipline:
      String  discName = (a.length > 8) ? a[8] : null;
      Integer discHours= (a.length > 9) ? parseIntOrNull(a[9]) : null;

      Discipline discipline = null;
      if (discName != null && !discName.equals("null")) {
        discipline = new Discipline(discName,
          (discHours != null) ? discHours : 0);
      }

      return new LabWork(
        id, name, coords,
        minP, maxP, pqm,
        difficulty, discipline,
        creationDate
      );
    } catch (Exception e) {
      // malformed row
      return null;
    }
  }

  // helpers:
  private static Long parseLongOrNull(String s) {
    try { return Long.parseLong(s); } catch (Exception e) { return null; }
  }
  private static Integer parseIntOrNull(String s) {
    try { return Integer.parseInt(s); } catch (Exception e) { return null; }
  }
  private static Double parseDoubleOrNull(String s) {
    try { return Double.parseDouble(s); } catch (Exception e) { return null; }
  }
  private static LocalDate parseDateOrNull(String s) {
    try { return LocalDate.parse(s, DateTimeFormatter.ISO_DATE); }
    catch (Exception e) { return null; }
  }
  private static <E extends Enum<E>> E parseEnumOrNull(Class<E> clazz, String s) {
    try { return Enum.valueOf(clazz, s); } catch (Exception e) { return null; }
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


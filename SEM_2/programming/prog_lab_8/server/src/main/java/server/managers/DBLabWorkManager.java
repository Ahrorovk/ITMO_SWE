package server.managers;

import common.model.Coordinates;
import common.model.Difficulty;
import common.model.Discipline;
import common.model.LabWork;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.LinkedList;

public class DBLabWorkManager {

  private final BDManager manager;

  /* ===== внутренняя обёртка LabWork + владелец ======================== */
  public final class LabWorkAndUserID {
    public final LabWork labWork;
    public final long userID;

    public LabWorkAndUserID(LabWork labWork, long userID) {
      this.labWork = labWork;
      this.userID = userID;
    }
  }

  public DBLabWorkManager(BDManager manager) {
    this.manager = manager;
  }

  /* =================================================================== */
  /*                              SELECT                                 */
  /* =================================================================== */
  public LinkedList<LabWorkAndUserID> select() {
    LinkedList<LabWorkAndUserID> result = new LinkedList<>();
    String sql =
      "SELECT "
        + " TL.id                         AS id, "
        + " TL.name                       AS name, "
        + " C.x                           AS coordinatesx, "
        + " C.y                           AS coordinatesy, "
        + " TL.creation_date              AS creation_date, "
        + " TL.minimal_point              AS minimal_point, "
        + " TL.maximum_point              AS maximum_point, "
        + " TL.personal_qualities_maximum AS personal_qualities_maximum, "
        + " D.name                        AS difficulty, "
        + " DS.name                       AS discipline_name, "
        + " DS.practice_hours             AS discipline_practice_hours, "
        + " TL.id_user                    AS id_user "
        + "FROM tlabwork TL "
        + "JOIN tcoordinates  C  ON C.id  = TL.id_coordinates "
        + "JOIN tdifficulty    D  ON D.id  = TL.id_difficulty "
        + "LEFT JOIN tdiscipline DS ON DS.id = TL.id_discipline";

    try (ResultSet rs = manager.getStatement().executeQuery(sql)) {

      while (rs.next()) {

        /* Difficulty enum может быть null -------------------------------- */
        Difficulty diff = null;
        try {
          diff = Difficulty.valueOf(rs.getString("difficulty"));
        } catch (Exception ignored) {
        }

        Coordinates coord = new Coordinates(
          rs.getLong("coordinatesx"),
          rs.getLong("coordinatesy")
        );

        Discipline discipline = null;
        if (rs.getString("discipline_name") != null) {
          discipline = new Discipline(
            rs.getString("discipline_name"),
            rs.getInt("discipline_practice_hours")
          );
        }

        LabWork lw = new LabWork(
          rs.getLong("id"),
          rs.getString("name"),
          coord,
          rs.getDouble("minimal_point"),
          rs.getInt("maximum_point"),
          rs.getInt("personal_qualities_maximum"),
          diff,
          discipline,
          rs.getObject("creation_date", LocalDate.class)
        );

        if (lw.validate())
          result.add(new LabWorkAndUserID(lw, rs.getLong("id_user")));
      }
    } catch (SQLException e) {
      System.out.println(e);
    }
    return result;
  }

  public LinkedList<LabWorkAndUserID> selectByUserId(Integer userID) {
    LinkedList<LabWorkAndUserID> result = new LinkedList<>();
    String sql =
      "SELECT "
        + " TL.id                         AS id, "
        + " TL.name                       AS name, "
        + " C.x                           AS coordinatesx, "
        + " C.y                           AS coordinatesy, "
        + " TL.creation_date              AS creation_date, "
        + " TL.minimal_point              AS minimal_point, "
        + " TL.maximum_point              AS maximum_point, "
        + " TL.personal_qualities_maximum AS personal_qualities_maximum, "
        + " D.name                        AS difficulty, "
        + " DS.name                       AS discipline_name, "
        + " DS.practice_hours             AS discipline_practice_hours, "
        + " TL.id_user                    AS id_user "
        + "FROM tlabwork TL "
        + "JOIN tcoordinates  C  ON C.id  = TL.id_coordinates "
        + "JOIN tdifficulty    D  ON D.id  = TL.id_difficulty "
        + "LEFT JOIN tdiscipline DS ON DS.id = TL.id_discipline "
        + "WHERE TL.id_user = ?";

    try (PreparedStatement ps = manager.getPreparedStatementRGK(sql)) {
      ps.setInt(1, userID);
      try (ResultSet rs = ps.executeQuery()) {
        while (rs.next()) {
          Difficulty diff = null;
          try {
            diff = Difficulty.valueOf(rs.getString("difficulty"));
          } catch (Exception ignored) {
          }

          Coordinates coord = new Coordinates(
            rs.getLong("coordinatesx"),
            rs.getLong("coordinatesy")
          );

          Discipline discipline = null;
          if (rs.getString("discipline_name") != null) {
            discipline = new Discipline(
              rs.getString("discipline_name"),
              rs.getInt("discipline_practice_hours")
            );
          }

          LabWork lw = new LabWork(
            rs.getLong("id"),
            rs.getString("name"),
            coord,
            rs.getDouble("minimal_point"),
            rs.getInt("maximum_point"),
            rs.getInt("personal_qualities_maximum"),
            diff,
            discipline,
            rs.getObject("creation_date", LocalDate.class)
          );

          if (lw.validate())
            result.add(new LabWorkAndUserID(lw, rs.getLong("id_user")));
        }
      }
    } catch (SQLException e) {
      System.out.println(e);
    }
    return result;
  }


  private long insert(Coordinates coord) throws SQLException {
    String sql = "INSERT INTO tcoordinates(x, y) VALUES (?, ?)";
    try (PreparedStatement ps = manager.getPreparedStatementRGK(sql)) {
      ps.setLong(1, coord.getX());
      ps.setLong(2, coord.getY());
      if (ps.executeUpdate() == 0)
        throw new SQLException("Creating coordinates failed.");
      try (ResultSet gk = ps.getGeneratedKeys()) {
        if (gk.next()) return gk.getLong(1);
        throw new SQLException("No ID obtained for coordinates.");
      }
    }
  }

  private long insert(Discipline disc) throws SQLException {
    String sql = "INSERT INTO tdiscipline(name, practice_hours) VALUES (?, ?)";
    try (PreparedStatement ps = manager.getPreparedStatementRGK(sql)) {
      ps.setString(1, disc.getName());
      ps.setInt(2, disc.getPracticeHours());
      if (ps.executeUpdate() == 0)
        throw new SQLException("Creating discipline failed.");
      try (ResultSet gk = ps.getGeneratedKeys()) {
        if (gk.next()) return gk.getLong(1);
        throw new SQLException("No ID obtained for discipline.");
      }
    }
  }


  public boolean insert(LabWork lw, long userID) {
    String sql = "INSERT INTO tlabwork("
      + " name, id_coordinates, minimal_point, maximum_point, "
      + " personal_qualities_maximum, id_difficulty, id_discipline, "
      + " creation_date, id_user"
      + ") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    try (PreparedStatement ps = manager.getPreparedStatementRGK(sql)) {

      ps.setString(1, lw.getName());
      ps.setLong(2, insert(lw.getCoordinates()));
      ps.setDouble(3, lw.getMinimalPoint());
      ps.setInt(4, lw.getMaximumPoint());
      ps.setInt(5, lw.getPersonalQualitiesMaximum());
      ps.setInt(6, lw.getDifficulty().ordinal() + 1);

      if (lw.getDiscipline() == null)
        ps.setNull(7, java.sql.Types.INTEGER);
      else
        ps.setLong(7, insert(lw.getDiscipline()));

      ps.setObject(8, lw.getCreationDate());
      ps.setLong(9, userID);

      if (ps.executeUpdate() == 0)
        throw new SQLException("Insert LabWork failed.");

      try (ResultSet gk = ps.getGeneratedKeys()) {
        if (gk.next()) {
          lw.setId(gk.getLong(1));
          return true;
        }
      }
      throw new SQLException("No ID obtained for LabWork.");
    } catch (SQLException e) {
      System.out.println(e);
      return false;
    }
  }

  /* =================================================================== */
  /*                               UPDATE                                */
  /* =================================================================== */
  public boolean update(LabWork lw) {
    String sql = "UPDATE tlabwork SET "
      + " name = ?, "
      + " id_coordinates = ?, "
      + " minimal_point = ?, "
      + " maximum_point = ?, "
      + " personal_qualities_maximum = ?, "
      + " id_difficulty = ?, "
      + " id_discipline = ?, "
      + " creation_date = ? "
      + " WHERE id = ?";

    try (PreparedStatement ps = manager.getPreparedStatement(sql)) {

      ps.setString(1, lw.getName());
      ps.setLong(2, insert(lw.getCoordinates()));
      ps.setDouble(3, lw.getMinimalPoint());
      ps.setInt(4, lw.getMaximumPoint());
      ps.setInt(5, lw.getPersonalQualitiesMaximum());
      ps.setInt(6, lw.getDifficulty().ordinal() + 1);

      if (lw.getDiscipline() == null)
        ps.setNull(7, java.sql.Types.INTEGER);
      else
        ps.setLong(7, insert(lw.getDiscipline()));

      ps.setObject(8, lw.getCreationDate());
      ps.setLong(9, lw.getId());

      if (ps.executeUpdate() == 0)
        throw new SQLException("Update LabWork failed.");

      return true;
    } catch (SQLException e) {
      System.out.println(e);
      return false;
    }
  }

  public boolean remove(long id) {
    try (PreparedStatement ps =
           manager.getPreparedStatement("DELETE FROM tlabwork WHERE id = ?")) {
      ps.setLong(1, id);
      return ps.executeUpdate() > 0;
    } catch (SQLException e) {
      System.out.println(e);
      return false;
    }
  }
}

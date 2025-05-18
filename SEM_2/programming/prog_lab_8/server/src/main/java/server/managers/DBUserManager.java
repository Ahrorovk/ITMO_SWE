package server.managers;


import server.utility.User;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;

public class DBUserManager {

  private final BDManager bdManager;

  public DBUserManager(BDManager bdManager) {
    this.bdManager = bdManager;
  }


  public LinkedList<User> select() {
    LinkedList<User> llu = new LinkedList<>();
    try (ResultSet rs = bdManager.getStatement()
      .executeQuery("SELECT * FROM tuser;")) {

      while (rs.next()) {
        llu.add(new User(
          rs.getLong("id"),
          rs.getString("login"),
          rs.getString("password"),
          rs.getString("role")
        ));
      }
    } catch (SQLException e) {
      System.out.println(e);
    }
    return llu;
  }
  public LinkedList<String> selectFunctionality(String role) {
    LinkedList<String> llf = new LinkedList<String>();
    try {
      var stmt = bdManager.getPreparedStatement("SELECT functionality AS func FROM tuserfunc WHERE role = ?;");
      stmt.setString(1, role);
      ResultSet rs = stmt.executeQuery();
      while (rs.next()) {
        llf.add(rs.getString("func"));
      }
      rs.close();
      return llf;
    } catch (SQLException e) { System.out.println(e.toString()); return llf; }
  }
  public User getUserByToken(String token) {
    String sql = "SELECT u.id, u.login, u.password, u.role FROM ttoken t JOIN tuser u ON t.id_user = u.id WHERE t.token = ?";
    try (PreparedStatement stmt = bdManager.getPreparedStatement(sql)) {
      stmt.setString(1, token);
      ResultSet rs = stmt.executeQuery();
      if (rs.next()) {
        return new User(
          rs.getInt("id"),
          rs.getString("login"),
          rs.getString("password"),
          rs.getString("role")
        );
      }
    } catch (SQLException e) {
      System.out.println("Get user by token error: " + e);
    }
    return null;
  }

  public String insert(User user) {
    String sql = "INSERT INTO tuser(login, password, role) VALUES (?, ?, ?)";
    try (PreparedStatement stmt = bdManager.getPreparedStatementRGK(sql)) {

      stmt.setString(1, user.getLogin());
      stmt.setString(2, user.getPassword());
      stmt.setString(3, user.getRole());

      if (stmt.executeUpdate() == 0)
        throw new SQLException("Creating user failed, no rows affected.");

      try (ResultSet gk = stmt.getGeneratedKeys()) {
        if (gk.next()) {
          user.setID(gk.getLong(1));
          return "";
        }
        throw new SQLException("Creating user failed, no ID obtained.");
      }
    } catch (SQLException e) {
      System.out.println(e);
      if(e.getMessage().contains("already exists"))
      return "User " + '`'+ user.getLogin()+'`' + " is already exists.";
      else
        return e.getMessage();
    }
  }

  public boolean update(User user) {
    String sql = "UPDATE Tuser SET login = ?, password = ?, role = ? WHERE id = ?";
    try (PreparedStatement stmt = bdManager.getPreparedStatement(sql)) {

      stmt.setString(1, user.getLogin());
      stmt.setString(2, user.getPassword());
      stmt.setString(3, user.getRole());
      stmt.setLong  (4, user.getID());

      if (stmt.executeUpdate() == 0)
        throw new SQLException("Update user failed, no rows affected.");
      return true;
    } catch (SQLException e) {
      System.out.println(e);
      return false;
    }
  }
  public boolean deleteToken(String token) {
    String sql = "DELETE FROM ttoken WHERE token = ?";
    try (PreparedStatement stmt = bdManager.getPreparedStatement(sql)) {
      stmt.setString(1, token);
      return stmt.executeUpdate() > 0;
    } catch (SQLException e) {
      System.out.println("Delete token error: " + e);
      return false;
    }
  }

  public boolean insertFunctionality(String role, String[] functionality) {
    try {
      var pstmt = bdManager.getPreparedStatement("INSERT INTO tuserfunc VALUES (?, ?) ON CONFLICT DO NOTHING"); var i = 0;
      for(String func: functionality) { pstmt.setString(1, role); pstmt.setString(2, func); pstmt.executeUpdate(); }
      return true;
    } catch (SQLException e) { System.out.println(e.toString()); return false; }
  }

  public boolean insertToken(User user, String token) {
    String sql = "INSERT INTO ttoken(token, id_user) VALUES (?, ?) ON CONFLICT DO NOTHING";
    try (PreparedStatement stmt = bdManager.getPreparedStatement(sql)) {
      stmt.setString(1, token);
      stmt.setLong(2, user.getID());
      return stmt.executeUpdate() > 0;
    } catch (SQLException e) {
      System.out.println("Insert token error: " + e);
      return false;
    }
  }

  public boolean removeFunctionality(String role, String[] functionality) {
    try {
      var pstmt = bdManager.getPreparedStatement("DELETE FROM tuserfunc WHERE role = ? AND functionality = ?"); var i = 0;
      for(String func: functionality) { pstmt.setString(1, role); pstmt.setString(2, func); pstmt.executeUpdate(); }
      return true;
    } catch (SQLException e) { System.out.println(e.toString()); return false; }
  }
}

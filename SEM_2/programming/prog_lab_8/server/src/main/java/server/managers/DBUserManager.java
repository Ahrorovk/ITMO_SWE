package server.managers;


import server.utility.User;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class DBUserManager {
  private final BDManager manager;

  public DBUserManager(BDManager manager) {
    this.manager = manager;
  }

  /**
   * 1. Создать нового пользователя, возвращает сгенерированный id
   */
  public long createUser(String login, String passwordHash, String role) throws SQLException {
    String sql = "INSERT INTO users(login, password, role) VALUES (?, ?, ?)";
    try (PreparedStatement ps = manager.getPreparedStatementRGK(sql)) {
      ps.setString(1, login);
      ps.setString(2, passwordHash);
      ps.setString(3, role);
      ps.executeUpdate();
      try (ResultSet rs = ps.getGeneratedKeys()) {
        if (rs.next()) return rs.getLong(1);
        else throw new SQLException("Creating user failed, no ID obtained.");
      }
    }
  }

  /**
   * 2. Найти пользователя по id
   */
  public Optional<User> findById(long id) throws SQLException {
    String sql = "SELECT id, login, password, role FROM users WHERE id = ?";
    try (PreparedStatement ps = manager.getPreparedStatementRGK(sql)) {
      ps.setLong(1, id);
      try (ResultSet rs = ps.executeQuery()) {
        if (rs.next()) {
          return Optional.of(mapRow(rs));
        }
        return Optional.empty();
      }
    }
  }

  /**
   * 3. Найти пользователя по логину (для аутентификации)
   */
  public Optional<User> findByLogin(String login) throws SQLException {
    String sql = "SELECT id, login, password, role FROM users WHERE login = ?";
    try (PreparedStatement ps = manager.getPreparedStatementRGK(sql)) {
      ps.setString(1, login);
      try (ResultSet rs = ps.executeQuery()) {
        if (rs.next()) {
          return Optional.of(mapRow(rs));
        }
        return Optional.empty();
      }
    }
  }

  /**
   * 4. Перечислить всех пользователей
   */
  public List<User> listAll() throws SQLException {
    String sql = "SELECT id, login, password, role FROM users";
    List<User> list = new ArrayList<>();
    try (ResultSet rs = manager.getStatement().executeQuery(sql)) {
      while (rs.next()) list.add(mapRow(rs));
    }
    return list;
  }

  /**
   * 5. Обновить данные пользователя
   */
  public boolean updateUser(User user) throws SQLException {
    String sql = "UPDATE users SET login = ?, password = ?, role = ? WHERE id = ?";
    try (PreparedStatement ps = manager.getPreparedStatement(sql)) {
      ps.setString(1, user.getLogin());
      ps.setString(2, user.getPassword());
      ps.setString(3, user.getRole());
      ps.setLong(4, user.getId());
      return ps.executeUpdate() > 0;
    }
  }

  /**
   * 6. Удалить пользователя по id
   */
  public boolean deleteUser(long id) throws SQLException {
    String sql = "DELETE FROM users WHERE id = ?";
    try (PreparedStatement ps = manager.getPreparedStatement(sql)) {
      ps.setLong(1, id);
      return ps.executeUpdate() > 0;
    }
  }

  /**
   * Вспомогалка для маппинга ResultSet → User
   */
  private User mapRow(ResultSet rs) throws SQLException {
    User u = new User(rs.getLong("id"), rs.getString("login"), rs.getString("password"), rs.getString("role"));
    return u;
  }
}

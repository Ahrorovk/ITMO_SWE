package server.managers;


import server.utility.Console;

import java.sql.*;

public class BDManager {
  private final Console console;
  private final String DB_URL;
  private final String USER;
  private final String PASS;
  private Connection connection = null;

  public BDManager(String DB_URL, String USER, String PASS, Console console) {
    this.console = console;
    this.DB_URL  = DB_URL;
    this.USER    = USER;
    this.PASS    = PASS;
  }

  /** Подключаем драйвер и устанавливаем соединение (с 2-кратным ретраем) */
  public boolean init() throws InterruptedException {
    try {
      Class.forName("org.postgresql.Driver");
    } catch (ClassNotFoundException e) {
      console.printError("PostgreSQL JDBC Driver is not found. Include it in your library path");
      return false;
    }

    int retries = 2;
    while (retries-- > 0) {
      try {
        connection = DriverManager.getConnection(DB_URL, USER, PASS);
        connection.setAutoCommit(true);    // по умолчанию — автокоммит
        return true;
      } catch (SQLException e) {
        console.printError("Connection failed: " + e.getMessage());
        if (retries <= 0) break;
        Thread.sleep(500);
      }
    }

    console.printError("Failed to connect to database");
    return false;
  }

  /** Возвращает «сырое» соединение для ручных транзакций */
  public Connection getConnection() {
    return connection;
  }

  /** Удобные обёртки для commit / rollback */
  public void commit() {
    try {
      if (connection != null && !connection.getAutoCommit()) {
        connection.commit();
      }
    } catch (SQLException e) {
      console.printError("Commit failed: " + e.getMessage());
    }
  }

  public void rollback() {
    try {
      if (connection != null && !connection.getAutoCommit()) {
        connection.rollback();
      }
    } catch (SQLException e) {
      console.printError("Rollback failed: " + e.getMessage());
    }
  }

  /** Создаёт обычный Statement */
  public Statement getStatement() throws SQLException {
    return connection.createStatement();
  }

  /** PreparedStatement без возврата генерируемых ключей */
  public PreparedStatement getPreparedStatement(String sql) throws SQLException {
    return connection.prepareStatement(sql);
  }

  /** PreparedStatement с возвратом сгенерированных ключей */
  public PreparedStatement getPreparedStatementRGK(String sql) throws SQLException {
    return connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
  }

  /** Закрываем соединение */
  public void close() {
    if (connection != null) {
      try {
        connection.close();
      } catch (SQLException e) {
        console.printError("Error closing connection: " + e.getMessage());
      }
    }
  }
}

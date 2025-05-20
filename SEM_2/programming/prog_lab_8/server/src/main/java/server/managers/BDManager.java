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
    this.DB_URL = DB_URL;
    this.USER = USER;
    this.PASS = PASS;
  }

  public boolean init() throws InterruptedException {
    try {
      Class.forName("org.postgresql.Driver");
    } catch (ClassNotFoundException e) {
      console.printError("PostgreSQL JDBC Driver is not found. Include it in your library path ");
      return false;
    }

    int reconnectCounter = 2;
    while (reconnectCounter > 0) {
      try {
        connection = DriverManager.getConnection(DB_URL, USER, PASS);
        return true;
      } catch (SQLException e) {
        console.printError("Connection Failed: " + e.getMessage());
        reconnectCounter--;
        if (reconnectCounter <= 0) break;
        Thread.sleep(500);
      }
    }

    console.printError("Failed to make connection to database");
    return false;
  }

  public Statement getStatement() throws SQLException {
    return connection.createStatement();
  }

  public PreparedStatement getPreparedStatement(String s) throws SQLException {
    return connection.prepareStatement(s);
  }

  public PreparedStatement getPreparedStatementRGK(String s) throws SQLException {
    return connection.prepareStatement(s, Statement.RETURN_GENERATED_KEYS);
  }

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

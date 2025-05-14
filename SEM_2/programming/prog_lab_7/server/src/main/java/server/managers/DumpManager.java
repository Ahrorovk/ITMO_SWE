package server.managers;


import common.model.LabWork;
import server.utility.Console;
import server.utility.User;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.LinkedList;

public class DumpManager {
  private final BDManager bdManager;
  private final Console console;
  private final PropertyManager propertyManager;
  private final DBUserManager dbUserManager;
  private final DBLabWorkManager dbLabWorkManager;

  public DumpManager(BDManager bdManager, PropertyManager propertyManager, Console console) {
    this.console = console;
    //bdManager.setURL(propertyManager.getProperty("DB_URL", "jdbc:postgresql://127.0.0.1:5432/studs"));
    //bdManager.setUser(propertyManager.getProperty("DB_USER", "postgres"));
    //bdManager.setPassword(propertyManager.getProperty("DB_PASSWORD", "pass"));
    this.bdManager = bdManager;
    this.propertyManager = propertyManager;
    this.dbLabWorkManager = new DBLabWorkManager(bdManager);
    this.dbUserManager = new DBUserManager(bdManager);
  }

  public boolean initTables() {
    try {
      if (!bdManager.init()) { System.exit(1); }

      var stmt = bdManager.getStatement(); var i = 0;
      for(String script: propertyManager.getProperty("DB_CREATE_TABLE_SQL", "").split(";")) { stmt.executeUpdate(script+";"); }
      stmt.close();

      return true;
    } catch (SQLException e) {
      console.printError(e.toString());
      return false;
    }
  }

  /* ---------- LAB WORK (коллекция) ---------- */

  public LinkedList<DBLabWorkManager.LabWorkAndUserID> selectLabWorks() {
    return dbLabWorkManager.select();
  }

  public boolean insertLabWork(LabWork lw, long userID) {
    return dbLabWorkManager.insert(lw, userID);
  }

  public boolean updateLabWork(LabWork lw) {
    return dbLabWorkManager.update(lw);
  }

  public boolean removeLabWork(long id) {
    return dbLabWorkManager.remove(id);
  }

  /* ---------- USERS ---------- */

  public LinkedList<User> selectUsers() {
    return dbUserManager.select();
  }

  public boolean insertUser(User u) {
    return dbUserManager.insert(u);
  }

  public boolean updateUser(User u) {
    return dbUserManager.update(u);
  }

  public LinkedList<String> selectF(String r) { return dbUserManager.selectFunctionality(r); }
  public boolean insertF(String r, String[] fs) { return dbUserManager.insertFunctionality(r, fs); }
  public boolean removeF(String r, String[] fs) { return dbUserManager.removeFunctionality(r, fs); }
}


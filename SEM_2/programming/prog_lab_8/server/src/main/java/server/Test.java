package server;

import server.managers.BDManager;
import server.managers.DumpManager;
import server.managers.PropertyManager;
import server.utility.StandardConsole;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Test {
  public static void main(String[] args) {
    String url = "jdbc:postgresql://aws-0-us-east-2.pooler.supabase.com:5432/postgres";
    String user = "postgres.pdbpoiwzsksavoqbrowk";
    String password = "8YT-fZq-Z8N-Th8"; // убедись, что пароль правильный

    try {

//      System.out.println("Connection ->>> " + connection.getMetaData().getDatabaseProductName());
      StandardConsole console = new StandardConsole();
      PropertyManager props = new PropertyManager("prop.ini", console);
      if (!props.readConf()) System.exit(1);

      BDManager db = new BDManager(
        url,
        user, password,
        console
      );
      DumpManager dump = new DumpManager(db, props, console);
      if (!dump.initTables()) System.exit(1);
    } catch (Exception e) {
      System.out.println("Error -> " + e.getMessage());
    }
  }
}

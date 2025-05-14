package server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import server.commands.*;
import server.managers.*;
import server.utility.Runner;
import server.utility.StandardConsole;

public class Main {
  private static final Logger LOGGER = LoggerFactory.getLogger("Main");

  public static void main(String[] args) {
    var console = new StandardConsole();
    var propertyManager = new PropertyManager("prop.ini", console); if (!propertyManager.readConf()) { System.exit(1); }
    var bdManager = new BDManager(propertyManager.getProperty("DB_URL", "jdbc:postgresql://127.0.0.1:5432/studs"), propertyManager.getProperty("DB_USER", "postgres"), propertyManager.getProperty("DB_PASSWORD", "pass"), console);
    var dumpManager = new DumpManager(bdManager, propertyManager, console); if (!dumpManager.initTables()) { System.exit(1); }
    var userManager = new UserManager(dumpManager); if (!userManager.init()) { System.exit(1); }
    var collectionManager = new CollectionManager(dumpManager, userManager); collectionManager.init();
    var PORT = propertyManager.getProperty("PORT", -1);
    if (PORT<0) { System.out.println("Property PORT undefined"); System.exit(1); }
    var commandManager = new CommandManager() {{
      register("get_commands", new GetCommands(this, userManager));

      register("create_user", new NUserCreate(userManager));
      register("user_add_functionality", new NUserAddFunctionality(userManager, this));
      register("user_remove_functionality", new NUserRemoveFunctionality(userManager, this));
      register("user_set_role", new NUserSetRole(userManager));
      register("info", new Info(collectionManager));
      register("show", new Show(collectionManager));
      register("add", new Add(collectionManager));
      register("clear", new Clear(collectionManager));
      register("min_by_maximum_point", new MinByMaximumPointCommand(collectionManager));
      register("print_unique_discipline", new PrintUniqueDiscipline(collectionManager));
      register("remove_greater", new RemoveGreater(collectionManager));
      register("filter_greater_difficulty", new FilterGreaterThanDifficulty(collectionManager));
      register("remove_lower", new RemoveLower(collectionManager));
      register("remove_by_id", new RemoveById(collectionManager));
      register("add_if_max", new AddIfMax(collectionManager));
      register("update", new Update(collectionManager));
      register("reorder", new Reorder(collectionManager));
      register("is_id_exist", new IsIdExist(collectionManager));
    }};
    var runner = new Runner(console, commandManager, userManager);

    var tcpserver = new TCPServer(PORT, runner::executeCommand);
    tcpserver.start();
  }
}




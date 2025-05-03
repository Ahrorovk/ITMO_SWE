package server;

import common.model.LabWork;
import server.commands.*;
import server.managers.CollectionManager;
import server.managers.CommandManager;
import server.managers.DumpManager;
import server.managers.TCPServer;
import server.utility.Runner;
import server.utility.StandardConsole;

import java.util.ArrayDeque;
import java.util.LinkedList;

public class Main {
  private static int PORT;

  public static void main(String[] args) {
    var console = new StandardConsole();
    var dumpManager = new DumpManager("test.csv", console);
    dumpManager.writeCollection(
      new LinkedList<LabWork>(),          // пустая «живая» коллекция
      new LinkedList<>(),          // пустая «мёртвая»
      new ArrayDeque<>());         // пустой лог

    var collectionManager = new CollectionManager(dumpManager);
    if (!collectionManager.loadCollection()) {
      System.out.println("Collection doest not exist!");
    }
    PORT = dumpManager.getProperty("PORT", -1);
    if (PORT < 0) {
      System.out.println("Property PORT undefined");
      System.exit(1);
    }

    var commandManager = new CommandManager() {{
      register("get_commands", new GetCommands(this));
      register("load", new Load(collectionManager));
      register("info", new Info(collectionManager));
      register("show", new Show(collectionManager));
      register("add", new Add(collectionManager));
      register("clear", new Clear(collectionManager));
      register("save", new Save(collectionManager));
      register("min_by_maximum_point", new MinByMaximumPointCommand(collectionManager));
      register("print_unique_discipline", new PrintUniqueDiscipline(collectionManager));
      register("remove_greater", new RemoveGreater(collectionManager));
      register("filter_greater_difficulty", new FilterGreaterThanDifficulty(collectionManager));
      register("remove_lower", new RemoveLower(collectionManager));
      register("remove_by_id", new RemoveById(collectionManager));
      register("add_if_max", new AddIfMax(collectionManager));
      register("update", new Update(collectionManager));
    }};

    var runner = new Runner(console, commandManager);

    var tcpserver = new TCPServer(PORT, runner::executeCommand);
    tcpserver.start();
  }
}


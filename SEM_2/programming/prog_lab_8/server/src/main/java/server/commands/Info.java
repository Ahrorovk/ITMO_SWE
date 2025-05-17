package server.commands;


import common.model.Response;
import server.managers.CollectionManager;
import server.utility.User;

import java.time.LocalDateTime;

public class Info extends Command {
  private final CollectionManager collectionManager;

  public Info(CollectionManager collectionManager) {
    super("info", "output information about the collection", "INFO");
    this.collectionManager = collectionManager;
  }

  @Override
  public Response apply(String[] arguments, Object obj, User user) {
    if (!arguments[1].isEmpty())
      return new Response(400, "Incorrect number of arguments!\nUsing: '" + getName() + "'");

    var s = "Info about collection:\n";
    s += " Type: " + collectionManager.getCollection().getClass() + "\n";
    s += " Number of elements: " + collectionManager.getCollection().size();
    return new Response(s);
  }
}


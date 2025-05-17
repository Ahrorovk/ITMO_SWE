package server.commands;


import common.model.LabWork;
import common.model.Response;
import server.managers.CollectionManager;
import server.utility.User;

public class Clear extends Command {
  private final CollectionManager collectionManager;

  public Clear(CollectionManager collectionManager) {
  super("clear", "clear collection","REMOVE");
    this.collectionManager = collectionManager;
  }

  @Override
  public Response apply(String[] arguments, Object obj, User user) {
    if (!arguments[1].isEmpty()) return new Response(400, "Incorrect number of arguments!\nUsing: '" + getName() + "'");
    for (var e: collectionManager.getCollection().toArray()) { collectionManager.remove(((LabWork)e).getId(), user); }
    collectionManager.update();
    return new Response("Collection cleared!");
  }
}

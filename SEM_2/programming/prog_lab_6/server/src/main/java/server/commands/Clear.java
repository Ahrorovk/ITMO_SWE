package server.commands;


import common.model.Response;
import server.managers.CollectionManager;

public class Clear extends Command {
  private final CollectionManager collectionManager;

  public Clear(CollectionManager collectionManager) {
    super("clear", "clear collection");
    this.collectionManager = collectionManager;
  }

  @Override
  public Response apply(String[] arguments, Object obj) {
    if (!arguments[1].isEmpty()) return new Response(400, "Incorrect number of arguments!\nUsing: '" + getName() + "'");
    try {
      var isFirst = true;
      while (!collectionManager.getCollection().isEmpty()) {
        var labWork = collectionManager.getCollection().getLast();
        collectionManager.remove(labWork.getId());
        collectionManager.addLog("remove " + labWork.getId(), isFirst);
        isFirst = false;
      }
      collectionManager.update();
      return new Response("Collection has been cleared!");
    } catch (Exception e) {
      return new Response(400, "Error: " + e.getMessage());
    }
  }
}

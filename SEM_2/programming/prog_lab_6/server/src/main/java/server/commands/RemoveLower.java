package server.commands;

import common.model.LabWork;
import common.model.Response;
import server.managers.CollectionManager;

public class RemoveLower extends Command {

  private final CollectionManager collectionManager;

  public RemoveLower(CollectionManager collectionManager) {
    super("remove_lower {element}", "remove lower item from collection");

    this.collectionManager = collectionManager;
  }
  @Override
  public Response apply(String[] arguments, Object obj) {
    try{
      LabWork element = (LabWork) obj;
      collectionManager.getCollection().removeIf(labWork -> labWork.getMaximumPoint() < element.getMaximumPoint());
      collectionManager.addLog("remove " + element.getId(), true);
      collectionManager.update();
      return new Response("Lower LabWork removed!");
    } catch (Exception e) {
      return new Response(400, "Error: " + e.getMessage());
    }
  }
}

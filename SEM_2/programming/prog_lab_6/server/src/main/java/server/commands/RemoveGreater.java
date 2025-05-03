package server.commands;

import common.model.LabWork;
import common.model.Response;
import server.managers.CollectionManager;

public class RemoveGreater extends Command {

  private final CollectionManager collectionManager;

  public RemoveGreater(CollectionManager collectionManager) {
    super("remove_greater {element}", "remove greater item from collection");

    this.collectionManager = collectionManager;
  }

  @Override
  public Response apply(String[] arguments, Object obj) {
    try {
      LabWork element = (LabWork) obj;
      collectionManager.getCollection().removeIf(labWork -> labWork.getMaximumPoint() > element.getMaximumPoint());
      collectionManager.addLog("remove " + element.getId(), true);
      collectionManager.update();
      return new Response("Greater LabWork removed!");
    } catch (Exception e) {
      return new Response(400, "Error: " + e.getMessage());
    }
  }
}

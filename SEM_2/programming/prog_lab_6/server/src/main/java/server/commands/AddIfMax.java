package server.commands;

import common.model.LabWork;
import common.model.Response;
import server.managers.CollectionManager;

public class AddIfMax extends Command {
  private final CollectionManager collectionManager;


  public AddIfMax(CollectionManager collectionManager) {
    super("add_if_max {element}",  "add a new item to a collection if its rating exceeds the maximum rating of this collection");
    this.collectionManager = collectionManager;
  }

  @Override
  public Response apply(String[] args, Object obj) {
    try {
      if (!args[1].isEmpty()) return new Response(400, "Incorrect number of arguments!\nUsing: '" + getName() + "'");
      LabWork labWork = (LabWork)obj;
      if (collectionManager.getCollection().stream()
        .mapToInt(LabWork::getMaximumPoint)
        .max()
        .orElse(Integer.MIN_VALUE) < labWork.getMaximumPoint()) {
        collectionManager.add(labWork);
      }
      return new Response("LabWork successfully added");
    } catch (Exception e) {
      return new Response(e.toString());
    }
  }
}

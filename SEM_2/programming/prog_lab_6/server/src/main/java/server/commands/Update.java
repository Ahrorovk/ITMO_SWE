package server.commands;

import common.model.LabWork;
import common.model.Response;
import server.managers.CollectionManager;

public class Update extends Command {
  private final CollectionManager collectionManager;

  public Update(CollectionManager collectionManager) {
    super("update ID {element}", "update collection element value by ID");
    this.collectionManager = collectionManager;
  }

  @Override
  public Response apply(String[] arguments, Object obj) {
    if (arguments[1].isEmpty())
      return new Response(400, "Incorrect number of arguments!\nUsing: '" + getName() + "'");
    try {
      long id = -1;
      try {
        id = Long.parseLong(arguments[1].trim());
      } catch (NumberFormatException e) {
        return new Response(400, "ID wasn`t recognised");
      }

      if (collectionManager.byId(id) == null || !collectionManager.getCollection().contains(collectionManager.byId(id))) {
        return new Response(400, "ID wasn`t found");
      }

      var d = (LabWork) obj;
      if (d != null && d.validate()) {
        d.setId(collectionManager.getFreeId());
        collectionManager.add(d);
        collectionManager.addLog("add " + d.getId(), true);
        collectionManager.update();

        var old = collectionManager.byId(id);
        collectionManager.swap(d.getId(), id);
        collectionManager.addLog("swap " + old.getId() + " " + id, false);
        collectionManager.update();

        collectionManager.remove(old.getId());
        collectionManager.addLog("remove " + old.getId(), false);
        collectionManager.update();
        return new Response("Updated successful!");
      } else {
        return new Response(400, "Fields not valid");
      }
    } catch (Exception e) {
      return new Response(400, e.getMessage());
    }
  }
}

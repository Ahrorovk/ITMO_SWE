package server.commands;

import common.model.LabWork;
import common.model.Response;
import server.managers.CollectionManager;
import server.utility.User;

public class Update extends Command {

  private final CollectionManager collectionManager;

  public Update(CollectionManager collectionManager) {
    super("update ID {element}", "update the value of a collection item by ID", "ADD");

    this.collectionManager = collectionManager;
  }
  @Override
  public Response apply(String[] arguments, Object obj, User u) {
    if (arguments[1].isEmpty()) return new Response(400, "Incorrect number of arguments!\n" +
      "Using: '" + getName() + "'");
    long id = -1;
    try { id = Long.parseLong(arguments[1].trim()); } catch (NumberFormatException e) { return new Response(400, "The ID was not recognized"); }

    if (collectionManager.byId(id) == null || !collectionManager.getCollection().contains(collectionManager.byId(id))) {
      return new Response(400, "A non-existing ID");
    }

    var d = (LabWork) obj;
    if (d != null && d.validate()) {
      d.setId(id);
      if (collectionManager.update(d, u)) return new Response("Updated!");
      return new Response(500, "Access error");
    } else {
      return new Response(400, "LabWork fields are not valid! The labWork is not created!");
    }
  }
}


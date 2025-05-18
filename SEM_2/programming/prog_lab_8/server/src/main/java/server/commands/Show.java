package server.commands;

import common.model.LabWork;
import common.model.Response;
import server.managers.CollectionManager;
import server.utility.User;

import java.util.Arrays;
import java.util.LinkedList;

public class Show extends Command {
  private final CollectionManager collectionManager;

  public Show(CollectionManager collectionManager) {
    super("show", "output all the elements of the collection in a string representation to the standard output stream", "SHOW");
    this.collectionManager = collectionManager;
  }
  @Override
  public Response apply(String[] arguments, Object obj, User u) {
    if (!arguments[1].isEmpty()) return new Response(400, "Incorrect number of arguments!\n" +
      "Using: '" + getName() + "'");
    return new Response("OK", new LinkedList<>(Arrays.asList(collectionManager.getCollection().toArray(new LabWork[]{}))));
    //return new Response("OK");
  }
}

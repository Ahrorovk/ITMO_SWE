package server.commands;

import common.model.Response;
import server.managers.CollectionManager;

public class Show extends Command {
  private final CollectionManager collectionManager;

  public Show(CollectionManager collectionManager) {
    super("show", "output all the elements of the collection in a string representation to the standard output stream");
    this.collectionManager = collectionManager;
  }

  @Override
  public Response apply(String[] arguments, Object obj) {
    System.out.println("Show -> " + collectionManager.getCollection().toString());
    return new Response("OK", collectionManager.getCollection());
    //return new Response("OK");
  }
}

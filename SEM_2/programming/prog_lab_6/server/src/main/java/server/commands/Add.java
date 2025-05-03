package server.commands;


import common.model.LabWork;
import common.model.Response;
import server.managers.CollectionManager;

public class Add extends Command {
  private final CollectionManager collectionManager;

  public Add(CollectionManager collectionManager) {
    super("add {element}", "add new element to collection");
    this.collectionManager = collectionManager;
  }

  @Override
  public Response apply(String[] arguments, Object obj) {
    if (!arguments[1].isEmpty()) return new Response(400, "Incorrect number of arguments!\nUsing: '" + getName() + "'");


    try {
      LabWork d = (LabWork) obj;
      System.out.println(d.toString());

        d.setId(collectionManager.getFreeId());
        collectionManager.add(d);
        collectionManager.addLog("add " + d.getId(), true);
        return new Response("LabWork added to collection" + collectionManager.byId(d.getId()));

    } catch (Exception e) {
      return new Response(400, e.getMessage());
    }
  }
}

package server.commands;


import common.model.Response;
import server.managers.CollectionManager;

import java.time.LocalDateTime;

public class Info extends Command {
  private final CollectionManager collectionManager;

  public Info(CollectionManager collectionManager) {
    super("info", "output information about the collection");
    this.collectionManager = collectionManager;
  }

  @Override
  public Response apply(String[] arguments, Object obj) {
    if (!arguments[1].isEmpty())
      return new Response(400, "Incorrect number of arguments!\nUsing: '" + getName() + "'");

    LocalDateTime lastInitTime = collectionManager.getLastInitTime();
    String lastInitTimeString = (lastInitTime == null) ? "initialization has not yet occurred in this session." :
      lastInitTime.toLocalDate().toString() + " " + lastInitTime.toLocalTime().toString();

    LocalDateTime lastSaveTime = collectionManager.getLastSaveTime();
    String lastSaveTimeString = (lastSaveTime == null) ? "There has not been a save yet in this session." :
      lastSaveTime.toLocalDate().toString() + " " + lastSaveTime.toLocalTime().toString();

    var s = "Info about collection:\n";
    s += " Type: " + collectionManager.getCollection().getClass().toString() + "\n";
    s += " Number of elements: " + collectionManager.getCollection().size() + "\n";
    s += " Last save date: " + lastSaveTimeString + "\n";
    s += " Last initialize date: " + lastInitTimeString;
    return new Response(s);
  }
}


package server.commands;

import common.model.LabWork;
import common.model.Response;
import server.managers.CollectionManager;

import java.util.Comparator;

public class MinByMaximumPointCommand extends Command {
  private final CollectionManager collectionManager;

  public MinByMaximumPointCommand(CollectionManager collectionManager) {
    super("min_by_maximum_point", "show element with minimum maximumPoint value");
    this.collectionManager = collectionManager;
  }


  @Override
  public Response apply(String[] arguments, Object obj) {
    try {
      if (!arguments[1].isEmpty()) return new Response(400, "Incorrect number of arguments!\nUsing: '" + getName() + "'");
      collectionManager.getCollection().stream()
        .min(Comparator.comparingInt(LabWork::getMaximumPoint))
        .ifPresent(labWork -> System.out.println("An object with a minimum maximum score: " + labWork));
      return new Response("Success");
    } catch (Exception e) {
      return new Response(e.getMessage());
    }
  }
}

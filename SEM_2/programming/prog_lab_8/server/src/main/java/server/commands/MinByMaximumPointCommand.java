package server.commands;

import common.model.LabWork;
import common.model.Response;
import server.managers.CollectionManager;
import server.utility.User;

import java.util.Comparator;
import java.util.Optional;

public class MinByMaximumPointCommand extends Command {
  private final CollectionManager collectionManager;

  public MinByMaximumPointCommand(CollectionManager collectionManager) {
    super("min_by_maximum_point", "show element with minimum maximumPoint value","SHOW");
    this.collectionManager = collectionManager;
  }


  @Override
  public Response apply(String[] arguments, Object obj, User user) {
    try {
      if (!arguments[1].isEmpty()) return new Response(400, "Incorrect number of arguments!\nUsing: '" + getName() + "'");
      Optional<LabWork> minLabWork = collectionManager.getCollection().stream()
        .filter(lw -> lw.getMaximumPoint() != null)
        .min(Comparator.comparingInt(LabWork::getMaximumPoint));

      LabWork labWork = minLabWork.orElse(null);
      String body = minLabWork
        .map(lw -> "An object with a minimum maximum score" )
        .orElse("The collection contains no elements with maximumPoint");
      return new Response(body,labWork);
    } catch (Exception e) {
      return new Response(e.getMessage());
    }
  }
}

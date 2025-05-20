package server.commands;

import common.model.LabWork;
import common.model.Response;
import server.managers.CollectionManager;
import server.utility.User;

public class AddIfMax extends Command {
  private final CollectionManager collectionManager;

  public AddIfMax(CollectionManager collectionManager) {
    super(
      "add_if_max {element}",
      "add a new item to the collection if its maximumPoint exceeds the current maximum",
      "ADD"
    );
    this.collectionManager = collectionManager;
  }

  @Override
  public Response apply(String[] arguments, Object obj, User user) {
    if (!arguments[1].isEmpty()) {
      return new Response(
        400,
        "Incorrect number of arguments!\nUsing: '" + getName() + "'"
      );
    }

    try {
      LabWork labWork = (LabWork) obj;

      int currentMax = collectionManager.getCollection().stream()
        .mapToInt(LabWork::getMaximumPoint)
        .max()
        .orElse(Integer.MIN_VALUE);

      if (labWork.getMaximumPoint() > currentMax) {
        if (collectionManager.add(labWork, user)) {
          return new Response(
            "LabWork added to collection",
              collectionManager.byId(labWork.getId())
          );
        }
        return new Response(500, "Access error");
      }

      return new Response(
        400,
        "LabWork not added: its maximumPoint (" + labWork.getMaximumPoint() +
          ") is not greater than current max (" + currentMax + ")."
      );

    } catch (Exception e) {
      return new Response(400, e.getMessage());
    }
  }
}


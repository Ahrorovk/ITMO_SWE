package server.commands;

import common.model.LabWork;
import common.model.Response;
import server.managers.CollectionManager;
import server.utility.User;

import java.util.List;
import java.util.stream.Collectors;

public class RemoveLower extends Command {

  private final CollectionManager collectionManager;

  public RemoveLower(CollectionManager collectionManager) {
    super(
      "remove_lower {element}",
      "remove all items whose maximumPoint is lower than the given element",
      "REMOVE"
    );
    this.collectionManager = collectionManager;
  }

  @Override
  public Response apply(String[] arguments, Object obj, User user) {

    /* ── проверка аргументов ─────────────────────────────────────────── */
    if (!arguments[1].isEmpty()) {
      return new Response(
        400,
        "Incorrect number of arguments!\nUsing: '" + getName() + "'"
      );
    }

    try {
      LabWork element = (LabWork) obj;
      if (element == null) {
        return new Response(400, "Element is null");
      }

      /* ── отбираем кандидатов на удаление ───────────────────────────── */
      List<LabWork> toRemove = collectionManager.getCollection().stream()
        .filter(lw -> lw.getMaximumPoint() < element.getMaximumPoint())
        .collect(Collectors.toList());

      if (toRemove.isEmpty()) {
        return new Response(
          400,
          "No elements with maximumPoint lower than " + element.getMaximumPoint()
        );
      }

      /* ── удаляем по одному, учитывая владельца ─────────────────────── */
      int removed = 0;
      for (LabWork lw : toRemove) {
        if (collectionManager.remove(lw.getId(), user)) {
          removed++;
        }
      }

      if (removed == 0) {
        return new Response(
          500,
          "Access error: you don't have permission to remove the matching elements"
        );
      }

      collectionManager.update();

      return new Response(
        "Removed " + removed + " element(s) with maximumPoint lower than "
          + element.getMaximumPoint()
      );

    } catch (Exception e) {
      return new Response(400, "Error: " + e.getMessage());
    }
  }
}

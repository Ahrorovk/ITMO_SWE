package server.commands;


import common.dto.FilterDifficultyRequest;
import common.model.Difficulty;
import common.model.LabWork;
import common.model.Response;
import server.managers.CollectionManager;
import server.utility.User;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class FilterGreaterThanDifficulty extends Command {
  private final CollectionManager collectionManager;

  public FilterGreaterThanDifficulty(CollectionManager collectionManager) {
    super(
      "filter_greater_difficulty {difficulty}",
      "show all items whose difficulty is greater than the given value","SHOW"
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
      FilterDifficultyRequest filterDifficultyRequest = (FilterDifficultyRequest) obj;
      Difficulty difficulty = Difficulty.valueOf(filterDifficultyRequest.getDifficulty().toUpperCase());

      List<LabWork> filtered = collectionManager.getCollection().stream()
        .filter(lw ->
          lw.getDifficulty() != null &&
            lw.getDifficulty().compareTo(difficulty) > 0
        )
        .collect(Collectors.toList());

      String body = filtered.isEmpty()
        ? "No items with difficulty greater than " + difficulty
        : filtered.stream()
        .map(LabWork::toString)
        .collect(Collectors.joining(System.lineSeparator()));

      return new Response(body);

    } catch (Exception e) {
      return new Response(400, e.getMessage());
    }
  }
}


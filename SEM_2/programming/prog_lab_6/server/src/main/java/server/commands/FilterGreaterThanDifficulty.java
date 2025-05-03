package server.commands;


import com.sun.source.tree.BreakTree;
import common.model.Difficulty;
import common.model.LabWork;
import common.model.Response;
import server.managers.CollectionManager;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class FilterGreaterThanDifficulty extends Command {
  private final CollectionManager collectionManager;

  public FilterGreaterThanDifficulty(CollectionManager collectionManager) {
    super("filter_greater_difficulty {difficulty}", "filter items by greater than difficulty");
    this.collectionManager = collectionManager;
  }

  @Override
  public Response apply(String[] arguments, Object obj) {
    Difficulty difficulty = (Difficulty) obj;
    try {
      List<LabWork> filtered = collectionManager.getCollection().stream()
        .filter(lw -> lw.getDifficulty() != null
          && lw.getDifficulty().compareTo(difficulty) > 0)
        .collect(Collectors.toList());

      // 2️⃣  Превращаем в строку (по одной строке на объект)
      String body = filtered.isEmpty()
        ? "No items with difficulty greater than " + difficulty
        : filtered.stream()
        .map(LabWork::toString)
        .collect(Collectors.joining(System.lineSeparator()));
      return new Response(body);
    } catch (IllegalArgumentException e) {
      System.out.println(e.getMessage());
      return new Response(e.getMessage());
    }
  }
}

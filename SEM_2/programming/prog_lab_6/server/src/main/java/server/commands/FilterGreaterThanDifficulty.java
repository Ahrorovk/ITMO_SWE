package server.commands;


import common.model.Difficulty;
import common.model.Response;
import server.managers.CollectionManager;

public class FilterGreaterThanDifficulty extends Command {
  private final CollectionManager collectionManager;

  public FilterGreaterThanDifficulty(CollectionManager collectionManager) {
    super("filter_greater_difficulty", "filter items by greater than difficulty");
    this.collectionManager = collectionManager;
  }

  @Override
  public Response apply(String[] arguments, Object obj) {
    Difficulty difficulty = (Difficulty) obj;
    try {
      if (arguments[1].isEmpty())
        return new Response(400, "Incorrect number of arguments!\nUsing: '" + getName() + "'");
      collectionManager.getCollection().stream()
        .filter(labWork -> labWork.getDifficulty().compareTo(difficulty) > 0)
        .forEach(System.out::println);
      return new Response("Items successfully filtered by greater than difficulty");
    } catch (IllegalArgumentException e) {
      System.out.println(e.getMessage());
      return new Response(e.getMessage());
    }
  }
}

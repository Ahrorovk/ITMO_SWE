package server.commands;

import common.model.LabWork;
import common.model.Response;
import server.managers.CollectionManager;
import server.utility.User;

import java.util.Arrays;
import java.util.LinkedList;

public class Show extends Command {
  private final CollectionManager collectionManager;

  public Show(CollectionManager collectionManager) {
    super("show", "вывести в стандартный поток вывода все элементы коллекции в строковом представлении", "SHOW");
    this.collectionManager = collectionManager;
  }
  @Override
  public Response apply(String[] arguments, Object obj, User u) {
    if (!arguments[1].isEmpty()) return new Response(400, "Неправильное количество аргументов!\nИспользование: '" + getName() + "'");
    return new Response("OK", new LinkedList<>(Arrays.asList(collectionManager.getCollection().toArray(new LabWork[]{}))));
    //return new Response("OK");
  }
}

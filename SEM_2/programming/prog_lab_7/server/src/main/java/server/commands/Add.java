package server.commands;


import common.model.LabWork;
import common.model.Response;
import server.managers.CollectionManager;
import server.utility.User;

public class Add extends Command {
  private final CollectionManager collectionManager;

  public Add(CollectionManager collectionManager) {
    super("add {element}", "добавить новый элемент в коллекцию", "ADD");
    this.collectionManager = collectionManager;
  }

  /**
   * Выполняет команду
   *
   * @return Успешность выполнения команды.
   */
  @Override
  public Response apply(String[] arguments, Object obj, User u) {
    if (!arguments[1].isEmpty())
      return new Response(400, "Неправильное количество аргументов!\nИспользование: '" + getName() + "'");

    LabWork d = (LabWork) obj;
    if (collectionManager.add(d, u))
      return new Response("Labwork успешно добавлен!");
    else
      return new Response(500, "Access error");
  }
}

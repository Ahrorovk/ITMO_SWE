package server.commands;

import common.model.LabWork;
import common.model.Response;
import server.managers.CollectionManager;
import server.utility.User;

public class Update extends Command {

  private final CollectionManager collectionManager;

  public Update(CollectionManager collectionManager) {
    super("update ID {element}", "обновить значение элемента коллекции по ID", "ADD");

    this.collectionManager = collectionManager;
  }
  @Override
  public Response apply(String[] arguments, Object obj, User u) {
    if (arguments[1].isEmpty()) return new Response(400, "Неправильное количество аргументов!\nИспользование: '" + getName() + "'");
    long id = -1;
    try { id = Long.parseLong(arguments[1].trim()); } catch (NumberFormatException e) { return new Response(400, "ID не распознан"); }

    if (collectionManager.byId(id) == null || !collectionManager.getCollection().contains(collectionManager.byId(id))) {
      return new Response(400, "Не существующий ID");
    }

    var d = (LabWork) obj;
    if (d != null && d.validate()) {
      d.setId(id);
      if (collectionManager.update(d, u)) return new Response("Обновлено!");
      return new Response(500, "Access error");
    } else {
      return new Response(400, "Поля LabWork не валидны! Дракон не создан!");
    }
  }
}


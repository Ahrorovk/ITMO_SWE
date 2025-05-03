package server.commands;

import common.model.Response;
import server.managers.CollectionManager;

public class RemoveById extends Command {

	private final CollectionManager collectionManager;

	public RemoveById(CollectionManager collectionManager) {
		super("remove_by_id ID", "delete item from collection by ID");

		this.collectionManager = collectionManager;
	}

	@Override
	public Response apply(String[] arguments, Object obj) {
    if (!arguments[1].isEmpty())
      return new Response(400, "Incorrect number of arguments!\nUsing: '" + getName() + "'");
    long id = -1;
		try { id = Long.parseLong(arguments[1].trim()); } catch (NumberFormatException e) { return new Response(400, "ID wasn`t recognised"); }

		if (collectionManager.byId(id) == null || !collectionManager.getCollection().contains(collectionManager.byId(id)))
			return new Response(400, "Не существующий ID");
		collectionManager.remove(id);
		collectionManager.addLog("remove " + id, true);
		collectionManager.update();
		return new Response("Дракон успешно удалён!");
	}
}

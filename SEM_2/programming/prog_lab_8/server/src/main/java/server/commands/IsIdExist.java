package server.commands;


import common.model.Response;
import server.managers.CollectionManager;
import server.utility.User;

/**
 * Команда 'is_id_exist'.
 */
public class IsIdExist extends Command {
	private final CollectionManager collectionManager;

	public IsIdExist(CollectionManager collectionManager) {
		super("is_id_exist", "notifies about the existence of the id", "SHOW");
		this.collectionManager = collectionManager;
	}

	/**
	 * Выполняет команду
	 * @return Успешность выполнения команды.
	 */
	@Override
	public Response apply(String[] arguments, Object obj, User u) {
		if (arguments[1].isEmpty()) return new Response(400, "Incorrect number of arguments!\n" +
      "Using: '" + getName() + "'");

		long id = -1;
		try { id = Long.parseLong(arguments[1].trim()); } catch (NumberFormatException e) { return new Response(400, "The ID was not recognized"); }

		if (collectionManager.byId(id) == null || !collectionManager.getCollection().contains(collectionManager.byId(id)))
			return new Response("NOT_EXIST");
		else
			return new Response("EXIST");
	}
}

package server.commands;

import common.model.Response;
import server.managers.CollectionManager;
import server.utility.User;

public class RemoveById extends Command {

	private final CollectionManager collectionManager;

	public RemoveById(CollectionManager collectionManager) {
		super("remove_by_id ID", "delete item from collection by ID","REMOVE");

		this.collectionManager = collectionManager;
	}

	@Override
	public Response apply(String[] arguments, Object obj, User user) {
    if (!arguments[1].isEmpty())
      return new Response(400, "Incorrect number of arguments!\nUsing: '" + getName() + "'");
    long id = -1;
    try { id = Long.parseLong(arguments[1].trim()); } catch (NumberFormatException e) { return new Response(400, "The ID was not recognized"); }

    if (collectionManager.byId(id) == null)
      return new Response(400, "A non-existing ID");
    if (collectionManager.remove(id, user))
      return new Response("LabWork successfully removed!");
    return new Response(500, "Access error");
	}
}

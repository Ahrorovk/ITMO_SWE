package server.commands;

import common.model.Response;
import server.managers.CollectionManager;
import server.utility.User;

public class Reorder extends Command {

	private final CollectionManager collectionManager;

	public Reorder(CollectionManager collectionManager) {
		super("reorder", "sort the collection in the reverse order of the current one", "REORDER");

		this.collectionManager = collectionManager;
	}

	@Override
	public Response apply(String[] arguments, Object obj, User u) {
		if (!arguments[1].isEmpty()) return new Response(400, "Incorrect number of arguments!\n" +
      "Using: '" + getName() + "'");
		collectionManager.isAscendingSort ^= true;
		collectionManager.update();
		return new Response("Sorted!");
	}
}

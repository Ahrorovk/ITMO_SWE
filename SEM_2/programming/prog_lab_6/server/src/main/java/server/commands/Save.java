package server.commands;


import common.model.Response;
import server.managers.CollectionManager;

public class Save extends Command {
	private final CollectionManager collectionManager;

	public Save(CollectionManager collectionManager) {
		super("save", "сохранить коллекцию в файл");
		this.collectionManager = collectionManager;
	}

	@Override
	public Response apply(String[] arguments, Object obj) {
		System.out.println("$ save");
		collectionManager.saveCollection();
		return new Response("OK");
	}
}

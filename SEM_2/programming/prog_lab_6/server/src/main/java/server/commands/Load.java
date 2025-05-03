package server.commands;


import common.model.Response;
import server.managers.CollectionManager;
public class Load extends Command {
	private final CollectionManager collectionManager;

	public Load(CollectionManager collectionManager) {
		super("load", "load collection from file");
		this.collectionManager = collectionManager;
	}

	@Override
	public Response apply(String[] arguments, Object obj) {
		System.out.println("$ load");
		if (!collectionManager.loadCollection()) { System.out.println("The collection has not been uploaded!"); }
		return new Response("OK");
	}
}

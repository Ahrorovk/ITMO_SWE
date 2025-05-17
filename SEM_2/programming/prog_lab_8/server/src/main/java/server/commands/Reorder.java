package server.commands;

import common.model.Response;
import server.managers.CollectionManager;
import server.utility.User;

/**
 * Команда 'reorder'. Отсортировать коллекцию в порядке, обратном нынешнему.
 */
public class Reorder extends Command {

	private final CollectionManager collectionManager;

	public Reorder(CollectionManager collectionManager) {
		super("reorder", "отсортировать коллекцию в порядке, обратном нынешнему", "REORDER");

		this.collectionManager = collectionManager;
	}

	/**
	 * Выполняет команду
	 * @return Успешность выполнения команды.
	 */
	@Override
	public Response apply(String[] arguments, Object obj, User u) {
		if (!arguments[1].isEmpty()) return new Response(400, "Неправильное количество аргументов!\nИспользование: '" + getName() + "'");
		collectionManager.isAscendingSort ^= true;
		collectionManager.update();
		return new Response("Отсортировано!");
	}
}

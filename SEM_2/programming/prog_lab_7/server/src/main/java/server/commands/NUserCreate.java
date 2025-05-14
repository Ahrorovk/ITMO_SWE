package server.commands;


import common.model.Response;
import server.managers.UserManager;
import server.utility.User;

/**
 * Команда 'create_user'. Создаёт нового пользователя.
 */
public class NUserCreate extends Command {

	private final UserManager userManage;

	public NUserCreate(UserManager userManage) {
		super("create_user login:password", "создать нового пользователя", "DEFAULT");
		this.userManage = userManage;
	}

	/**
	 * Выполняет команду
	 * @return Успешность выполнения команды.
	 */
	@Override
	public Response apply(String[] arguments, Object obj, User u) {
		if (arguments[1].isEmpty()) return new Response(400, "Неправильное количество аргументов!\nИспользование: '" + getName() + "'");
		try {
			if (userManage.addUser(arguments[1].split(":")[0],arguments[1].split(":")[1]))
				return new Response("OK");
			else
				return new Response(500, "NOOK");
		} catch (ArrayIndexOutOfBoundsException e){ return new Response(400, "login:password not valid"); }
	}
}

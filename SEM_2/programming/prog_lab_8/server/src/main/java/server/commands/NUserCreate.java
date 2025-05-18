package server.commands;


import common.model.Response;
import server.managers.UserManager;
import server.utility.User;

public class NUserCreate extends Command {

	private final UserManager userManage;

	public NUserCreate(UserManager userManage) {
		super("create_user login:password", "create a new user", "DEFAULT");
		this.userManage = userManage;
	}

	@Override
	public Response apply(String[] arguments, Object obj, User u) {
		if (arguments[1].isEmpty()) return new Response(400, "Incorrect number of arguments!\n" +
      "Using: '" + getName() + "'");
		try {
			if (userManage.addUser(arguments[1].split(":")[0], arguments[1].split(":")[1]).isEmpty())
				return new Response("OK");
			else
				return new Response(500, "NOOK");
		} catch (ArrayIndexOutOfBoundsException e){ return new Response(400, "login:password not valid"); }
	}
}

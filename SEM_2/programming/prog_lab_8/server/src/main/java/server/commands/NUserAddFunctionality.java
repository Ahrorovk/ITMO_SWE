package server.commands;


import common.model.Response;
import server.managers.CommandManager;
import server.managers.UserManager;
import server.utility.User;

import java.util.Arrays;
import java.util.stream.Collectors;

public class NUserAddFunctionality extends Command {

	private final UserManager userManager;
	private final CommandManager commandManager;

	public NUserAddFunctionality(UserManager userManager, CommandManager commandManager) {
		super("user_add_functionality role:func", " adds functionality to the role", "PERMISSION");
		this.userManager = userManager;
		this.commandManager = commandManager;
	}

	@Override
	public Response apply(String[] arguments, Object obj, User u) {
		if (arguments[1].isEmpty()) return new Response(400, "Incorrect number of arguments!\n" +
      "Using: '" + getName() + "'");
		try {
			if (arguments[1].trim().equals(":")) return new Response(stats());
			if (userManager.addFunctionality(arguments[1].split(":")[0], arguments[1].split(":")[1]))
				return new Response("OK\n\n"+stats());
			else
				return new Response(500, "NOOK\n\n"+stats());
		} catch (ArrayIndexOutOfBoundsException e){ return new Response(400, "role:func not valid\n\n"+stats()); }
	}

	private String stats() {
		return "functionality: " + commandManager.getCommands().values().stream().filter(
				command-> !command.getFunctionality().equals("DEFAULT")
			).map(
				command -> command.getFunctionality()
			).distinct().collect(Collectors.joining(","))+",REMOVEALL\n"+
			"role:functionality:\n "+Arrays.stream(userManager.getUsers()).map(
				user -> user.getRole()
			).distinct().map(
				role -> role+":"+userManager.getFunctionality(role)
			).collect(Collectors.joining("\n "));
	}
}

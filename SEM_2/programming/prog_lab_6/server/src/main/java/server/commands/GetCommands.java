package server.commands;

import common.model.Response;
import server.managers.CommandManager;

import java.util.ArrayList;
import java.util.Arrays;

public class GetCommands extends Command {
	private final CommandManager commandManager;

	public GetCommands(CommandManager commandManager) {
		super("get_commands", "output list of server commands to display");
		this.commandManager = commandManager;
	}

	@Override
	public Response apply(String[] arguments, Object obj) {
    if (!arguments[1].isEmpty()) return new Response(400, "Incorrect number of arguments!\nUsing: '" + getName() + "'");
		var s = new ArrayList<>(Arrays.asList(
			commandManager.getCommands().values().stream().filter(
				command-> !command.getName().equals("get_commands") &&
					!command.getName().equals("save") &&
					!command.getName().equals("load") &&
					!command.getName().equals("show")
			).map(
				command -> new String[]{
					(command.getName()+" ").split(" ",2)[0],
					command.getName(),
					(command.getName()+" ").split(" ",2)[1].trim().replace(' ', ','),
					command.getDescription()
				}
			).toArray()));

		return new Response("OK",s);
	}
}

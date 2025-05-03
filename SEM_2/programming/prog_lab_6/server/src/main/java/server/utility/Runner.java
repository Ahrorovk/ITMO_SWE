package server.utility;

import common.model.Response;
import server.managers.CommandManager;

import java.util.ArrayList;
import java.util.List;

public class Runner {
	private Console console;
	private final CommandManager commandManager;
	private final List<String> scriptStack = new ArrayList<>();
	private int lengthRecursion = -1;

	public Runner(Console console, CommandManager commandManager) {
		this.console = console;
		this.commandManager = commandManager;
	}

	private Response launchCommand(String[] userCommand, Object obj) {
		if (userCommand[0].equals("")) return new Response("OK");
		var command = commandManager.getCommands().get(userCommand[0]);

		if (command == null)
			return new Response(400, "Command '" + userCommand[0] + "' wasn`t found. Type 'help' for reference");//error

		var resp = command.apply(userCommand, obj);
		if (resp == null) return new Response(503, "503");
		return resp;
	}

	public Object executeCommand(String s, Object obj) {
		try {
			commandManager.getCommands().get("load").apply(new String[]{"load", ""}, null);
			String[] userCommand = {"", ""};
			userCommand = (s.replace('\n',' ').replace('\r',' ') + " ").split(" ", 2);
			userCommand[1] = userCommand[1].trim();
			System.out.println("$ "+userCommand[0]);

			commandManager.addToHistory(userCommand[0]);

			return launchCommand(userCommand, obj);
		} finally {
			commandManager.getCommands().get("save").apply(new String[]{"save", ""}, null);
		}
	}
}

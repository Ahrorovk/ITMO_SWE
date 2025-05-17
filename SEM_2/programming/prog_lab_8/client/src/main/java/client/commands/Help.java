package client.commands;

import client.managers.CommandManager;
import client.utility.Console;

public class Help extends Command {
	private final Console console;
	private final CommandManager commandManager;

	public Help(Console console, CommandManager commandManager) {
		super("help", "output reference for available commands");
		this.console = console;
		this.commandManager = commandManager;
	}

	@Override
	public boolean apply(String[] arguments) {
		if (!arguments[1].isEmpty()) {
			console.println("Incorrect number of arguments!");
			console.println("Using: '" + getName() + "'");
			return false;
		}

		commandManager.getCommands().values().forEach(command -> {
			console.printTable(command.getName(), command.getDescription());
		});
		return true;
	}
}

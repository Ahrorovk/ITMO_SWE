package client.commands;

import client.utility.Console;


public class Exit extends Command {
	private final Console console;

	public Exit(Console console) {
		super("exit", "finish program (without saving to file)");
		this.console = console;
	}

	@Override
	public boolean apply(String[] arguments) {
		if (!arguments[1].isEmpty()) {
			console.println("Incorrect number of arguments!");
			console.println("Using: '" + getName() + "'");
			return false;
		}

		console.println("Completion of execution...");
		return true;
	}
}

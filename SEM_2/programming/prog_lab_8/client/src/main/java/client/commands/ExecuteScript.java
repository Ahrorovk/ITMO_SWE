package client.commands;

import client.utility.Console;


public class ExecuteScript extends Command {
	private final Console console;

	public ExecuteScript(Console console) {
		super("execute_script <file_name>", "execute the script from the specified file");
		this.console = console;
	}

	@Override
	public boolean apply(String[] arguments) {
		if (arguments[1].isEmpty()) {
			console.println("Incorrect number of arguments!");
			console.println("Using: '" + getName() + "'");
			return false;
		}

		console.println("Script execution '" + arguments[1] + "'...");
		return true;
	}
}

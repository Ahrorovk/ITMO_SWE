package client.utility;


import client.commands.DefaultCommand;
import client.managers.CommandManager;
import client.managers.TCPManager;

import java.io.File;
import java.io.FileNotFoundException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Scanner;

public class Runner {

	public enum ExitCode {
		OK,
		ERROR,
		EXIT
	}

	private Console console;
	private final CommandManager commandManager;
	private final TCPManager tcpManager;
	private final List<String> scriptStack = new ArrayList<>();
	private int lengthRecursion = -1;

	public Runner(Console console, CommandManager commandManager, TCPManager tcpManager) {
		this.console = console;
		this.commandManager = commandManager;
		this.tcpManager = tcpManager;
	}
	public void interactiveMode() {
		try {
			ExitCode commandStatus;
			String[] userCommand = {"", ""};

			do {
				console.prompt();
				userCommand = (console.readln().trim() + " ").split(" ", 2);
				userCommand[1] = userCommand[1].trim();

				commandManager.addToHistory(userCommand[0]);
				commandStatus = launchCommand(userCommand);
			} while (commandStatus != ExitCode.EXIT);

		} catch (NoSuchElementException exception) {
			console.printError("No user input detected!");
		} catch (IllegalStateException exception) {
			console.printError("Unexpected error!");
		}
	}

	public ExitCode scriptMode(String argument) {
		String[] userCommand = {"", ""};
		ExitCode commandStatus;
		scriptStack.add(argument);
		if (!new File(argument).exists()) {
			console.printError("File does not exist!");
			return ExitCode.ERROR;
		}
		if (!Files.isReadable(Paths.get(argument))) {
			console.printError("There are no reading rights");
			return ExitCode.ERROR;
		}
		try (Scanner scriptScanner = new Scanner(new File(argument))) {
			if (!scriptScanner.hasNext()) throw new NoSuchElementException();
			console.selectFileScanner(scriptScanner);

			do {
				userCommand = (console.readln().trim() + " ").split(" ", 2);
				userCommand[1] = userCommand[1].trim();
				while (console.isCanReadln() && userCommand[0].isEmpty()) {
					userCommand = (console.readln().trim() + " ").split(" ", 2);
					userCommand[1] = userCommand[1].trim();
				}
				console.println(console.getPrompt() + String.join(" ", userCommand));
				var needLaunch = true;
				if (userCommand[0].equals("execute_script")) {
					var recStart = -1;
					var i = 0;
					for (String script : scriptStack) {
						i++;
						if (userCommand[1].equals(script)) {
							if (recStart < 0) recStart = i;
							if (lengthRecursion < 0) {
								console.selectConsoleScanner();
								console.println("A recursion has been noticed! Enter the maximum recursion depth (0..500)");
								while (lengthRecursion < 0 || lengthRecursion > 500) {
									try { console.print("> "); lengthRecursion = Integer.parseInt(console.readln().trim()); } catch (NumberFormatException e) { console.println("длина не распознан"); }
								}
								console.selectFileScanner(scriptScanner);
							}
							if (i > recStart + lengthRecursion || i > 500)
								needLaunch = false;
						}
					}
				}
				commandStatus = needLaunch ? launchCommand(userCommand) : ExitCode.OK;
			} while (commandStatus == ExitCode.OK && console.isCanReadln());

			console.selectConsoleScanner();
			if (commandStatus == ExitCode.ERROR && !(userCommand[0].equals("execute_script") && !userCommand[1].isEmpty())) {
				console.println("Check the script for the correctness of the entered data!");
			}

			return commandStatus;
		} catch (FileNotFoundException exception) {
			console.printError("The script file was not found!");
		} catch (NoSuchElementException exception) {
			console.printError("The script file is empty!");
		} catch (IllegalStateException exception) {
			console.printError("Unexpected error!");
			System.exit(0);
		} finally {
			scriptStack.remove(scriptStack.size() - 1);
		}
		return ExitCode.ERROR;
	}

	private ExitCode launchCommand(String[] userCommand) {
		commandManager.clear();
		for (var e:(ArrayList<String[]>)tcpManager.send("get_commands").getResponseObj())
			commandManager.register("$"+e[0], new DefaultCommand(e, console, tcpManager));

		if (userCommand[0].equals("")) return ExitCode.OK;
		var command = commandManager.getCommands().get(userCommand[0]);
		if (command == null) command = commandManager.getCommands().get('$'+userCommand[0]);

		if (command == null) {
			console.printError("Command '" + userCommand[0] + "' wasn`t found. Type 'help' for reference");
			return ExitCode.ERROR;
		}
		switch (userCommand[0]) {
			case "exit" -> {
				if (!commandManager.getCommands().get("exit").apply(userCommand)) return ExitCode.ERROR;
				else return ExitCode.EXIT;
			}
			case "execute_script" -> {
				if (!commandManager.getCommands().get("execute_script").apply(userCommand)) return ExitCode.ERROR;
				else return scriptMode(userCommand[1]);
			}
			default -> { if (!command.apply(userCommand)) return ExitCode.ERROR; }
		};

		return ExitCode.OK;
	}
}

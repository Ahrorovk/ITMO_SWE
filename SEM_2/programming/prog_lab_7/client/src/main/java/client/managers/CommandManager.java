package client.managers;

import client.commands.Command;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class CommandManager {
	private final Map<String, Command> commands = new LinkedHashMap<>();
	private final List<String> commandHistory = new ArrayList<>();

	public void register(String commandName, Command command) {
		commands.put(commandName, command);
	}
	public Map<String, Command> getCommands() {
		return commands;
	}

	public List<String> getCommandHistory() {
		return commandHistory;
	}

	public void addToHistory(String command) {
		commandHistory.add(command);
	}

	public void clear() {
		for (var e:commands.keySet().toArray(new String[0]))
			if (e.charAt(0) == '$')
				commands.remove(e);
	}
}

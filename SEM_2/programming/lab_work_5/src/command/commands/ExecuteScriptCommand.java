package command.commands;

import manager.CollectionManager;
import command.Command;
import manager.CommandManager;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class ExecuteScriptCommand implements Command {
    private final String fileName;
    private final CollectionManager collectionManager;

    public ExecuteScriptCommand(String fileName, CollectionManager collectionManager) {
        this.fileName = fileName;
        this.collectionManager = collectionManager;
    }

    @Override
    public void execute() {
        System.out.println("Executing script from file: " + fileName);

        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
            String line;
            CommandManager commandManager = new CommandManager(collectionManager);

            while ((line = reader.readLine()) != null) {
                line = line.trim();

                if (line.isEmpty()) {
                    continue;
                }

                try {
                    commandManager.executeCommand(line);
                } catch (Exception e) {
                    System.err.println("Error executing command: " + line);
                    System.err.println("Error: " + e.getMessage());
                }
            }

        } catch (IOException e) {
            System.err.println("Error reading the script file: " + e.getMessage());
        }
    }
}

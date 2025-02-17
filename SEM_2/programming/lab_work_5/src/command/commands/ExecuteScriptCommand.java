package command.commands;

import MyClass.LabWorkCollection;
import command.Command;
import command.commandProvider.CommandProvider;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class ExecuteScriptCommand implements Command {
    private final String fileName;

    public ExecuteScriptCommand(String fileName) {
        this.fileName = fileName;
    }

    @Override
    public void execute() {
        System.out.println("Executing script from file: " + fileName);

        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
            String line;
            CommandProvider commandManager = new CommandProvider(new LabWorkCollection());

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

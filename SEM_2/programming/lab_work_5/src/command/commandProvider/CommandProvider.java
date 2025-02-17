package command.commandProvider;

import MyClass.Difficulty;
import MyClass.LabWork;
import MyClass.LabWorkCollection;
import command.commands.*;

import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

import static command.commands.FillCommand.fillFields;

public class CommandProvider {
    private final LabWorkCollection labWorkCollection;
    private static final Scanner scanner = new Scanner(System.in);

    public CommandProvider(LabWorkCollection labWorkCollection) {
        this.labWorkCollection = labWorkCollection;
    }


    public void executeCommand(String userInput) {
        String[] inputParts = userInput.split(" ", 2);
        String command = inputParts[0].toLowerCase();

        switch (command) {
            case "help":
                new HelpCommand().execute();
                break;
            case "info":
                new InfoCommand(labWorkCollection).execute();
                break;
            case "show":
                new ShowCommand(labWorkCollection).execute();
                break;
            case "add":
                new AddCommand(labWorkCollection,fillFields()).execute();
                break;
            case "update":
                if (inputParts.length > 1) {
                    new UpdateCommand(labWorkCollection, Long.parseLong(inputParts[1]), fillFields()).execute();
                } else {
                    System.out.println("ID is required for the update command.");
                }
                break;
            case "remove_by_id":
                if (inputParts.length > 1) {
                    new RemoveByIdCommand(labWorkCollection, Long.parseLong(inputParts[1])).execute();
                } else {
                    System.out.println("ID is required for the remove_by_id command.");
                }
                break;
            case "clear":
                new ClearCommand(labWorkCollection).execute();
                break;
            case "save":
                System.out.println("Write name for your file for saving:");
                String fileName = scanner.nextLine();
                new SaveCommand(labWorkCollection, fileName + ".csv").execute();
                break;
            case "load":
                System.out.println("Write name for your file for loading:");
                String loadFileName = scanner.nextLine();
                new LoadCommand(labWorkCollection, loadFileName + ".csv").execute();
                break;
            case "execute_script":
                if (inputParts.length > 1) {
                    new ExecuteScriptCommand(inputParts[1]).execute();
                } else {
                    System.out.println("File name is required for the execute_script command.");
                }
                break;
            case "exit":
                new ExitCommand().execute();
                break;
            case "add_if_max":
                new AddIfMaxCommand(labWorkCollection, fillFields()).execute();
                break;
            case "remove_greater":
                new RemoveGreaterCommand(labWorkCollection, fillFields()).execute();
                break;
            case "remove_lower":
                new RemoveLowerCommand(labWorkCollection, fillFields()).execute();
                break;
            case "min_by_maximum_point":
                new MinByMaximumPointCommand(labWorkCollection).execute();
                break;
            case "filter_greater_than_difficulty":
                System.out.println("Choose difficulty from: ");
                System.out.println(Difficulty.VERY_EASY.name());
                System.out.println(Difficulty.EASY.name());
                System.out.println(Difficulty.NORMAL.name());
                System.out.println(Difficulty.TERRIBLE.name());
                while (true) {
                    try {
                        String response = scanner.nextLine();
                        List<Difficulty> difficulties = Arrays.stream(Difficulty.values()).toList();
                        Difficulty difficulty = null;
                        for (Difficulty value : difficulties) {
                            if (value.name().equals(response)) {
                                difficulty = value;
                            }
                        }
                        if (difficulty != null) {
                            new FilterGreaterThanDifficultyCommand(labWorkCollection, difficulty).execute();
                            break;
                        } else {
                            throw new IllegalArgumentException("difficulty chose wrongly");
                        }
                    } catch (Exception e) {
                        System.out.println(e.getMessage());
                    }
                }
                break;
            case "print_unique_discipline":
                new PrintUniqueDisciplineCommand(labWorkCollection).execute();
                break;
            default:
                System.out.println("Unknown command. Type 'help' for a list of available commands.");
        }
    }
}


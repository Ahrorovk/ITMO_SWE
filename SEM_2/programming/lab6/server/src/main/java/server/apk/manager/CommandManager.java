package server.apk.manager;

import common.apk.model.CommandRequest;
import common.apk.model.CommandResponse;
import common.apk.model.Difficulty;
import common.apk.model.LabWork;
import server.apk.command.commands.*;

public class CommandManager {
    private final CollectionManager collectionManager;

    public CommandManager(CollectionManager collectionManager) {
        this.collectionManager = collectionManager;
    }

    // Keep the old method for backward compatibility
    public void executeCommand(String userInput) {
        String[] inputParts = userInput.split(" ", 2);
        String commandName = inputParts[0].toLowerCase();
        Object[] arguments = new Object[0];

        if (inputParts.length > 1) {
            arguments = new Object[]{inputParts[1]};
        }

        CommandRequest request = new CommandRequest(commandName, arguments);
        CommandResponse response = executeCommand(request);
        
        if (!response.isSuccess()) {
            System.err.println(response.getMessage());
        }
    }

    public CommandResponse executeCommand(CommandRequest request) {
        String commandName = request.getCommandName();
        Object[] arguments = request.getArguments();

        try {
            switch (commandName) {
                case "help":
                    return new CommandResponse(true, "Available commands:", getHelpText());
                case "info":
                    return new CommandResponse(true, "Collection information:", getInfoText());
                case "show":
                    return new CommandResponse(true, "Collection contents:", collectionManager.getCollection());
                case "add":
                    if (arguments.length > 0) {
                        new AddCommand(collectionManager, (LabWork) arguments[0]).execute();
                        return new CommandResponse(true, "Element added successfully", null);
                    }
                    return new CommandResponse(false, "Element data is required for the add command", null);
                case "update":
                    if (arguments.length > 1) {
                        new UpdateCommand(collectionManager, (Long) arguments[0], (LabWork) arguments[1]).execute();
                        return new CommandResponse(true, "Element updated successfully", null);
                    }
                    return new CommandResponse(false, "ID and element data are required for the update command", null);
                case "remove_by_id":
                    if (arguments.length > 0) {
                        new RemoveByIdCommand(collectionManager, (Long) arguments[0]).execute();
                        return new CommandResponse(true, "Element removed successfully", null);
                    }
                    return new CommandResponse(false, "ID is required for the remove_by_id command", null);
                case "clear":
                    new ClearCommand(collectionManager).execute();
                    return new CommandResponse(true, "Collection cleared successfully", null);
                case "save":
                    if (arguments.length > 0) {
                        new SaveCommand(collectionManager, (String) arguments[0]).execute();
                        return new CommandResponse(true, "Collection saved successfully", null);
                    }
                    return new CommandResponse(false, "File name is required for the save command", null);
                case "load":
                    if (arguments.length > 0) {
                        new LoadCommand(collectionManager, (String) arguments[0]).execute();
                        return new CommandResponse(true, "Collection loaded successfully", null);
                    }
                    return new CommandResponse(false, "File name is required for the load command", null);
                case "execute_script":
                    if (arguments.length > 0) {
                        new ExecuteScriptCommand((String) arguments[0], collectionManager).execute();
                        return new CommandResponse(true, "Script executed successfully", null);
                    }
                    return new CommandResponse(false, "File name is required for the execute_script command", null);
                case "exit":
                    new ExitCommand().execute();
                    return new CommandResponse(true, "Exiting...", null);
                case "add_if_max":
                    if (arguments.length > 0) {
                        new AddIfMaxCommand(collectionManager, (LabWork) arguments[0]).execute();
                        return new CommandResponse(true, "Element added if max successfully", null);
                    }
                    return new CommandResponse(false, "Element data is required for the add_if_max command", null);
                case "remove_greater":
                    if (arguments.length > 0) {
                        new RemoveGreaterCommand(collectionManager, (LabWork) arguments[0]).execute();
                        return new CommandResponse(true, "Greater elements removed successfully", null);
                    }
                    return new CommandResponse(false, "Element data is required for the remove_greater command", null);
                case "remove_lower":
                    if (arguments.length > 0) {
                        new RemoveLowerCommand(collectionManager, (LabWork) arguments[0]).execute();
                        return new CommandResponse(true, "Lower elements removed successfully", null);
                    }
                    return new CommandResponse(false, "Element data is required for the remove_lower command", null);
                case "min_by_maximum_point":
                    MinByMaximumPointCommand command = new MinByMaximumPointCommand(collectionManager);
                    command.execute();
                    return new CommandResponse(true, "Element with minimum maximumPoint:", command.getResult());
                case "filter_greater_than_difficulty":
                    if (arguments.length > 0) {
                        FilterGreaterThanDifficultyCommand filterCommand = new FilterGreaterThanDifficultyCommand(collectionManager, (Difficulty) arguments[0]);
                        filterCommand.execute();
                        return new CommandResponse(true, "Elements with greater difficulty:", filterCommand.getResult());
                    }
                    return new CommandResponse(false, "Difficulty is required for the filter_greater_than_difficulty command", null);
                case "print_unique_discipline":
                    PrintUniqueDisciplineCommand printCommand = new PrintUniqueDisciplineCommand(collectionManager);
                    printCommand.execute();
                    return new CommandResponse(true, "Unique disciplines:", printCommand.getResult());
                default:
                    return new CommandResponse(false, "Unknown command. Type 'help' for a list of available commands.", null);
            }
        } catch (Exception e) {
            return new CommandResponse(false, "Error executing command: " + e.getMessage(), null);
        }
    }

    private String getHelpText() {
        return "help - Show available commands\n" +
               "info - Show collection information\n" +
               "show - Show all items in the collection\n" +
               "add {element} - Add new element to the collection\n" +
               "update id {element} - Update element by id\n" +
               "remove_by_id id - Remove element by id\n" +
               "clear - Clear the collection\n" +
//               "save - Save collection to file\n" +
               "execute_script file_name - Execute a script from the file\n" +
               "exit - Exit the program without saving\n" +
               "add_if_max {element} - Add element if its value is higher than the max element\n" +
               "remove_greater {element} - Remove all elements greater than the given element\n" +
               "remove_lower {element} - Remove all elements lower than the given element\n" +
               "min_by_maximum_point - Show element with minimum maximumPoint value\n" +
               "filter_greater_than_difficulty difficulty - Show elements with difficulty greater than the given one\n" +
               "print_unique_discipline - Show unique disciplines in the collection";
    }

    private String getInfoText() {
        return "Collection type: " + collectionManager.getCollection().getClass() + "\n" +
               "Initialization date: " + collectionManager.getCreationDate() + "\n" +
               "Number of elements: " + collectionManager.getCollection().size();
    }
}


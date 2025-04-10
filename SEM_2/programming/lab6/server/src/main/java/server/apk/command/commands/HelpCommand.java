package server.apk.command.commands;

import server.apk.command.Command;

public class HelpCommand implements Command {
    @Override
    public void execute() {
        System.out.println("Available commands.csv:");
        System.out.println("help - Show available commands.csv");
        System.out.println("info - Show collection information");
        System.out.println("show - Show all items in the collection");
        System.out.println("add {element} - Add new element to the collection");
        System.out.println("update id {element} - Update element by id");
        System.out.println("remove_by_id id - Remove element by id");
        System.out.println("clear - Clear the collection");
        System.out.println("save - Save collection to file");
        System.out.println("execute_script file_name - Execute a script from the file");
        System.out.println("exit - Exit the program without saving");
        System.out.println("add_if_max {element} - Add element if its value is higher than the max element in the collection");
        System.out.println("remove_greater {element} - Remove all elements greater than the given element");
        System.out.println("remove_lower {element} - Remove all elements lower than the given element");
        System.out.println("min_by_maximum_point - Show element with minimum maximumPoint value");
        System.out.println("filter_greater_than_difficulty difficulty - Show elements with difficulty greater than the given one");
        System.out.println("print_unique_discipline - Show unique disciplines in the collection");
    }
}

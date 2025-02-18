import manager.CollectionManager;
import manager.CommandManager;

import java.util.Scanner;

public class LabWorkApp {

    public static void main(String[] args) {
        CollectionManager collectionManager = new CollectionManager();
        CommandManager commandManager = new CommandManager(collectionManager);
        Scanner scanner = new Scanner(System.in);
        String userInput;

        System.out.println("Type 'help' for a list of available commands");

        while (true) {
            System.out.print("> ");
            userInput = scanner.nextLine().trim();

            if ("exit".equalsIgnoreCase(userInput)) {
                System.out.println("Exiting program...");
                break;
            }

            try {
                commandManager.executeCommand(userInput);
            } catch (Exception e) {
                System.err.println("Error processing command: " + e.getMessage());
            }
        }

        scanner.close();
    }
}


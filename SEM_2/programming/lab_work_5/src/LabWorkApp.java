import MyClass.LabWorkCollection;
import command.commandProvider.CommandProvider;

import java.util.Scanner;

public class LabWorkApp {

    public static void main(String[] args) {
        // Initialize the collection and command manager
        LabWorkCollection labWorkCollection = new LabWorkCollection();
        CommandProvider commandManager = new CommandProvider(labWorkCollection);

        // Create a scanner to read user input from console
        Scanner scanner = new Scanner(System.in);
        String userInput;

        // Display welcome message
        System.out.println("Welcome to the Lab Work Manager!");
        System.out.println("Type 'help' for a list of available commands.");

        // Main loop for command processing
        while (true) {
            // Read the user input
            System.out.print("> ");
            userInput = scanner.nextLine().trim();

            // Exit condition
            if ("exit".equalsIgnoreCase(userInput)) {
                System.out.println("Exiting program...");
                break;
            }

            // Handle user input via CommandManager
            try {
                commandManager.executeCommand(userInput);
            } catch (Exception e) {
                System.err.println("Error processing command: " + e.getMessage());
            }
        }

        // Close the scanner resource
        scanner.close();
    }
}


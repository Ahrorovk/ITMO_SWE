package command.commands;

import command.Command;

public class ExitCommand implements Command {
    @Override
    public void execute() {
        System.out.println("Completing the program...");
        System.exit(0);
    }
}


package server.apk.command.commands;

import server.apk.command.Command;

public class ExitCommand implements Command {
    @Override
    public void execute() {
        System.out.println("Completing the program...");
        System.exit(0);
    }
}


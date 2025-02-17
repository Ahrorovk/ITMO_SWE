package command.commands;

import MyClass.*;
import command.Command;

public class ShowCommand implements Command {
    private final LabWorkCollection labWorkCollection;

    public ShowCommand(LabWorkCollection labWorkCollection) {
        this.labWorkCollection = labWorkCollection;
    }

    @Override
    public void execute() {
        for (LabWork labWork : labWorkCollection.getCollection()) {
            System.out.println(labWork);
        }
    }
}

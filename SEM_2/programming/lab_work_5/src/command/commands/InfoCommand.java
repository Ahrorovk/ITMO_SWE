package command.commands;

import command.Command;
import MyClass.*;

public class InfoCommand implements Command {
    private final LabWorkCollection labWorkCollection;

    public InfoCommand(LabWorkCollection labWorkCollection) {
        this.labWorkCollection = labWorkCollection;
    }

    @Override
    public void execute() {
        System.out.println("Collection type: " + labWorkCollection.getCollection().getClass());
        System.out.println("Initialization date: " + labWorkCollection.getCreationDate());
        System.out.println("Number of elements: " + labWorkCollection.getCollection().size());
    }
}


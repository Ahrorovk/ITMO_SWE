package command.commands;

import command.Command;
import MyClass.LabWorkCollection;

public class ClearCommand implements Command {
    private final LabWorkCollection labWorkCollection;

    public ClearCommand(LabWorkCollection labWorkCollection) {
        this.labWorkCollection = labWorkCollection;
    }

    @Override
    public void execute() {
        labWorkCollection.getCollection().clear();
    }
}


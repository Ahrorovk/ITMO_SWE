package command.commands;

import MyClass.*;
import command.Command;

public class RemoveGreaterCommand implements Command {
    private final LabWorkCollection labWorkCollection;
    private final LabWork element;

    public RemoveGreaterCommand(LabWorkCollection labWorkCollection, LabWork element) {
        this.labWorkCollection = labWorkCollection;
        this.element = element;
    }

    @Override
    public void execute() {
        labWorkCollection.getCollection().removeIf(labWork -> labWork.getMaximumPoint() > element.getMaximumPoint());
    }
}


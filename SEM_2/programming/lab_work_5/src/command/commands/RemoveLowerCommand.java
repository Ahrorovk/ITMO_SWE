package command.commands;

import MyClass.*;
import command.Command;

public class RemoveLowerCommand implements Command {
    private final LabWorkCollection labWorkCollection;
    private final LabWork element;

    public RemoveLowerCommand(LabWorkCollection labWorkCollection, LabWork element) {
        this.labWorkCollection = labWorkCollection;
        this.element = element;
    }

    @Override
    public void execute() {
        labWorkCollection.getCollection().removeIf(labWork -> labWork.getMaximumPoint() < element.getMaximumPoint());
    }
}


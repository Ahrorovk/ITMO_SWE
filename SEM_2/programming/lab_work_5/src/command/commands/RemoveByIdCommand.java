package command.commands;

import MyClass.LabWorkCollection;
import command.Command;

public class RemoveByIdCommand implements Command {
    private final LabWorkCollection labWorkCollection;
    private final Long id;

    public RemoveByIdCommand(LabWorkCollection labWorkCollection, Long id) {
        this.labWorkCollection = labWorkCollection;
        this.id = id;
    }

    @Override
    public void execute() {
        labWorkCollection.getCollection().removeIf(labWork -> labWork.getId().equals(id));
    }
}


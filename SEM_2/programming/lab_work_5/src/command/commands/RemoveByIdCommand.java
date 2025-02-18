package command.commands;

import manager.CollectionManager;
import command.Command;

public class RemoveByIdCommand implements Command {
    private final CollectionManager collectionManager;
    private final Long id;

    public RemoveByIdCommand(CollectionManager collectionManager, Long id) {
        this.collectionManager = collectionManager;
        this.id = id;
    }

    @Override
    public void execute() {
        collectionManager.getCollection().removeIf(labWork -> labWork.getId().equals(id));
    }
}


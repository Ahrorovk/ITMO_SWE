package command.commands;

import command.Command;
import manager.CollectionManager;

public class ClearCommand implements Command {
    private final CollectionManager collectionManager;

    public ClearCommand(CollectionManager collectionManager) {
        this.collectionManager = collectionManager;
    }

    @Override
    public void execute() {
        collectionManager.getCollection().clear();
    }
}


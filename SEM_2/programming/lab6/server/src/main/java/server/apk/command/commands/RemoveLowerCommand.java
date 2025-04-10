package server.apk.command.commands;

import server.apk.command.Command;
import server.apk.manager.CollectionManager;
import common.apk.model.LabWork;

public class RemoveLowerCommand implements Command {
    private final CollectionManager collectionManager;
    private final LabWork element;

    public RemoveLowerCommand(CollectionManager collectionManager, LabWork element) {
        this.collectionManager = collectionManager;
        this.element = element;
    }

    @Override
    public void execute() {
        collectionManager.getCollection().removeIf(labWork -> labWork.getMaximumPoint() < element.getMaximumPoint());
    }
}


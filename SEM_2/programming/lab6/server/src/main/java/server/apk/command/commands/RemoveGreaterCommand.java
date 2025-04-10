package server.apk.command.commands;

import server.apk.command.Command;
import server.apk.manager.CollectionManager;
import common.apk.model.LabWork;

public class RemoveGreaterCommand implements Command {
    private final CollectionManager collectionManager;
    private final LabWork element;

    public RemoveGreaterCommand(CollectionManager collectionManager, LabWork element) {
        this.collectionManager = collectionManager;
        this.element = element;
    }

    @Override
    public void execute() {
        collectionManager.getCollection().removeIf(labWork -> labWork.getMaximumPoint() > element.getMaximumPoint());
    }
}


package command.commands;

import command.Command;
import manager.*;

public class InfoCommand implements Command {
    private final CollectionManager collectionManager;

    public InfoCommand(CollectionManager collectionManager) {
        this.collectionManager = collectionManager;
    }

    @Override
    public void execute() {
        System.out.println("Collection type: " + collectionManager.getCollection().getClass());
        System.out.println("Initialization date: " + collectionManager.getCreationDate());
        System.out.println("Number of elements: " + collectionManager.getCollection().size());
    }
}


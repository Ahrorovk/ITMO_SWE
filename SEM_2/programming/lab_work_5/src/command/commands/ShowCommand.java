package command.commands;

import manager.*;
import command.Command;
import model.LabWork;

public class ShowCommand implements Command {
    private final CollectionManager collectionManager;

    public ShowCommand(CollectionManager collectionManager) {
        this.collectionManager = collectionManager;
    }

    @Override
    public void execute() {
        for (LabWork labWork : collectionManager.getCollection()) {
            System.out.println(labWork);
        }
    }
}

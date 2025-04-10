package server.apk.command.commands;

import server.apk.command.Command;
import server.apk.manager.CollectionManager;
import common.apk.model.LabWork;

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

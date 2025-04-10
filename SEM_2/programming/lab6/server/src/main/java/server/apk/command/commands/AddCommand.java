package server.apk.command.commands;

import server.apk.command.Command;
import server.apk.manager.CollectionManager;
import common.apk.model.LabWork;

public class AddCommand implements Command {
    private final CollectionManager collectionManager;
    private final LabWork labWork;
    public AddCommand(CollectionManager collectionManager, LabWork labWork) {
        this.collectionManager = collectionManager;
        this.labWork = labWork;
    }

    @Override
    public void execute() {
        collectionManager.addLabWork(labWork);
        System.out.println("The lab work has been added to the collection.");
    }
}


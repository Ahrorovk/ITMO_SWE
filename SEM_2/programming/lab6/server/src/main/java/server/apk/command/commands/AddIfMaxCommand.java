package server.apk.command.commands;

import server.apk.command.Command;
import server.apk.manager.CollectionManager;
import common.apk.model.LabWork;

public class AddIfMaxCommand implements Command {
    private final CollectionManager collectionManager;
    private final LabWork labWork;

    public AddIfMaxCommand(CollectionManager collectionManager, LabWork labWork) {
        this.collectionManager = collectionManager;
        this.labWork = labWork;
    }

    @Override
    public void execute() {
        if (collectionManager.getCollection().stream()
                .mapToInt(LabWork::getMaximumPoint)
                .max()
                .orElse(Integer.MIN_VALUE) < labWork.getMaximumPoint()) {
            collectionManager.addLabWork(labWork);
        }
    }
}

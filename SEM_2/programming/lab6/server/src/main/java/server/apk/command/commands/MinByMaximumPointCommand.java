package server.apk.command.commands;

import server.apk.manager.CollectionManager;
import common.apk.model.LabWork;

public class MinByMaximumPointCommand extends ResultCommand<LabWork> {
    public MinByMaximumPointCommand(CollectionManager collectionManager) {
        super(collectionManager);
    }

    @Override
    public void execute() {
        result = collectionManager.getCollection().stream()
                .min((a, b) -> a.getMaximumPoint().compareTo(b.getMaximumPoint()))
                .orElse(null);
    }
}

package server.apk.command.commands;

import server.apk.manager.CollectionManager;
import common.apk.model.Discipline;
import common.apk.model.LabWork;

import java.util.List;

public class PrintUniqueDisciplineCommand extends ResultCommand<List<Discipline>> {
    public PrintUniqueDisciplineCommand(CollectionManager collectionManager) {
        super(collectionManager);
    }

    @Override
    public void execute() {
        result = collectionManager.getCollection().stream()
                .map(LabWork::getDiscipline)
                .distinct()
                .toList();
    }
}


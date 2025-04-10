package server.apk.command.commands;

import server.apk.manager.CollectionManager;
import common.apk.model.Difficulty;
import common.apk.model.LabWork;

import java.util.List;

public class FilterGreaterThanDifficultyCommand extends ResultCommand<List<LabWork>> {
    private final Difficulty difficulty;

    public FilterGreaterThanDifficultyCommand(CollectionManager collectionManager, Difficulty difficulty) {
        super(collectionManager);
        this.difficulty = difficulty;
    }

    @Override
    public void execute() {
        result = collectionManager.getCollection().stream()
                .filter(labWork -> labWork.getDifficulty().ordinal() > difficulty.ordinal())
                .toList();
    }
}

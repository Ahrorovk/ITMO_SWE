package command.commands;

import manager.*;
import command.Command;
import model.Difficulty;


public class FilterGreaterThanDifficultyCommand implements Command {
    private final CollectionManager collectionManager;
    private final Difficulty difficulty;

    public FilterGreaterThanDifficultyCommand(CollectionManager collectionManager, Difficulty difficulty) {
        this.collectionManager = collectionManager;
        this.difficulty = difficulty;
    }

    @Override
    public void execute() {
        try {
            collectionManager.getCollection().stream()
                    .filter(labWork -> labWork.getDifficulty().compareTo(difficulty) > 0)
                    .forEach(System.out::println);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }
}

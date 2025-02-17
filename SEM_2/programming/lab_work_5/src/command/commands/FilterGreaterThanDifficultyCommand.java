package command.commands;

import MyClass.*;
import command.Command;


public class FilterGreaterThanDifficultyCommand implements Command {
    private final LabWorkCollection labWorkCollection;
    private final Difficulty difficulty;

    public FilterGreaterThanDifficultyCommand(LabWorkCollection labWorkCollection, Difficulty difficulty) {
        this.labWorkCollection = labWorkCollection;
        this.difficulty = difficulty;
    }

    @Override
    public void execute() {
        try {
            labWorkCollection.getCollection().stream()
                    .filter(labWork -> labWork.getDifficulty().compareTo(difficulty) > 0)
                    .forEach(System.out::println);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }
}

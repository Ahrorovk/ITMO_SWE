package command.commands;

import manager.*;
import command.Command;
import model.LabWork;

import java.util.Comparator;

public class MinByMaximumPointCommand implements Command {
    private final CollectionManager collectionManager;

    public MinByMaximumPointCommand(CollectionManager collectionManager) {
        this.collectionManager = collectionManager;
    }

    @Override
    public void execute() {
        collectionManager.getCollection().stream()
                .min(Comparator.comparingInt(LabWork::getMaximumPoint))
                .ifPresent(labWork -> System.out.println("An object with a minimum maximum score: " + labWork));
    }
}

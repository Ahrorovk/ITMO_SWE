package command.commands;

import MyClass.*;
import command.Command;

import java.util.Comparator;

public class MinByMaximumPointCommand implements Command {
    private final LabWorkCollection labWorkCollection;

    public MinByMaximumPointCommand(LabWorkCollection labWorkCollection) {
        this.labWorkCollection = labWorkCollection;
    }

    @Override
    public void execute() {
        labWorkCollection.getCollection().stream()
                .min(Comparator.comparingInt(LabWork::getMaximumPoint))
                .ifPresent(labWork -> System.out.println("An object with a minimum maximum score: " + labWork));
    }
}

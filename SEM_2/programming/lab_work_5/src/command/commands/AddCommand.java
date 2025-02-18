package command.commands;

import manager.*;
import command.Command;
import model.LabWork;

import java.util.Scanner;

public class AddCommand implements Command {
    private final CollectionManager collectionManager;
    private final LabWork labWork;
    public AddCommand(CollectionManager collectionManager, LabWork labWork) {
        this.collectionManager = collectionManager;
        this.labWork = labWork;
    }

    @Override
    public void execute() {
        collectionManager.addLabWork(labWork.getName(), labWork.getCoordinates(), labWork.getMinimalPoint(),
                labWork.getMaximumPoint(), labWork.getPersonalQualitiesMaximum(), labWork.getDifficulty(),
                labWork.getDiscipline());

        System.out.println("The lab work has been added to the collection.");
    }
}


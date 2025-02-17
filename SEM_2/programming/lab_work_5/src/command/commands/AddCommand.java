package command.commands;

import MyClass.*;
import command.Command;
import java.util.Scanner;

public class AddCommand implements Command {
    private final LabWorkCollection labWorkCollection;
    private static final Scanner scanner = new Scanner(System.in);
    private final LabWork labWork;
    public AddCommand(LabWorkCollection labWorkCollection, LabWork labWork) {
        this.labWorkCollection = labWorkCollection;
        this.labWork = labWork;
    }

    @Override
    public void execute() {
        labWorkCollection.addLabWork(labWork.getName(), labWork.getCoordinates(), labWork.getMinimalPoint(),
                labWork.getMaximumPoint(), labWork.getPersonalQualitiesMaximum(), labWork.getDifficulty(),
                labWork.getDiscipline());

        System.out.println("The lab work has been added to the collection.");
    }
}


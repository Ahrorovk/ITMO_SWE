package command.commands;

import command.Command;
import MyClass.*;

public class AddIfMaxCommand implements Command {
    private final LabWorkCollection labWorkCollection;
    private final LabWork labWork;

    public AddIfMaxCommand(LabWorkCollection labWorkCollection, LabWork labWork) {
        this.labWorkCollection = labWorkCollection;
        this.labWork = labWork;
    }

    @Override
    public void execute() {
        if (labWork.getMaximumPoint() > labWorkCollection.getCollection().stream()
                .mapToInt(LabWork::getMaximumPoint)
                .max()
                .orElse(Integer.MIN_VALUE)) {
            labWorkCollection.addLabWork(labWork.getName(), labWork.getCoordinates(), labWork.getMinimalPoint(), labWork.getMaximumPoint(), labWork.getPersonalQualitiesMaximum(), labWork.getDifficulty(), labWork.getDiscipline());
        }
    }
}

package command.commands;

import command.Command;
import manager.*;
import model.LabWork;

public class AddIfMaxCommand implements Command {
    private final CollectionManager collectionManager;
    private final LabWork labWork;

    public AddIfMaxCommand(CollectionManager collectionManager, LabWork labWork) {
        this.collectionManager = collectionManager;
        this.labWork = labWork;
    }

    @Override
    public void execute() {
        if (labWork.getMaximumPoint() > collectionManager.getCollection().stream()
                .mapToInt(LabWork::getMaximumPoint)
                .max()
                .orElse(Integer.MIN_VALUE)) {
            collectionManager.addLabWork(labWork.getName(), labWork.getCoordinates(), labWork.getMinimalPoint(), labWork.getMaximumPoint(), labWork.getPersonalQualitiesMaximum(), labWork.getDifficulty(), labWork.getDiscipline());
        }
    }
}

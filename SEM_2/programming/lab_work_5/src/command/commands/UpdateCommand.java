package command.commands;

import MyClass.*;
import command.Command;

public class UpdateCommand implements Command {
    private final LabWorkCollection labWorkCollection;
    private final Long id;
    private final LabWork updatedLabWork;

    public UpdateCommand(LabWorkCollection labWorkCollection, Long id, LabWork updatedLabWork) {
        this.labWorkCollection = labWorkCollection;
        this.id = id;
        this.updatedLabWork = updatedLabWork;
    }

    @Override
    public void execute() {
        LabWork labWorkToUpdate = labWorkCollection.getCollection().stream()
                .filter(l -> l.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("The element with this ID was not found"));
        // Обновляем поля элемента
        labWorkToUpdate.setName(updatedLabWork.getName());
        labWorkToUpdate.setCoordinates(updatedLabWork.getCoordinates());
        labWorkToUpdate.setMinimalPoint(updatedLabWork.getMinimalPoint());
        labWorkToUpdate.setMaximumPoint(updatedLabWork.getMaximumPoint());
        labWorkToUpdate.setPersonalQualitiesMaximum(updatedLabWork.getPersonalQualitiesMaximum());
        labWorkToUpdate.setDifficulty(updatedLabWork.getDifficulty());
        labWorkToUpdate.setDiscipline(updatedLabWork.getDiscipline());
    }
}

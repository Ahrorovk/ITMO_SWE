package server.apk.command.commands;

import server.apk.command.Command;
import server.apk.manager.CollectionManager;
import common.apk.model.LabWork;

public class UpdateCommand implements Command {
    private final CollectionManager collectionManager;
    private final Long id;
    private final LabWork updatedLabWork;

    public UpdateCommand(CollectionManager collectionManager, Long id, LabWork updatedLabWork) {
        this.collectionManager = collectionManager;
        this.id = id;
        this.updatedLabWork = updatedLabWork;
    }

    @Override
    public void execute() {
        LabWork labWorkToUpdate = collectionManager.getCollection().stream()
                .filter(l -> l.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("The element with this ID was not found"));
        labWorkToUpdate.setName(updatedLabWork.getName());
        labWorkToUpdate.setCoordinates(updatedLabWork.getCoordinates());
        labWorkToUpdate.setMinimalPoint(updatedLabWork.getMinimalPoint());
        labWorkToUpdate.setMaximumPoint(updatedLabWork.getMaximumPoint());
        labWorkToUpdate.setPersonalQualitiesMaximum(updatedLabWork.getPersonalQualitiesMaximum());
        labWorkToUpdate.setDifficulty(updatedLabWork.getDifficulty());
        labWorkToUpdate.setDiscipline(updatedLabWork.getDiscipline());
    }
}

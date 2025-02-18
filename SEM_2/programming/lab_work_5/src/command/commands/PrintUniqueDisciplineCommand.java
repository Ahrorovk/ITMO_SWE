package command.commands;

import manager.*;
import command.Command;
import model.Discipline;
import model.LabWork;

import java.util.HashSet;
import java.util.Set;

public class PrintUniqueDisciplineCommand implements Command {
    private final CollectionManager collectionManager;

    public PrintUniqueDisciplineCommand(CollectionManager collectionManager) {
        this.collectionManager = collectionManager;
    }

    @Override
    public void execute() {
        Set<Discipline> uniqueDisciplines = new HashSet<>();
        for (LabWork labWork : collectionManager.getCollection()) {
            uniqueDisciplines.add(labWork.getDiscipline());
        }
        if (uniqueDisciplines.isEmpty()) {
            System.out.println("No unique disciplines found.");
        } else {
            for (Discipline discipline : uniqueDisciplines) {
                System.out.println(discipline);
            }
        }
    }
}


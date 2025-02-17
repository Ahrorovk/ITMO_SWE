package command.commands;

import MyClass.*;
import command.Command;

import java.util.HashSet;
import java.util.Set;

public class PrintUniqueDisciplineCommand implements Command {
    private final LabWorkCollection labWorkCollection;

    public PrintUniqueDisciplineCommand(LabWorkCollection labWorkCollection) {
        this.labWorkCollection = labWorkCollection;
    }

    @Override
    public void execute() {
        Set<Discipline> uniqueDisciplines = new HashSet<>();
        for (LabWork labWork : labWorkCollection.getCollection()) {
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


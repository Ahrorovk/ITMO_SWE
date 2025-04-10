package server.apk.commands;

import common.apk.model.LabWork;
import server.apk.Command;

public class AddCommand extends Command {
    private final LabWork labWork;

    public AddCommand(LabWork labWork) {
        super("add", "Add a new lab work to the collection");
        this.labWork = labWork;
    }

    @Override
    public Object execute() {
        return null;
    }

    public LabWork getLabWork() {
        return labWork;
    }
} 
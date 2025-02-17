package command.commands;

import MyClass.*;
import command.Command;

import java.io.FileOutputStream;
import java.io.ObjectOutputStream;

public class SaveCommand implements Command {
    private final LabWorkCollection labWorkCollection;
    private final String fileName;
    public SaveCommand(LabWorkCollection labWorkCollection,String fileName) {
        this.labWorkCollection = labWorkCollection;
        this.fileName = fileName;
    }

    @Override
    public void execute() {
        try {
            ObjectOutputStream outputStream = new ObjectOutputStream(new FileOutputStream(fileName));
            outputStream.writeObject(labWorkCollection.getCollection());
            System.out.println("The collection is saved to a file");
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
}

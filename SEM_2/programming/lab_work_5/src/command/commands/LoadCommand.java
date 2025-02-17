package command.commands;

import command.Command;
import MyClass.*;

import java.io.FileInputStream;
import java.io.ObjectInputStream;
import java.util.ArrayDeque;

public class LoadCommand implements Command {

    public final LabWorkCollection labWorkCollection;
    public final String fileName;
    public LoadCommand(LabWorkCollection labWorkCollection,String fileName) {
        this.labWorkCollection = labWorkCollection;
        this.fileName = fileName;
    }

    @Override
    public void execute() {
            try {
                ObjectInputStream inputStream = new ObjectInputStream(new FileInputStream(fileName));
                labWorkCollection.setCollection((ArrayDeque<LabWork>) inputStream.readObject());
                System.out.println("File loaded!");
            }catch (Exception e){
                System.out.println("File not founded! "+e.getMessage());
            }
    }
}

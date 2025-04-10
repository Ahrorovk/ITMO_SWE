package server.apk.command.commands;

import server.apk.command.Command;
import server.apk.manager.CollectionManager;
import common.apk.model.LabWork;

import java.io.FileInputStream;
import java.io.ObjectInputStream;
import java.util.ArrayDeque;

public class LoadCommand implements Command {

    public final CollectionManager collectionManager;
    public final String fileName;
    public LoadCommand(CollectionManager collectionManager, String fileName) {
        this.collectionManager = collectionManager;
        this.fileName = fileName;
    }

    @Override
    public void execute() {
            try {
                ObjectInputStream inputStream = new ObjectInputStream(new FileInputStream(fileName));
                collectionManager.setCollection((ArrayDeque<LabWork>) inputStream.readObject());
                System.out.println("File loaded!");
            }catch (Exception e){
                System.out.println("File not founded! "+e.getMessage());
            }
    }
}

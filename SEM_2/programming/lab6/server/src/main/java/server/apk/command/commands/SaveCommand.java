package server.apk.command.commands;

import server.apk.command.Command;
import server.apk.manager.CollectionManager;

import java.io.FileOutputStream;
import java.io.ObjectOutputStream;

public class SaveCommand implements Command {
    private final CollectionManager collectionManager;
    private final String fileName;
    public SaveCommand(CollectionManager collectionManager, String fileName) {
        this.collectionManager = collectionManager;
        this.fileName = fileName;
    }

    @Override
    public void execute() {
        try {
            ObjectOutputStream outputStream = new ObjectOutputStream(new FileOutputStream(fileName));
            outputStream.writeObject(collectionManager.getCollection());
            System.out.println("The collection is saved to a file");
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
}

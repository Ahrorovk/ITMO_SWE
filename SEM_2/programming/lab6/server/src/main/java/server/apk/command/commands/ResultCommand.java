package server.apk.command.commands;

import server.apk.command.Command;
import server.apk.manager.CollectionManager;

public abstract class ResultCommand<T> implements Command {
    protected final CollectionManager collectionManager;
    protected T result;

    protected ResultCommand(CollectionManager collectionManager) {
        this.collectionManager = collectionManager;
    }

    public T getResult() {
        return result;
    }
} 
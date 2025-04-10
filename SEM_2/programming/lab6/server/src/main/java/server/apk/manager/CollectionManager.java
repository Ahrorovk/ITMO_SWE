package server.apk.manager;

import common.apk.model.LabWork;

import java.time.LocalDate;
import java.util.ArrayDeque;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

public class CollectionManager {
    private ArrayDeque<LabWork> collection = new ArrayDeque<>();
    private LocalDate creationDate;
    private static AtomicLong idGenerator;
    private String filePath;

    public CollectionManager(String filePath) {
        this.filePath = filePath;
        this.creationDate = LocalDate.now();
        this.idGenerator = new AtomicLong(1);
    }

    public void addLabWork(LabWork labWork) {
        labWork.setId((int) idGenerator.getAndIncrement());
        collection.add(labWork);
    }

    public void setCollection(ArrayDeque<LabWork> collection) {
        this.collection = collection;
    }

    public ArrayDeque<LabWork> getCollection() {
        return collection.stream()
                .sorted((a, b) -> a.getName().compareTo(b.getName()))
                .collect(Collectors.toCollection(ArrayDeque::new));
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public void clear() {
        collection.clear();
    }

    public boolean removeById(long id) {
        return collection.removeIf(labWork -> labWork.getId() == id);
    }

    public LabWork getById(long id) {
        return collection.stream()
                .filter(labWork -> labWork.getId() == id)
                .findFirst()
                .orElse(null);
    }

    public void updateLabWork(LabWork labWork) {
        collection.removeIf(l -> l.getId() == labWork.getId());
        collection.add(labWork);
    }
}
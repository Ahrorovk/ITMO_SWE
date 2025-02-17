package MyClass;

import java.time.LocalDate;
import java.util.ArrayDeque;
import java.util.concurrent.atomic.AtomicLong;

public class LabWorkCollection {
    private ArrayDeque<LabWork> collection = new ArrayDeque<>();
    private LocalDate creationDate;
    private static AtomicLong idGenerator; // Генератор уникальных ID
    public void addLabWork(String name, Coordinates coordinates, double minimalPoint, Integer maximumPoint, int personalQualitiesMaximum, Difficulty difficulty, Discipline discipline) {
        idGenerator = new AtomicLong(collection.size()+1);
        LabWork labWork = new LabWork(idGenerator.getAndIncrement(), name, coordinates, minimalPoint, maximumPoint, personalQualitiesMaximum, difficulty, discipline);
        if(idGenerator.intValue()==1){
            this.creationDate = LocalDate.now();
        }
        collection.add(labWork);
    }

    public void setCollection(ArrayDeque<LabWork> collection) {
        this.collection = collection;
    }

    public ArrayDeque<LabWork> getCollection() {
        return collection;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }
}
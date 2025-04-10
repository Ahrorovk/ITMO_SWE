package server.apk.repositories;

import com.google.common.collect.Iterables;
import common.apk.model.Discipline;
import common.apk.model.LabWork;
import common.apk.utility.LabWorkComparator;
import server.apk.ServerApp;
import server.apk.manager.DumpManager;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

public class LabWorkRepository {
  private Queue<LabWork> collection = new PriorityQueue<>();
  private LocalDateTime lastInitTime;
  private LocalDateTime lastSaveTime;
  private final DumpManager dumpManager;

  public LabWorkRepository(DumpManager dumpManager) {
    this.lastInitTime = null;
    this.lastSaveTime = null;
    this.dumpManager = dumpManager;

    load();
    updateDisciplines();
  }

  public boolean validateAll() {
    for(var labWork : new ArrayList<>(get())) {
      if (!labWork.validate()) {
        ServerApp.logger.warn("\n" + "Label of the group with id" + labWork.getId() + " has invalid data.");
        return false;
      }
      if (labWork.getDifficulty() != null) {
        if(!labWork.getDiscipline().validate()) {
          ServerApp.logger.warn("\n" + "Label of the group with id=" + labWork.getId() + " has invalid data.");
          return false;
        }
      }
    };
    ServerApp.logger.info("! Loaded groups are valid.");
    return true;
  }

  public Queue<LabWork> get() {
    return collection;
  }
  public LocalDateTime getLastInitTime() {
    return lastInitTime;
  }

  public LocalDateTime getLastSaveTime() {
    return lastSaveTime;
  }
  public String type() {
    return collection.getClass().getName();
  }
  public int size() {
    return collection.size();
  }

  public LabWork first() {
    if (collection.isEmpty()) return null;
    return sorted().get(0);
  }

  public LabWork last() {
    if (collection.isEmpty()) return null;
    return Iterables.getLast(sorted());
  }

  public List<LabWork> sorted() {
    return new ArrayList<>(collection)
      .stream()
      .sorted(new LabWorkComparator())
      .collect(Collectors.toList());
  }

  public LabWork getById(int id) {
    for (LabWork element : collection) {
      if (element.getId() == id) return element;
    }
    return null;
  }
  public boolean checkExist(int id) {
    return getById(id) != null;
  }
  public LabWork getByValue(LabWork elementToFind) {
    for (LabWork element : collection) {
      if (element.equals(elementToFind)) return element;
    }
    return null;
  }

  public int add(LabWork element) {
    var maxId = collection.stream().filter(Objects::nonNull)
      .map(LabWork::getId)
      .mapToInt(Integer::intValue).max().orElse(0);
    var newId = maxId + 1;

    var nextOrgId = collection.stream()
      .map(LabWork::getDiscipline)
      .filter(Objects::nonNull)
      .map(Discipline::getId)
      .mapToInt(Integer::intValue).max().orElse(0) + 1;

    if (element.getDiscipline() != null) {
      element.getDiscipline().setId(nextOrgId);
    }
    collection.add(element.copy(newId));
    return newId;
  }

  public void remove(int id) {
    collection.removeIf(labWork -> labWork.getId() == id);
  }
  public void clear() {
    collection.clear();
  }

  public void save() {
    dumpManager.writeCollection(collection);
    lastSaveTime = LocalDateTime.now();
  }

  private void load() {
    collection = (PriorityQueue<LabWork>) dumpManager.readCollection();
    lastInitTime = LocalDateTime.now();
  }

  private void updateDisciplines() {
    collection.stream()
      .map(LabWork::getDiscipline)
      .filter(Objects::nonNull)
      .forEach(discipline -> {
        Discipline.put(discipline.getId(), discipline);
      });
  }

  @Override
  public String toString() {
    if (collection.isEmpty()) return "Collection is empty!";

    var info = new StringBuilder();
    for (LabWork labWork : collection) {
      info.append(labWork);
      info.append("\n\n");
    }
    return info.substring(0, info.length() - 2);
  }
}

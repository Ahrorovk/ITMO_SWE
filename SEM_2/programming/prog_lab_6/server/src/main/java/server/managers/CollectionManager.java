package server.managers;

import common.model.LabWork;

import java.time.LocalDateTime;
import java.util.*;

public class CollectionManager {
  private long currentId = 1;
  private Map<Long, LabWork> labWorks = new HashMap<>();
  private ArrayDeque<String> logStack = new ArrayDeque<String>();

  private LinkedList<LabWork> collection = new LinkedList<LabWork>();
  private LinkedList<LabWork> collectionDie = new LinkedList<LabWork>();
  private LocalDateTime lastInitTime;
  private LocalDateTime lastSaveTime;
  private final DumpManager dumpManager;
  public boolean isAscendingSort;

  public CollectionManager(DumpManager dumpManager) {
    this.lastInitTime = null;
    this.lastSaveTime = null;
    this.dumpManager = dumpManager;
  }

  public LinkedList<LabWork> getCollection() {
    return collection;
  }
  public LocalDateTime getLastInitTime() {
    return lastInitTime;
  }

  public LocalDateTime getLastSaveTime() {
    return lastSaveTime;
  }

  public LabWork byId(Long id) {
    return labWorks.get(id);
  }

  public boolean isСontain(LabWork e) {
    return e == null || byId(e.getId()) != null;
  }

  public long getFreeId() {
    while (byId(currentId) != null || byDieId(currentId) != null)
      if (++currentId < 0)
        currentId = 1;
    return currentId;
  }

  public LabWork byDieId(long id) {
    try {
      for (var e : collectionDie) if (e.getId() == id) return e;
      return null;
    } catch (IndexOutOfBoundsException e) {
      return null;
    }
  }

  public boolean add(long id) {
    LabWork ret = byDieId(id);
    if (ret == null) return false;
    labWorks.put(ret.getId(), ret);
    collection.add(ret);
    collectionDie.remove(ret);
    update();
    return true;
  }

  public boolean add(LabWork d) {
    if (d == null) return false;
    labWorks.put(d.getId(), d);
    collection.add(d);
    update();
    return true;
  }
  public boolean swap(long id, long repId) {
    var e = byId(id);
    var re = byId(repId);
    if (e == null) return false;
    if (re == null) return false;
    var ind = collection.indexOf(e);
    var rind = collection.indexOf(re);
    if (ind < 0) return false;
    if (rind < 0) return false;

    e.setId(repId);
    re.setId(id);

    labWorks.put(e.getId(), e);
    labWorks.put(re.getId(), re);

    update();
    return true;
  }

  public boolean remove(long id) {
    LabWork ret = byId(id);
    if (ret == null) return false;
    var ind = collection.indexOf(ret);
    if (ind < 0) return false;
    collection.remove(ret);
    collectionDie.add(ret);
    update();
    return true;
  }

  public int undo(int count) {
    var tmpLog = new LinkedList<String>();
    try {
      for (var i = 0; i < count; i++) {
        if (logStack.size() == 0) return i;
        for (var j = logStack.size() - 1; j >= 0; j--) {
          var s = logStack.pop();
          if (s.equals("+")) break;
          long n = -1;
          long n2 = -1;
          try {
            n = Long.parseLong((s + " ").split(" ")[1]);
          } catch (NumberFormatException | ArrayIndexOutOfBoundsException e) {
          }
          try {
            n2 = Long.parseLong((s + " ").split(" ")[2]);
          } catch (NumberFormatException | ArrayIndexOutOfBoundsException e) {
          }
          switch ((s + " ").split(" ")[0]) {
            case "add":
              if (!remove(n)) return i;
              tmpLog.push("remove " + n);
              break;
            case "remove":
              if (!add(n)) return i;
              tmpLog.push("add " + n);
              break;
            case "reorder":
              tmpLog.push("reorder");
              isAscendingSort ^= true;
              update();
              break;
            case "swap":
              if (!swap(n, n2)) return i;
              tmpLog.push("swap " + n + " " + n2);
              break;
            default:
              System.err.println("Undef command: " + s);
              System.out.println("Undef command: " + s);
              System.exit(1);
              return i;
          }
        }
      }
    } finally {
      addLog("", true);
      while (tmpLog.size() > 0)
        addLog(tmpLog.removeLast(), false);
    }
    return count;
  }

  public void deb2(long t) {
    System.out.println("    ===" + t + "===");
    System.out.println(this);
    for (var ee : logStack)
      System.out.println("    " + t + "_" + ee);
    System.out.println("    ======");

  }

  /**
   * Создает транзакцию или добавляет операцию в транзакцию
   */
  public void addLog(String cmd, boolean isFirst) {
    if (isFirst)
      logStack.push("+");
    if (!cmd.equals(""))
      logStack.push(cmd);
  }

  public boolean lastAddLabWork(LabWork e) {
    if (isСontain(e)) return false;
    labWorks.put(e.getId(), e);
    collection.add(e);
    return true;
  }

  public void update() {
    Collections.sort(collection);
    if (isAscendingSort) Collections.reverse(collection);
  }

  public void saveCollection() {
    dumpManager.writeCollection(collection, collectionDie, logStack);
    lastSaveTime = LocalDateTime.now();
  }

  public boolean loadCollection() {
    labWorks.clear();
    collection.clear();
    collectionDie.clear();
    logStack.clear();
    dumpManager.readCollection(collection, collectionDie, logStack);
    lastInitTime = LocalDateTime.now();
    for (var e : collection)
      if (byId(e.getId()) != null) {
        labWorks.clear();
        collection.clear();
        collectionDie.clear();
        logStack.clear();

        return false;
      } else {
        if (e.getId() > currentId) currentId = e.getId();
        labWorks.put(e.getId(), e);
      }
    for (var e : collectionDie)
      if (byId(e.getId()) != null) {
        labWorks.clear();
        collection.clear();
        collectionDie.clear();
        logStack.clear();
        return false;
      } else {
        if (e.getId() > currentId) currentId = e.getId();
        labWorks.put(e.getId(), e);
      }
    update();
    return true;
  }

  @Override
  public String toString() {
    if (collection.isEmpty()) return "Collection is empty!";

    StringBuilder info = new StringBuilder();
    for (LabWork LabWork : collection) {
      info.append(LabWork + "\n\n");
    }
    return info.toString().trim();
  }
}

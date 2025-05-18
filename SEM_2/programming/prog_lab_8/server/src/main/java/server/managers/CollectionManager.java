package server.managers;

import common.model.LabWork;
import server.utility.User;

import javax.swing.text.LabelView;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class CollectionManager {
  private long currentId = 1;
  private Map<Long, LabWork> labWorks = new HashMap<>();
  private ArrayDeque<String> logStack = new ArrayDeque<String>();
  private ConcurrentHashMap<LabWork, Long> userIdMap = new ConcurrentHashMap<>();

  private LinkedList<LabWork> collection = new LinkedList<LabWork>();
  private LinkedList<LabWork> collectionDie = new LinkedList<LabWork>();
  private LocalDateTime lastInitTime;
  private LocalDateTime lastSaveTime;
  private final DumpManager dumpManager;
  private final UserManager userManager;
  public boolean isAscendingSort;

  public CollectionManager(DumpManager dumpManager, UserManager userManager) {
    this.userManager = userManager;
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
    for (var e : collection.toArray()) if (((LabWork) e).getId() == id) return (LabWork) e;
    return null;
  }


  public boolean isСontain(LabWork e) {
    return e == null || byId(e.getId()) != null;
  }


  public boolean add(LabWork d, User u) {
    if (d == null || u == null) return false;
    if (!dumpManager.insertLabWork(d, u.getID())) return false;
    collection.addLast(d);
    userIdMap.put(d, u.getID());
    update();
    return true;
  }

  public boolean update(LabWork d, User u) {
    if (d == null || u == null) return false;
    var oldD = byId(d.getId());
    if (oldD == null) return false;
    if (!(userManager.canEval(u, "REMOVEALL") || userIdMap.get(oldD) == u.getID())) return false;
    if (!dumpManager.updateLabWork(d)) return false;
    collection.remove(oldD);
    collection.addLast(d);
    userIdMap.put(d, u.getID());
    update();
    return true;
  }

  public boolean remove(long id, User u) {
    if (u == null) return false;
    var d = byId(id);
    if (d == null) return false;
    if (!(userManager.canEval(u, "REMOVEALL") || userIdMap.get(d) == u.getID())) return false;
    if (!dumpManager.removeLabWork(id)) return false;
    collection.remove(d);
    update();
    return true;
  }

  public void update() {
    LabWork[] a = collection.toArray(new LabWork[0]);
    Arrays.sort(a);
    collection.clear();
    for (LabWork card : a) {
      if (!isAscendingSort)
        collection.addLast(card);
      else
        collection.addFirst(card);
    }
  }

  public void init() {
    collection.clear();
    userIdMap.clear();
    for (var e : dumpManager.selectLabWorks()) {
      collection.addLast(e.labWork);
      userIdMap.put(e.labWork, e.userID);
    }
  }
  public void selectByID(Integer userId) {
    collection.clear();
    userIdMap.clear();
    for (var e : dumpManager.selectLabWorksByUserId(userId)) {
      collection.addLast(e.labWork);
      userIdMap.put(e.labWork, e.userID);
    }
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

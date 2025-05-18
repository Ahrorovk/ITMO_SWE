package server.managers;

import server.utility.User;

import java.security.MessageDigest;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedDeque;

public class UserManager {
  private final DumpManager dumpManager;
  private ConcurrentLinkedDeque<User> users = new ConcurrentLinkedDeque<User>();
  private final Map<String, User> tokenToUser = new ConcurrentHashMap<>();

  public UserManager(DumpManager dumpManager) {
    this.dumpManager = dumpManager;
  }

  public boolean init() {
    users.clear();
    for (var e : dumpManager.selectUsers())
      users.addLast(e);
    return true;
  }

  public User getUser(String login) {
    for (var e : users)
      if (e.getLogin().equals(login))
        return e;
    return null;
  }

  public User[] getUsers() {
    return users.toArray(new User[]{});
  }

  public boolean canEval(User u, String func) {
    if (func.equals("DEFAULT")) return true;
    for (var f : dumpManager.selectF(u.getRole()))
      if (f.equals(func))
        return true;
    return false;
  }

  public String addUser(String login, String password) {
    try {
      MessageDigest md = null;
      md = MessageDigest.getInstance("MD5");
      md.update(password.getBytes());
      byte[] digest = md.digest();
      String passHash = java.util.HexFormat.of().formatHex(digest);
      var u = new User(0, login, passHash, "defrole");
      if (Objects.equals(dumpManager.insertUser(u), ""))
        users.addLast(u);
      else
        return dumpManager.insertUser(u);
    } catch (Exception e) {
      return e.getMessage();
    }
    return "";
  }

  public boolean isValid(String token) {
    return tokenToUser.containsKey(token);
  }

  public boolean addFunctionality(String role, String funcs) {
    return dumpManager.insertF(role, funcs.split(","));
  }

  public boolean removeFunctionality(String role, String funcs) {
    return dumpManager.removeF(role, funcs.split(","));
  }

  public String getFunctionality(String role) {
    return String.join(",", dumpManager.selectF(role));
  }

  public User getUserByToken(String token) {
    return dumpManager.getUserByToken(token);
  }

  public boolean deleteToken(String token) {
    return dumpManager.deleteToken(token);
  }

  public boolean insertToken(User user, String token) {
    tokenToUser.put(token, user);
    return dumpManager.insertToken(user, token);
  }

  public boolean setRole(User u, String role) {
    u.setRole(role);
    return dumpManager.updateUser(u);
  }
}

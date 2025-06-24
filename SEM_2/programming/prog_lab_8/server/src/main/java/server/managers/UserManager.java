package server.managers;


import server.utility.User;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class UserManager {
  private final DumpManager dumpManager;
  private final ConcurrentMap<String, User> tokenToUser = new ConcurrentHashMap<>();

  public UserManager(DumpManager dumpManager) {
    this.dumpManager = dumpManager;
  }

  /** Ничего не кэшируем, работаем напрямую через БД */
  public boolean init() {
    return true;
  }

  /** Найти пользователя по логину */
  public User getUserByLogin(String login) {
    return dumpManager.listUsers().stream()
      .filter(u -> u.getLogin().equals(login))
      .findFirst()
      .orElse(null);
  }

  /** Вернуть всех пользователей */
  public List<User> getUsers() {
    return dumpManager.listUsers();
  }

  /** Проверить, разрешена ли функциональность func для роли */
  public boolean canEval(User u, String func) {
    if ("DEFAULT".equals(func)) return true;
    return dumpManager.selectF(u.getRole()).contains(func);
  }

  /** Добавить нового пользователя с ролью */
  public boolean addUser(String login, String password, String role) {
    String hash = md5(password);
    long id = dumpManager.createUser(login, hash, role);
    return id > 0;
  }

  /** Проверить валидность токена */
  public boolean isValid(String token) {
    if (tokenToUser.containsKey(token)) return true;
    User u = dumpManager.findUserByToken(token);
    if (u != null) {
      tokenToUser.put(token, u);
      return true;
    }
    return false;
  }

  /** Получить пользователя по токену */
  public User getUserByToken(String token) {
    return tokenToUser.computeIfAbsent(token, dumpManager::findUserByToken);
  }

  /** Сохранить токен в БД и кэше */
  public boolean insertToken(User user, String token) {
    tokenToUser.put(token, user);
    return dumpManager.insertToken(user, token);
  }

  /** Удалить токен из БД и кэша */
  public boolean deleteToken(String token) {
    tokenToUser.remove(token);
    return dumpManager.deleteToken(token);
  }

  /** Изменить роль пользователя */
  public boolean setRole(User u, String role) {
    u.setRole(role);
    return dumpManager.updateUser(u);
  }

  /** Получить список функциональностей (CSV) */
  public String getFunctionality(String role) {
    return String.join(",", dumpManager.selectF(role));
  }

  /** Добавить новые функциональности для роли */
  public boolean addFunctionality(String role, String csvFuncs) {
    return dumpManager.insertF(role, csvFuncs.split(","));
  }

  /** Убрать функциональности у роли */
  public boolean removeFunctionality(String role, String csvFuncs) {
    return dumpManager.removeF(role, csvFuncs.split(","));
  }

  /** MD5‐хеширование пароля */
  private static String md5(String input) {
    try {
      MessageDigest md = MessageDigest.getInstance("MD5");
      byte[] digest = md.digest(input.getBytes(StandardCharsets.UTF_8));
      return HexFormat.of().formatHex(digest);
    } catch (NoSuchAlgorithmException e) {
      throw new RuntimeException("MD5 algorithm not available", e);
    }
  }
}

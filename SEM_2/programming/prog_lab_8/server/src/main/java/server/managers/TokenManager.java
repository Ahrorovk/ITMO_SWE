package server.managers;

import server.utility.User;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.UUID;
public class TokenManager {
  private final Map<String, User> tokenToUser = new ConcurrentHashMap<>();

  public String generateToken(User user) {
    String token = UUID.randomUUID().toString();
    tokenToUser.put(token, user);
    return token;
  }

  public User getUserByToken(String token) {
    return tokenToUser.get(token);
  }

  public boolean isValid(String token) {
    return tokenToUser.containsKey(token);
  }

  public void revoke(String token) {
    tokenToUser.remove(token);
  }
}

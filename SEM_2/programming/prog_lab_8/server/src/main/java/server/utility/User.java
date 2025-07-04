package server.utility;

public class User {
  private long id;
  private final String login;
  private final String password;
  private String role;

  public User(long id, String login, String password, String role) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.role = role;

  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getLogin() {
    return login;
  }
  public void setLogin(String login) {
    this.login = login;
  }

  public String getPassword() {
    return password;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }
}

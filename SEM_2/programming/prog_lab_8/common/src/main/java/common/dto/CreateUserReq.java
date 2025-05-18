package common.dto;

public class CreateUserReq {
  private String login;
  private String password;

  public CreateUserReq() {} // ОБЯЗАТЕЛЬНО

  public String getLogin() { return login; }
  public void setLogin(String login) { this.login = login; }

  public String getPassword() { return password; }
  public void setPassword(String password) { this.password = password; }
}

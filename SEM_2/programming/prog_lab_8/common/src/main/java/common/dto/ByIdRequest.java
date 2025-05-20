package common.dto;

public class ByIdRequest {
  private Integer id;

  public ByIdRequest(Integer id) {
    this.id = id;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }
}

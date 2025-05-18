package common.dto;

import common.model.LabWork;

public class UpdateLabWorkRequest {
    private Integer id;
    private LabWork labWork;
    // getters/setters


  public Integer getId() {
    return id;
  }
  public void setId(Integer id) {
    this.id = id;
  }
  public LabWork getLabWork() {
    return labWork;
  }
  public void setLabWork(LabWork labWork) {
    this.labWork = labWork;
  }
}

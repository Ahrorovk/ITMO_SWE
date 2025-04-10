package common.apk.utility;

import common.apk.model.LabWork;

import java.util.Comparator;

public class LabWorkComparator implements Comparator<LabWork> {
  public int compare(LabWork a, LabWork b){
    return a.getName().compareTo(b.getName());
  }
}

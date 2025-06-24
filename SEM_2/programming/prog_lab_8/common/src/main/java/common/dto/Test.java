package common.dto;

import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

public class Test {
  public static void main(String[] args) {
    Map<Integer,Integer> map = new TreeMap<>();
    map.put(5,2);
    map.put(4,1);
    map.put(2,3);
    map.put(3,4);
    map.put(4,2);
    map.put(1,5);
    map.remove(2);
    System.out.println(map);
  }
}

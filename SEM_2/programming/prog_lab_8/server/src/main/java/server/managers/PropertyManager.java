package server.managers;


import server.utility.Console;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;
import java.util.Scanner;

/**
 */
public class PropertyManager {
  private final String fileName;
  private final Console console;
  private Properties properties = new Properties();

  public PropertyManager(String fileName, Console console) {
    this.fileName = fileName;
    this.console = console;
  }

  /**
   * Считывает конфигурацию из файл.
   */
  public boolean readConf() {
    if (fileName != null && !fileName.isEmpty()) {
      try (var fileReader = new Scanner(new File(fileName))) {
        var s = new StringBuilder("");
        while (fileReader.hasNextLine()) {
          s.append(fileReader.nextLine());
          s.append("\n");
        }
        properties.load(new ByteArrayInputStream(s.toString().getBytes()));
        return true;
      } catch (FileNotFoundException exception) {
        console.printError("Файл конфигурации не найден!");
      } catch (IOException e) {
        console.printError("Ошибка чтения");
      } catch (IllegalStateException exception) {
        console.printError("Непредвиденная ошибка!");
      }
    } else
      console.printError("Файл конфигурации '"+fileName+"' не найден!");
    return false;
  }

  public String getProperty(String key, String defaultValue) {
    return properties.getProperty(key, defaultValue);
  }

  public int getProperty(String key, int defaultValue) {
    try {
      return Integer.parseInt(properties.getProperty(key, ""));
    } catch (NumberFormatException e) {
      return defaultValue;
    }
  }
}

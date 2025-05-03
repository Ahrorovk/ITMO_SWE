package server.managers;

import com.opencsv.CSVReader;
import com.opencsv.CSVWriter;
import common.model.LabWork;
import server.utility.Console;

import java.io.*;
import java.util.*;

public class DumpManager {
  private final String fileName;
  private final Console console;
  private final Properties properties = new Properties();

  public DumpManager(String fileName, Console console) {
    this.fileName = fileName;
    this.console = console;
  }

  private String collection2CSV(Collection<LabWork> collection) {
    try {
      StringWriter sw = new StringWriter();
      CSVWriter csvWriter = new CSVWriter(sw);
      for (var e : collection) {
        csvWriter.writeNext(LabWork.toArray(e));
      }
      String csv = String.valueOf(sw);
      return csv;
    } catch (Exception e) {
      console.printError("Serialization error " + e.getMessage());
      return null;
    }
  }

  public void writeCollection(Collection<LabWork> collection, Collection<LabWork> collectionDie, ArrayDeque<String> logStack) {
    OutputStreamWriter writer = null, writer2 = null, writer3 = null;
    try {
      var csv = collection2CSV(collection);
      if (csv == null) return;
      writer = new OutputStreamWriter(new FileOutputStream(fileName));
      var csv2 = collection2CSV(collectionDie);
      if (csv2 == null) return;
      writer2 = new OutputStreamWriter(new FileOutputStream(fileName + "_die.txt"));
      writer3 = new OutputStreamWriter(new FileOutputStream(fileName + "_log.txt"));
      try {
        writer.write(csv);
        writer.flush();
        writer2.write(csv2);
        writer2.flush();
        for (var line : logStack)
          writer3.write(line + "\r\n");
        writer3.flush();
        console.println("Collection successfully loaded!");
      } catch (IOException e) {
        console.printError("Unexpected saving error");
      }
    } catch (FileNotFoundException | NullPointerException e) {
      console.printError("File not found");
    } finally {
      try {
        writer.close();
        writer2.close();
        writer3.close();
      } catch (IOException e) {
        console.printError("Exit file error");
      }
    }
  }

  private LinkedList<LabWork> CSV2collection(String s) {
    try {
      StringReader sr = new StringReader(s);
      CSVReader csvReader = new CSVReader(sr);
      LinkedList<LabWork> ds = new LinkedList<LabWork>();
      String[] record = null;
      while ((record = csvReader.readNext()) != null) {
        LabWork d = LabWork.fromArray(record);
          ds.add(d);
      }
      csvReader.close();
      return ds;
    } catch (Exception e) {
      console.printError("Deserialization error");
      return null;
    }
  }

  public void readCollection(Collection<LabWork> collection, Collection<LabWork> collectionDie, ArrayDeque<String> logStack) {
    try {
      if (!(new File(fileName + "_cnf.properties")).exists()) {
        var writer4 = new OutputStreamWriter(new FileOutputStream(fileName + "_cnf.properties"));
        writer4.write("PORT:7845\r\n");
        writer4.flush();
        writer4.close();
      }
    } catch (IOException e) {
      console.printError("Unexpected saving error");
    }
    if (fileName != null && !fileName.isEmpty()) {
      try (var fileReader = new Scanner(new File(fileName));
           var fileReader2 = new Scanner(new File(fileName + "_die.txt"));
           var fileReader3 = new Scanner(new File(fileName + "_log.txt"));
           var fileReader4 = new Scanner(new File(fileName + "_cnf.properties"))) {
        var s = new StringBuilder();
        while (fileReader.hasNextLine()) {
          s.append(fileReader.nextLine());
          s.append("\n");
        }
        var s2 = new StringBuilder("");
        while (fileReader2.hasNextLine()) {
          s2.append(fileReader2.nextLine());
          s2.append("\n");
        }
        var tmpStack = new ArrayDeque<String>();
        while (fileReader3.hasNextLine()) {
          tmpStack.push(fileReader3.nextLine());
        }
        var s3 = new StringBuilder("");
        while (fileReader4.hasNextLine()) {
          s3.append(fileReader4.nextLine());
          s3.append("\n");
        }
        properties.load(new ByteArrayInputStream(s3.toString().getBytes()));
        //System.out.println(properties.getProperty("PORT"));
        for (var e : tmpStack)
          logStack.push(e);
        collection.clear();
        for (var e : Objects.requireNonNull(CSV2collection(s.toString())))
          collection.add(e);
        collectionDie.clear();
        for (var e : CSV2collection(s2.toString()))
          collectionDie.add(e);
        if (collection != null && collectionDie != null) {
          console.println("Collections successfully loaded!");
          return;
        } else
          console.printError("The required collection was not found in the download file.!");
      } catch (FileNotFoundException exception) {
        console.printError("Boot file was not found!");
      } catch (IOException e) {
        console.printError("Reading error");
      } catch (IllegalStateException exception) {
        console.printError("Unexpected error!");
        System.exit(0);
      }
    } else {
      console.printError("Command line argument with the boot file was not found!");
    }
    collection = new LinkedList<LabWork>();
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

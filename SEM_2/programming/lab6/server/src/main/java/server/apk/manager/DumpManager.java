package server.apk.manager;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonParseException;
import com.google.gson.reflect.TypeToken;
import common.apk.model.LabWork;
import server.apk.ServerApp;
import server.apk.utility.LocalDateAdapter;

import java.io.*;
import java.time.LocalDate;
import java.util.Collection;
import java.util.NoSuchElementException;
import java.util.PriorityQueue;

public class DumpManager {
  private final Gson gson = new GsonBuilder()
    .setPrettyPrinting()
    .serializeNulls()
    .registerTypeAdapter(LocalDate.class, new LocalDateAdapter())
    .create();

  private final String fileName;

  public DumpManager(String fileName) {
    if (!(new File(fileName).exists()))  fileName = "../" + fileName;
    this.fileName = fileName;
  }

  public void writeCollection(Collection<LabWork> collection) {
    try (PrintWriter collectionPrintWriter = new PrintWriter(new File(fileName))) {
      collectionPrintWriter.println(gson.toJson(collection));
      ServerApp.logger.info("\n" + "Collection successfully saved to file!");
    } catch (IOException exception) {
      ServerApp.logger.error("\n" + "The download file could not be opened.!");
    }
  }

  public Collection<LabWork> readCollection() {
    if (fileName != null && !fileName.isEmpty()) {
      try (var fileReader = new FileReader(fileName)) {
        var collectionType = new TypeToken<PriorityQueue<LabWork>>() {}.getType();
        var reader = new BufferedReader(fileReader);

        var jsonString = new StringBuilder();

        String line;
        while((line = reader.readLine()) != null) {
          line = line.trim();
          if (!line.equals("")) {
            jsonString.append(line);
          }
        }

        if (jsonString.isEmpty()) {
          jsonString = new StringBuilder("[]");
        }

        PriorityQueue<LabWork> collection = gson.fromJson(jsonString.toString(), collectionType);

        ServerApp.logger.info("Collection successfully loaded!");
        return collection;

      } catch (FileNotFoundException exception) {
        ServerApp.logger.error("\n" + "Boot file not found!");
      } catch (NoSuchElementException exception) {
        ServerApp.logger.error("The boot file is empty\n!");
      } catch (JsonParseException exception) {
        ServerApp.logger.error("The required collection was not found in the boot file\n!");
      } catch (IllegalStateException | IOException exception) {
        ServerApp.logger.fatal("\n" + "Unexpected error!");
        System.exit(0);
      }
    } else {
      ServerApp.logger.error("\n" + "Command line argument with boot file not found!");
    }
    return new PriorityQueue<>();
  }
}

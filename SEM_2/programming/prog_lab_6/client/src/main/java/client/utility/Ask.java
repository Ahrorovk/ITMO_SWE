package client.utility;


import common.model.Coordinates;
import common.model.Difficulty;
import common.model.Discipline;
import common.model.LabWork;

import java.time.LocalDate;
import java.util.Locale;
import java.util.NoSuchElementException;

public class Ask {
  public static class AskBreak extends Exception {
  }

  public static LabWork askLabWork(Console console) throws AskBreak {
    try {
      console.print("name: ");
      String name;
      while (true) {
        name = console.readln().trim();
        if (name.equals("exit")) throw new AskBreak();
        if (!name.equals("")) break;
        console.print("name: ");
      }
      var coordinates = askCoordinates(console);
      console.println("Coordinates: " + coordinates.toString());
      Integer maximumPoint;
      console.print("maximumPoint: ");
      while (true) {
        var line = console.readln().trim();
        if (line.equals("exit")) throw new AskBreak();
        if (line.equals("")) {
          maximumPoint = null;
          break;
        }
        try {
          maximumPoint = Integer.parseInt(line);
          if (maximumPoint > 0) break;
        } catch (NumberFormatException e) {
          console.print("Invalid number: ");
        }
        console.print("maximumPoint: ");
      }

      Integer minimumPoint;
      console.print("minimumPoint: ");
      while (true) {
        var line = console.readln().trim();
        if (line.equals("exit")) throw new AskBreak();
        if (line.equals("")) {
          minimumPoint = null;
          break;
        }
        try {
          minimumPoint = Integer.parseInt(line);
          if (minimumPoint > 0) break;
        } catch (NumberFormatException e) {
          console.print("Invalid number: ");
        }
        console.print("minimumPoint: ");
      }
      Integer personalQualitiesMaximum;
      console.print("personalQualitiesMaximum: ");
      while (true) {
        var line = console.readln().trim();
        if (line.equals("exit")) throw new AskBreak();
        if (line.equals("")) {
          personalQualitiesMaximum = null;
          break;
        }
        try {
          personalQualitiesMaximum = Integer.parseInt(line);
          if (personalQualitiesMaximum > 0) break;
        } catch (NumberFormatException e) {
          console.print("Invalid number: ");
        }
        console.print("personalQualitiesMaximum: ");
      }

      var difficulty = askDifficulty(console);
      var discipline = askDiscipline(console);
      return new LabWork(name, coordinates, minimumPoint, maximumPoint, personalQualitiesMaximum, difficulty, discipline);
    } catch (NoSuchElementException | IllegalStateException e) {
      console.printError("Reading LabWork failed");
      return null;
    }
  }

  public static Coordinates askCoordinates(Console console) throws AskBreak {
    try {
      console.print("coordinates.x: ");
      Long x;
      while (true) {
        var line = console.readln().trim();
        if (line.equals("exit")) throw new AskBreak();
        if (!line.equals("")) {
          try {
            x = Long.parseLong(line);
            if (x < -26) break;
          } catch (NumberFormatException e) {
          }
        }
        console.print("coordinates.x: ");
      }
      console.print("coordinates.y: ");
      Long y;
      while (true) {
        var line = console.readln().trim();
        if (line.equals("exit")) throw new AskBreak();
        if (!line.equals("")) {
          try {
            y = Long.parseLong(line);
            if (y <= 907) break;
          } catch (NumberFormatException e) {
          }
        }
        console.print("coordinates.y: ");
      }

      return new Coordinates(x, y);
    } catch (NoSuchElementException | IllegalStateException e) {
      console.printError("Reading coordinates from console failed");
      return null;
    }
  }

  public static Difficulty askDifficulty(Console console) throws AskBreak {
    try {
      console.print("Difficulty (" + Difficulty.VERY_EASY.name() + ", " + Difficulty.EASY.name() + ", " + Difficulty.NORMAL.name() + ", " + Difficulty.TERRIBLE.name() + "): ");
      Difficulty r;
      while (true) {
        var line = console.readln().trim();
        if (line.equals("exit")) throw new AskBreak();
        if (!line.equals("")) {
          try {
            r = Difficulty.valueOf(line.toUpperCase());
            break;
          } catch (NullPointerException | IllegalArgumentException e) {
          }
        }
        console.print("Difficulty: ");
      }
      return r;
    } catch (NoSuchElementException | IllegalStateException e) {
      console.printError("Reading difficulty from console failed");
      return null;
    }
  }

  public static Discipline askDiscipline(Console console) throws AskBreak {
    try {
      console.print("Discipline: ");
      Discipline r = new Discipline("_", 0);
      while (true) {
        var line = console.readln().trim();
        if (line.equals("exit")) throw new AskBreak();
        if (!line.equals("")) {
          try {
            r.setName(line);
            break;
          } catch (NullPointerException | IllegalArgumentException e) {
          }
        }
        console.print("Name: ");
      }
      console.print("Practice hours: ");
      while (true) {
        var line = console.readln().trim();
        if (line.equals("exit")) throw new AskBreak();
        if (!line.equals("") && Integer.parseInt(line) > 0) {
          try {
            r.setPracticeHours(Integer.parseInt(line));
            break;
          } catch (NullPointerException | IllegalArgumentException e) {
            console.println(e.getMessage());
          }
        }
        console.print("Practice hours: ");
      }
      return r;
    } catch (NoSuchElementException | IllegalStateException e) {
      console.printError("Reading Discipline from console failed");
      return null;
    }
  }
}

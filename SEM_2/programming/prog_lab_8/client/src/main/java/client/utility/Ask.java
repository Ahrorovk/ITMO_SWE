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
    while (true) {
      try {
        // 1) Имя
        console.print("name: ");
        String name = console.readNonEmptyLine();        // бросит AskBreak или вернёт не-пустую

        // 2) Координаты
        Coordinates coords = askCoordinates(console);

        // 3) Минимальная точка
        console.print("minimalPoint (> 0): ");
        double minP = console.readPositiveDouble();

        // 4) Максимальная точка
        console.print("maximumPoint (> 0): ");
        int maxP = console.readPositiveInt();

        // 5) Личные качества
        console.print("personalQualitiesMaximum (> 0): ");
        int pqm = console.readPositiveInt();

        // 6) Сложность и дисциплина
        Difficulty diff   = askDifficulty(console);
        Discipline disc   = askDiscipline(console);

        // 7) Если мы добрались до сюда — все поля валидны, создаём объект
        return new LabWork(10000l,name, coords, minP, maxP, pqm, diff, disc);

      } catch (IllegalArgumentException e) {
        // В конструкторе LabWork или валидациях было что-то не так
        console.println("Invalid input: " + e.getMessage() + " — попробуйте ещё раз.");
        // и цикл начинается заново, спрашиваем имя
      }
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
            if (x >= -26) break;
          } catch (NumberFormatException e) {
          }
        }
        console.println("Incorrect x,should be >= -26");

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
            if (y>0 && y <= 907) break;
          } catch (NumberFormatException e) {
          }
        }
        console.println("Incorrect y,should be > 0");
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
      console.println("Discipline: ");
      String name;
      while (true) {
        console.print("Discipline name: ");
        String line = console.readln().trim();

        if (line.equalsIgnoreCase("exit"))   throw new AskBreak();
        if (!line.isEmpty()) {
          name = line;
          break;
        }
        console.println("Name cannot be empty. Try again (or 'exit').");
      }

      int practiceHours;
      while (true) {
        console.print("Practice hours (> 0): ");
        String line = console.readln().trim();

        if (line.equalsIgnoreCase("exit"))   throw new AskBreak();
        try {
          practiceHours = Integer.parseInt(line);
          if (practiceHours > 0) break;    // валидно
        } catch (NumberFormatException ignored) { }
        console.println("Enter a positive integer (or 'exit').");
      }

      return new Discipline(name, practiceHours);

    } catch (NoSuchElementException | IllegalStateException e) {
      console.printError("Reading Discipline from console failed");
      return null;
    }
  }

}

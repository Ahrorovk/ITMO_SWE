package client.utility;

import java.util.NoSuchElementException;
import java.util.Scanner;

public class StandardConsole implements Console {
  private static final String P1 = "$ ";
  private static Scanner fileScanner = null;
  private static Scanner defScanner = new Scanner(System.in);

  public void print(Object obj) {
    System.out.print(obj);
  }

  public void println(Object obj) {
    System.out.println(obj);
  }

  public void printError(Object obj) {
    System.err.println("Error(err): " + obj);
    System.out.println("Error(out): " + obj);
  }

  public String readln() throws NoSuchElementException, IllegalStateException {
    return (fileScanner != null ? fileScanner : defScanner).nextLine();
  }

  public boolean isCanReadln() throws IllegalStateException {
    return (fileScanner != null ? fileScanner : defScanner).hasNextLine();
  }

  public void printTable(Object elementLeft, Object elementRight) {
    System.out.printf(" %-40s%-1s%n", elementLeft, elementRight);
  }

  public void prompt() {
    print(P1);
  }

  public String getPrompt() {
    return P1;
  }

  public void selectFileScanner(Scanner scanner) {
    this.fileScanner = scanner;
  }

  public void selectConsoleScanner() {
    this.fileScanner = null;
  }

  @Override
  public String readNonEmptyLine() throws Ask.AskBreak {
    while (true) {
      String line = readln().trim();
      if (!line.isEmpty()) {
        return line;
      }
      print("Input cannot be empty. Try again (or 'exit'): ");
    }
  }

  @Override
  public int readPositiveInt() throws Ask.AskBreak {
    while (true) {
      String line = readln().trim();
      try {
        int v = Integer.parseInt(line);
        if (v > 0) return v;
        println("Value must be > 0.");
      } catch (NumberFormatException e) {
        println("Invalid integer.");
      }
      print("Enter a positive integer (or 'exit'): ");
    }
  }

  @Override
  public double readPositiveDouble() throws Ask.AskBreak {
    while (true) {
      String line = readln().trim();
      try {
        double v = Double.parseDouble(line);
        if (v > 0) return v;
        println("Value must be > 0.");
      } catch (NumberFormatException e) {
        println("Invalid number.");
      }
      print("Enter a positive number (or 'exit'): ");
    }
  }
}

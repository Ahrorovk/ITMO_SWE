package command.commands;

import MyClass.Coordinates;
import MyClass.Difficulty;
import MyClass.Discipline;
import MyClass.LabWork;

import java.util.Scanner;

public class FillCommand {
    private static final Scanner scanner = new Scanner(System.in);
    public static LabWork fillFields() {
        System.out.print("Enter the name:");
        String name = scanner.nextLine();

        System.out.print("Enter the x coordinate value:");
        Long x = Long.parseLong(scanner.nextLine());

        System.out.print("Enter the y coordinate value:");
        Long y = Long.parseLong(scanner.nextLine());

        System.out.print("Enter the minimum grade:");
        double minimalPoint = Double.parseDouble(scanner.nextLine());

        System.out.print("Enter the maximum grade:");
        Integer maximumPoint = Integer.parseInt(scanner.nextLine());

        System.out.print("Enter the maximum number of personal qualities:");
        int personalQualitiesMaximum = Integer.parseInt(scanner.nextLine());

        System.out.print("Enter the difficulty (VERY_EASY, EASY, NORMAL, TERRIBLE):");
        Difficulty difficulty = Difficulty.valueOf(scanner.nextLine().toUpperCase());

        System.out.print("Enter the discipline name:");
        String disciplineName = scanner.nextLine();

        System.out.print("Enter the number of practice hours for the discipline:");
        int practiceHours = Integer.parseInt(scanner.nextLine());

        Discipline discipline = new Discipline(disciplineName, practiceHours);
        Coordinates coordinates = new Coordinates(x, y);

        return new LabWork(
                name,
                coordinates,
                minimalPoint,
                maximumPoint,
                personalQualitiesMaximum,
                difficulty,
                discipline
        );
    }
}

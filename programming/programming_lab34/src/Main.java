import enums.Seasons;
import enums.Sides;
import exceptions.NoExplorerFoundException;
import objects.*;
import characters.*;

public class Main {
    public static void main(String[] args) {
        LocationObject home = new Home("дом", ObjectEnum.Building);

        LocationObject rock = new Rock("скала", ObjectEnum.Mountain);

        Food foodForPerson = new Food("Пицца");

        Food foodForBird = new Food("Корм");

        Person person = new Person("Акка", home, foodForPerson, ObjectEnum.Person);

        Bird bird = new Bird("Горго", rock, foodForBird, ObjectEnum.Bird);
        try {

            System.out.println(person.reply(bird, true));

        } catch (NoExplorerFoundException e) {

            System.out.println(e.getMessage());

        }

        try {

            System.out.println(person.reply(bird, false));

        } catch (NoExplorerFoundException e) {

            System.out.println(e.getMessage());

        }

        Wintering wintering = new Wintering(Seasons.Autumn, Sides.South, bird);

        System.out.println(bird.couldNt());

        System.out.println(bird.flightForward());
    }
}
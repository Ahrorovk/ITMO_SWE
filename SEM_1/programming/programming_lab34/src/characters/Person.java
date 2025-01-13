package characters;

import actions.Powerable;
import actions.Repliable;
import exceptions.NoExplorerFoundException;
import objects.Food;
import objects.LocationObject;
import objects.ObjectEnum;

public class Person extends AliveCreation implements Repliable, Powerable {
    public Person(String name) {
        super(name);
    }

    public Person(String name, LocationObject location, Food food, ObjectEnum type) {
        super(name, location, food, type);
    }

    @Override
    public String emotion(String obj) {
        return obj;
    }

    @Override
    public String spin() {
        return "";
    }

    @Override
    public String could() {
        return "я могла";
    }

    @Override
    public String couldNt() {
        return "я не могла";
    }

    @Override
    public String reply(AliveCreation creation, Boolean isReply) throws NoExplorerFoundException {
        if (creation.getFood().getName() != "Корм") {
            throw new NoExplorerFoundException("Птице нужен корм");
        }
        String answer = "";
        if (isReply) {
            answer = "- Потому что " + couldNt() + " приносить тебе другого " +
                    creation.getFood().getName()+ "а" +
                    ", пока ты жил " +
                    creation.getLocation().getName("на своей") +
                    ",-отвечала " +
                    this.getName() +
                    ".";
        } else {
            answer = "-Но не " + creation.emotion("горюй") + ", из тебя выйдет " + creation.getTrait() + " " + creation.getType().getType() + ".";
        }
        return answer;
    }
}

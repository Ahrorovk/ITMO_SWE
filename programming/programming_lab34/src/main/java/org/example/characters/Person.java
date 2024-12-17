package org.example.characters;

import org.example.actions.Powerable;
import org.example.actions.Repliable;
import org.example.exceptions.NoExplorerFoundException;
import org.example.objects.Food;
import org.example.objects.LocationObject;
import org.example.objects.ObjectEnum;

import java.util.Locale;

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
        if(creation.getFood().getName().toLowerCase(Locale.ROOT) != "Корм") {
            throw new NoExplorerFoundException("Птице нужен корм");
        }
        String answer = "";
        if (isReply) {
            answer = "- Потому что " + couldNt() + " приносить тебе другого" +
                    creation.getFood().getName().replace(super.getName().charAt(super.getName().length() - 1), 'а') +
                    ", пока ты жил" +
                    creation.getLocation().getName("на своей") +
                    ", отвечала" +
                    this.getName() +
                    ".";
        } else {
            answer = "Но не " + creation.emotion("горюй") + ", из тебя выйдет" + creation.getTrait() + " " + creation.getType() + ".";
        }
        return answer;
    }
}

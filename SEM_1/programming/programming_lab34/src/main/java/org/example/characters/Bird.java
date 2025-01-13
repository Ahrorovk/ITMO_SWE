package org.example.characters;

import org.example.actions.*;
import org.example.objects.Food;
import org.example.objects.LocationObject;
import org.example.objects.ObjectEnum;

public class Bird extends AliveCreation implements Flightable, Emotinable, Spinable, Powerable, Returnable {
    public Bird(String name) {
        super(name);
    }

    public Bird(String name, LocationObject location, Food food, ObjectEnum type) {
        super(name, location, food, type);
    }

    @Override
    public String emotion(String obj) {
        return obj;
    }

    @Override
    public String getTrait() {
        return "хорошая";
    }

    @Override
    public String spin() {
        return "кружился над стаей";
    }

    @Override
    public String flight() {
        return MovesEnum.Flight.getMove();
    }

    @Override
    public String could() {
        return "держать строй";
    }

    @Override
    public String couldNt() {
        return "Но он никак не мог научиться " + could() + "во время по" + flight().replace(flight().charAt(flight().length() - 2), ' ').replace(flight().charAt(flight().length() - 1), '.');
    }

    public String flightForward() {
        return "То и дело он у" + flight().replace(flight().charAt(flight().length() - 2), 'л').replace(flight().charAt(flight().length() - 1), ' ') + "далеко вперёд, потом " + returnTo() + " и " + spin() + ".";
    }

    @Override
    public String returnTo() {
        return "снова возвращался";
    }
}

package org.example.characters;

import org.example.actions.Emotinable;
import org.example.actions.Spinable;
import org.example.objects.Food;
import org.example.objects.LocationObject;
import org.example.objects.ObjectEnum;

public abstract class AliveCreation implements Emotinable, Spinable {
    private final String name;
    private LocationObject location;
    private String trait;
    private Food food;
    private ObjectEnum type;

    public AliveCreation(String name) {
        this.name = name;
    }

    public AliveCreation(String name, LocationObject location, Food food, ObjectEnum type) {
        this.name = name;
        this.location = location;
        this.food = food;
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public LocationObject getLocation() {
        return location;
    }

    public void setTrait(String trait) {
        this.trait = trait;
    }

    public String getTrait() {
        return trait;
    }

    public Food getFood() {
        return food;
    }

    public ObjectEnum getType() {
        return type;
    }
}
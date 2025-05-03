package org.example.pokemons;

import org.example.attacks.status.Swagger;

public class Vikavolt extends Charjabug {
    public Vikavolt(String name, int lvl) {
        super(name, lvl);
        setStats(77, 70, 90, 145, 75, 43);
        Swagger swagger = new Swagger();
        addMove(swagger);
    }
}

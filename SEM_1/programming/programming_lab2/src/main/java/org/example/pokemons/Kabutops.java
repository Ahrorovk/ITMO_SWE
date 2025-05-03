package org.example.pokemons;

import org.example.attacks.status.SwordsDance;

public class Kabutops extends Kabuto {
    public Kabutops(String name, int lvl) {
        super(name, lvl);
        setStats(60, 115, 105, 65, 70, 80);
        SwordsDance swordsDance = new SwordsDance();
        addMove(swordsDance);
    }
}

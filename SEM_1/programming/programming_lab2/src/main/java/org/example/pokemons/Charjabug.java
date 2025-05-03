package org.example.pokemons;

import org.example.attacks.special.Discharge;
import ru.ifmo.se.pokemon.Type;

public class Charjabug extends Grubbin {
    public Charjabug(String name, int lvl) {
        super(name, lvl);
        setStats(57, 82, 95, 55, 75, 36);
        addType(Type.ELECTRIC);
        Discharge discharge = new Discharge();
        addMove(discharge);
    }
}

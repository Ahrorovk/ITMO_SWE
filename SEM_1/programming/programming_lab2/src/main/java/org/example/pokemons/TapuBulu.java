package org.example.pokemons;

import org.example.attacks.special.Confusion;
import org.example.attacks.special.NaturesMadness;
import org.example.attacks.special.Thunder;
import org.example.attacks.status.Confide;
import ru.ifmo.se.pokemon.Pokemon;
import ru.ifmo.se.pokemon.Type;

public class TapuBulu extends Pokemon {
    public TapuBulu(String name, int lvl) {
        super(name, lvl);
        setStats(70, 130, 115, 85, 95, 75);
        setType(Type.GRASS, Type.FAIRY);
        Confide confide = new Confide();
        Confusion confusion = new Confusion();
        NaturesMadness naturesMadness = new NaturesMadness();
        Thunder thunder = new Thunder();
        setMove(confide, confusion, naturesMadness, thunder);
    }
}

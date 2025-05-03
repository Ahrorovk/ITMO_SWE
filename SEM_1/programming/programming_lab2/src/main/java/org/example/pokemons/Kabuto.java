package org.example.pokemons;

import org.example.attacks.special.Absord;
import org.example.attacks.special.IceBeam;
import org.example.attacks.status.DoubleTeam;
import org.example.util.Helper;
import ru.ifmo.se.pokemon.Pokemon;
import ru.ifmo.se.pokemon.Type;

public class Kabuto extends Pokemon {
    public Kabuto(String name, int lvl) {
        super(name, lvl);
        setStats(30, 80, 90, 55, 45, 55);
        setType(Type.WATER, Type.ROCK);
        DoubleTeam doubleTeam = new DoubleTeam();
        IceBeam iceBeam = new IceBeam();
        Absord absord = new Absord();
        /*Helper helper = new Helper();
        doubleTeam.describe(helper.addSpace(this.getClass().getSimpleName()));
        iceBeam.describe(helper.addSpace(this.getClass().getSimpleName()));
        absord.describe(helper.addSpace(this.getClass().getSimpleName()));*/
        setMove(doubleTeam, iceBeam, absord);
    }
}

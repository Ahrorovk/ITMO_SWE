package org.example.pokemons;

import org.example.attacks.physical.ViseGrip;
import org.example.attacks.status.ThunderWave;
import ru.ifmo.se.pokemon.Pokemon;
import ru.ifmo.se.pokemon.Type;

public class Grubbin extends Pokemon {
    public Grubbin(String name, int lvl) {
        super(name, lvl);
        setStats(47, 62, 45, 55, 45, 46);
        setType(Type.BUG);
        ViseGrip viseGrip = new ViseGrip();
        ThunderWave thunderWave = new ThunderWave();
        setMove(viseGrip, thunderWave);
    }
}

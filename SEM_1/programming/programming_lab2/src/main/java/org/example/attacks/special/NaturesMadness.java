package org.example.attacks.special;

import org.example.attacks.custom.CustomSpecialMove;
import ru.ifmo.se.pokemon.Pokemon;
import ru.ifmo.se.pokemon.Stat;
import ru.ifmo.se.pokemon.Type;

public class NaturesMadness extends CustomSpecialMove {
    public NaturesMadness() {
        super(Type.FAIRY, 0, 90);
    }

    @Override
    protected void applyOppDamage(Pokemon pokemon, double v) {
        super.applyOppDamage(pokemon, v);
        pokemon.setMod(Stat.HP, (int) (v * 2));
    }
}

package org.example.attacks.special;

import org.example.attacks.custom.CustomSpecialMove;
import ru.ifmo.se.pokemon.Pokemon;
import ru.ifmo.se.pokemon.Stat;
import ru.ifmo.se.pokemon.Type;

public class Absord extends CustomSpecialMove {
    public Absord() {
        super(Type.GRASS, 20, 100);
    }

    @Override
    protected void applySelfDamage(Pokemon pokemon, double v) {
        super.applySelfDamage(pokemon, v);
        pokemon.setMod(Stat.HP, (int) -(v / 2));
    }

    @Override
    protected void applyOppDamage(Pokemon pokemon, double v) {
        super.applyOppDamage(pokemon, v);
    }
}

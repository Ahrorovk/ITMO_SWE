package org.example.attacks.special;

import org.example.attacks.custom.CustomSpecialMove;
import ru.ifmo.se.pokemon.Effect;
import ru.ifmo.se.pokemon.Pokemon;
import ru.ifmo.se.pokemon.Type;

public class Thunder extends CustomSpecialMove {
    public Thunder() {
        super(Type.ELECTRIC, 110, 77);
    }

    @Override
    protected void applyOppEffects(Pokemon pokemon) {
        super.applyOppEffects(pokemon);
        if (Math.random() < 0.3)
            Effect.paralyze(pokemon);
    }
}
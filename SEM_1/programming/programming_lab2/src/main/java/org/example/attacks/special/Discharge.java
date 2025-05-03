package org.example.attacks.special;

import org.example.attacks.custom.CustomSpecialMove;
import ru.ifmo.se.pokemon.Effect;
import ru.ifmo.se.pokemon.Pokemon;
import ru.ifmo.se.pokemon.Type;

public class Discharge extends CustomSpecialMove {
    public Discharge() {
        super(Type.ELECTRIC, 80, 100);
    }

    @Override
    protected void applyOppEffects(Pokemon pokemon) {
        super.applyOppEffects(pokemon);
        if (Math.random() < 0.3)
            Effect.paralyze(pokemon);
    }
}

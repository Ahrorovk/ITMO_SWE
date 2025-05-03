package org.example.attacks.status;

import org.example.attacks.custom.CustomStatusMove;
import ru.ifmo.se.pokemon.Effect;
import ru.ifmo.se.pokemon.Pokemon;
import ru.ifmo.se.pokemon.Stat;
import ru.ifmo.se.pokemon.Type;

public class ThunderWave extends CustomStatusMove {
    public ThunderWave() {
        super(Type.ELECTRIC, 0, 90);
    }

    @Override
    protected void applyOppEffects(Pokemon pokemon) {
        super.applyOppEffects(pokemon);
        Effect.paralyze(pokemon);
        if (Math.random() < 0.25)
            pokemon.setMod(Stat.DEFENSE, 1);
        pokemon.setMod(Stat.SPEED, -2);
    }
}

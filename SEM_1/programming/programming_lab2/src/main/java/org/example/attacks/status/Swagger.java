package org.example.attacks.status;

import org.example.attacks.custom.CustomStatusMove;
import ru.ifmo.se.pokemon.Effect;
import ru.ifmo.se.pokemon.Pokemon;
import ru.ifmo.se.pokemon.Stat;
import ru.ifmo.se.pokemon.Type;

public class Swagger extends CustomStatusMove {
    public Swagger() {
        super(Type.NORMAL, 0, 85);
    }

    @Override
    protected void applyOppEffects(Pokemon pokemon) {
        super.applyOppEffects(pokemon);
        Effect.confuse(pokemon);
        pokemon.setMod(Stat.ATTACK, 2);
    }
}

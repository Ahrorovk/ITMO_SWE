package org.example.attacks.custom;

import org.example.util.Helper;
import ru.ifmo.se.pokemon.SpecialMove;
import ru.ifmo.se.pokemon.Type;

public class CustomSpecialMove extends SpecialMove {

    public CustomSpecialMove() {
    }

    public CustomSpecialMove(Type var1, double var2, double var4) {
        super(var1, var2, var4);
    }

    public CustomSpecialMove(Type var1, double var2, double var4, int var6, int var7) {
        super(var1, var2, var4, var6, var7);
    }


    @Override
    protected String describe() {
        return "is using ability " + Helper.addSpace(this.getClass().getSimpleName());
    }
}

package org.example.objects;

import org.example.actions.Movable;
import org.example.characters.AliveCreation;
import org.example.characters.Bird;
import org.example.enums.Seasons;
import org.example.enums.Sides;
import org.example.enums.WayEnum;

import java.util.Arrays;
import java.util.Objects;

public class Wintering extends CoreObject implements Movable {
    private final Sides sides;
    private final Bird creation;

    public Wintering(Seasons seasons, Sides sides, Bird creation) {
        super(seasons.getSeason(), ObjectEnum.Season);
        this.sides = sides;
        this.creation = creation;
        System.out.println(move(WayEnum.LongWay));
    }


    public Sides getSides() {
        return sides;
    }

    @Override
    public String move(WayEnum way) {
        Seasons typeName = null;
        for (int i = 0; i < Seasons.values().length - 1; i++) {
            if (Objects.equals(Arrays.stream(Seasons.values()).toList().get(i).getSeason(), this.getName())) {
                typeName = Arrays.stream(Seasons.values()).toList().get(i);
            }
        }
        assert typeName != null;
        return setSeasonSuffix(typeName) + ", когда гуси двинулись в " + way.getWay() + "на " + this.getSides().getSide() + ", " + creation.getName() + "по" +
                creation.flight()
                        .replace(creation.flight().charAt(creation.flight().length() - 3), 'е')
                        .replace(creation.flight().charAt(creation.flight().length() - 2), 'л')
                        .replace(creation.flight().charAt(creation.flight().length() - 1), ' ') + "с ними. ";
    }

    String setSeasonSuffix(Seasons seasons) {
        String answer = "";
        switch (seasons) {
            case Autumn -> answer = seasons.getSeason() + "ю";
            case Winter, Spring ->
                    answer = seasons.getSeason().replace(seasons.getSeason().charAt(seasons.getSeason().length() - 1), ' ') + "ой";
            case Summer -> answer = seasons.getSeason() + "м";
        }
        return answer;
    }

    public AliveCreation getCreation() {
        return creation;
    }
}

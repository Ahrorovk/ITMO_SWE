package org.example;

import org.example.pokemons.*;
import ru.ifmo.se.pokemon.*;

public class Main {

    public static void main(String[] args) {
        Battle b = new Battle();
        Kabuto kabuto = new Kabuto("Star Kabuto", 25);
        Kabutops kabutops = new Kabutops("Silver Queen", 66);
        TapuBulu tapuBulu = new TapuBulu("Bulu Tapu", 20);
        Grubbin grubbin = new Grubbin("Killer Bug", 14);
        Charjabug charjabug = new Charjabug("Electric Sting", 21);
        Vikavolt vikavolt = new Vikavolt("King Volt", 76);
        b.addAlly(kabutops);
        b.addAlly(grubbin);
        b.addAlly(charjabug);
        b.addFoe(tapuBulu);
        b.addFoe(vikavolt);
        b.addFoe(kabuto);
        b.go();
    }
}
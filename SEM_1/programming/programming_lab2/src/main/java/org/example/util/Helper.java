package org.example.util;

public class Helper {
    public static String addSpace(String value) {
        StringBuilder newValue = new StringBuilder(String.valueOf(value.charAt(0)));
        for (int i = 1; i < value.length(); i++) {
            if (value.charAt(i) >= 'A' && value.charAt(i) <= 'Z') {
                newValue.append(" ");
            }
            newValue.append(value.charAt(i));
        }
        return newValue.toString();
    }

    public static void main(String[] args) {
        System.out.println(addSpace("IceBeamCharger"));
    }
}


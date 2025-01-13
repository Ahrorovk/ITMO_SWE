package enums;

public enum Seasons {
    Winter("Зима"),
    Autumn("Осень"),
    Spring("Весна"),
    Summer("Лето")
    ;
    private final String season;

    Seasons(String season) {
        this.season = season;
    }

    public String getSeason() {
        return season;
    }
}

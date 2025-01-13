package enums;

public enum Sides {
    North("Север"),
    South("Юг"),
    East("Восток"),
    West("Запад");
    private final String side;

    Sides(String side) {
        this.side = side;
    }

    public String getSide() {
        return side;
    }
}

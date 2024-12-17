package enums;

public enum WayEnum {
    LongWay("далёкий путь"),
    ShortWay("малый путь");
    private final String way;

    WayEnum(String way) {
        this.way = way;
    }

    public String getWay() {
        return way;
    }
}

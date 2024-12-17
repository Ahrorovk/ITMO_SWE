package objects;

public enum ObjectEnum {
    Food("Еда"),
    Person("человек"),
    Bird("птица"),
    Season("Время года"),
    Building("здание"),
    Mountain("Горы");

    private final String type;
    ObjectEnum(String name){
        this.type = name;
    }

    public String getType() {
        return type;
    }
}

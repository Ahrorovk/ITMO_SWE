package objects;

public class Home extends LocationObject {
    public Home(String name, ObjectEnum type) {
        super(name, type);
    }

    @Override
    public String getName(String place) {
        return place + " " + super.getName() + "а";
    }
}

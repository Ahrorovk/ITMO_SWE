package objects;

public class Rock extends LocationObject {
    public Rock(String name, ObjectEnum type) {
        super(name, type);
    }

    @Override
    public String getName(String place) {
        return place + " " + super.getName().replace(super.getName().charAt(super.getName().length() - 1), 'е');
    }
}

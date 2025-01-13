package objects;

import actions.Locationable;

public abstract class LocationObject extends CoreObject implements Locationable {
    protected LocationObject(String name, ObjectEnum type) {
        super(name, type);
    }

    @Override
    public String xycord(int x, int y) {
        return "x=" + x + ",y=" + y;
    }

    public abstract String getName(String place);
}

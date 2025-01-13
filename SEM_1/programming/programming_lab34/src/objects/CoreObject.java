package objects;


public abstract class CoreObject {
    private String name;
    private ObjectEnum type;

    protected CoreObject(String name, ObjectEnum type) {
        this.name = name;
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public ObjectEnum getType() {
        return type;
    }

    @Override
    public int hashCode() {
        return super.hashCode() + this.name.hashCode();
    }

    @Override
    public String toString() {
        return "Object: " + this.getName() + " : " + this.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return obj.hashCode() == this.hashCode();
    }
}

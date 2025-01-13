package enums;

public enum MovesEnum {
    Flight("летать"),
    Walk("ходить"),
    Sit("сидеть"),
    Run("бежал");
    private final String move;

    MovesEnum(String move) {
        this.move = move;
    }

    public String getMove() {
        return move;
    }
}

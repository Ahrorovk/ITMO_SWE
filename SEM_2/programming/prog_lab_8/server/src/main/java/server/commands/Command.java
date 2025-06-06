package server.commands;


public abstract class Command implements Describable, Executable {
  private final String name;
  private final String description;
  private final String functionality;

  public Command(String name, String description, String functionality) {
    this.name = name;
    this.description = description;
    this.functionality = functionality;
  }

  public String getName() {
    return name;
  }

  public String getDescription() {
    return description;
  }

  public String getFunctionality() {
    return functionality;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null || getClass() != obj.getClass()) return false;
    Command command = (Command) obj;
    return name.equals(command.name) && description.equals(command.description);
  }

  @Override
  public int hashCode() {
    return name.hashCode() + description.hashCode();
  }

  @Override
  public String toString() {
    return "Command{" +
      "name='" + name + '\'' +
      ", description='" + description + '\'' +
      '}';
  }
}

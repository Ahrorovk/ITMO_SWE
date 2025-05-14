package server.commands;

import common.model.Discipline;
import common.model.LabWork;
import common.model.Response;
import server.managers.CollectionManager;
import server.utility.User;

import java.util.HashSet;
import java.util.Set;

public class PrintUniqueDiscipline extends Command {
  private final CollectionManager collectionManager;

  public PrintUniqueDiscipline(CollectionManager collectionManager) {
    super("print_unique_discipline", "found unique discipline and print it","SHOW");
    this.collectionManager = collectionManager;
  }

  @Override
  public Response apply(String[] arguments, Object obj, User user) {
    try {
      if (!arguments[1].isEmpty())
        return new Response(400, "Incorrect number of arguments!\nUsing: '" + getName() + "'");
      Set<Discipline> uniqueDisciplines = new HashSet<>();
      for (LabWork labWork : collectionManager.getCollection()) {
        uniqueDisciplines.add(labWork.getDiscipline());
      }
      if (uniqueDisciplines.isEmpty()) {
        return new Response(400, "No unique disciplines found.");
      } else {
        return new Response("Unique Disciplines: "+uniqueDisciplines.toString());
      }
    } catch (Exception e) {
      return new Response(400, "Unique disciplines could not be found.");
    }
  }
}


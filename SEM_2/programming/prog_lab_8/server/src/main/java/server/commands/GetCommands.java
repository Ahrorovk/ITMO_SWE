package server.commands;

import common.model.Response;
import server.managers.CommandManager;
import server.managers.UserManager;
import server.utility.User;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class GetCommands extends Command {
  private final CommandManager commandManager;
  private final UserManager userManager;

  public GetCommands(CommandManager commandManager, UserManager userManager) {
    super("get_commands", "display a list of server commands", "DEFAULT");
    this.commandManager = commandManager;
    this.userManager = userManager;
  }

  @Override
  public Response apply(String[] arguments, Object obj, User u) {
    if (!arguments[1].isEmpty()) return new Response(400, "Incorrect number of arguments!\n" +
      "Using: '" + getName() + "'");
    if (u.getID()<1) return new Response("not logined");
    var s = new ArrayList<>(Arrays.asList(
      commandManager.getCommands().values().stream().filter(
        command-> !command.getName().equals("get_commands") &&
          !command.getName().equals("is_id_exist") &&
          !command.getName().equals("create_user login:password")
          //!command.getName().equals("show") &&
      ).map(
        command -> new String[]{
          (command.getName()+" ").split(" ",2)[0],
          command.getName(),
          (command.getName()+" ").split(" ",2)[1].trim().replace(' ', ';'),
          command.getDescription()
        }
      ).toArray()));

    return new Response("OK",s);
  }
}

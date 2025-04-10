package server.apk.handlers;

import common.apk.network.requests.Request;
import common.apk.network.responses.NoSuchCommandResponse;
import common.apk.network.responses.Response;
import server.managers.CommandManager;

public class CommandHandler {
  private final CommandManager manager;

  public CommandHandler(CommandManager manager) {
    this.manager = manager;
  }

  public Response handle(Request request) {
    var command = manager.getCommands().get(request.getName());
    if (command == null) return new NoSuchCommandResponse(request.getName());
    return command.apply(request);
  }
}

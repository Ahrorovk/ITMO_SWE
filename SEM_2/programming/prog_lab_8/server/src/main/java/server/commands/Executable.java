package server.commands;

import common.model.Response;
import server.utility.User;

public interface Executable {

  Response apply(String[] arguments, Object obj, User u);

}

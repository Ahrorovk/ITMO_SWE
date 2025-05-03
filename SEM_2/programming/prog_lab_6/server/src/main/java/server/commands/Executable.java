package server.commands;

import common.model.Response;
public interface Executable {

  Response apply(String[] arguments, Object obj);
}

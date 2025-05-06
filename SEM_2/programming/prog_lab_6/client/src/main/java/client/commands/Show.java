package client.commands;

import client.managers.TCPManager;
import client.utility.Console;
import common.model.LabWork;

import java.util.LinkedList;
import java.util.stream.Collectors;

public class Show extends Command {
    private final Console console;
    private final TCPManager tcpManager;

    public Show(Console console, TCPManager tcpManager) {
        super("show", "output all the elements of the collection in a string representation to the standard output stream");
        this.console = console;
        this.tcpManager = tcpManager;
    }

    @Override
    public boolean apply(String[] arguments) {
        if (!arguments[1].isEmpty()) {
            console.println("Incorrect number of arguments!");
            console.println("Using: '" + getName() + "'");
            return false;
        }
      var s=((LinkedList<LabWork>)tcpManager.send("show").getResponseObj()).stream().map(LabWork::toString).collect(Collectors.joining("\n"));
        if (s.isEmpty())
            console.println("Collection is empty!");
          else
            console.println(s);
      return true;
    }
}

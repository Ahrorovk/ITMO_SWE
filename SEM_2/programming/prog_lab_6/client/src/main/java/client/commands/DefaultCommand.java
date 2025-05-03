package client.commands;

import client.managers.TCPManager;
import client.utility.Ask;
import client.utility.Console;
import common.model.LabWork;

import java.util.HashMap;

public class DefaultCommand extends Command {
	private static interface ArgExecuter { public boolean execute(String s, Console cons, TCPManager tcpm); }
	private static interface AskExecuter { public Object execute(Console cons); }

	private final Console console;
	private final TCPManager tcpManager;
	private final String args;
	private static HashMap<String, ArgExecuter> argMap = new HashMap<>();
	private static HashMap<String, AskExecuter> askMap = new HashMap<>();

	static {
		argMap.put("index", DefaultCommand::argIndex);
		argMap.put("N", DefaultCommand::argN);
		argMap.put("ID", DefaultCommand::argID);
		askMap.put("{element}", DefaultCommand::askLabWork);
	}

	public DefaultCommand(String[] command, Console console, TCPManager tcpManager) {
		super(command[1], command[3]);
		args = command[2];
		this.console = console;
		this.tcpManager = tcpManager;


	}
	@Override
	public boolean apply(String[] arguments) {
		var ArgCommandNotUsed = !arguments[1].isEmpty();
		Object sendObj = null;
		if (!args.isEmpty())
			for (var arg: args.split(","))
				if (argMap.get(arg) != null) {
					if (!argMap.get(arg).execute(arguments[1].trim(), console, tcpManager))
						return false;
					ArgCommandNotUsed=false;
				} else if (askMap.get(arg) != null) {
					if (ArgCommandNotUsed) break;
					sendObj = askMap.get(arg).execute(console);
				} else
					console.printError("Unknown argument type: "+arg);
		if (ArgCommandNotUsed) {
			console.println("Incorrect number of arguments!");
			console.println("Using: '" + getName() + "'");
			return false;
		}
		var res = tcpManager.send(arguments[0]+" "+arguments[1], sendObj);
		console.println(res.getMassage());
		return res.getExitCode()<300;
	}

	private static boolean argIndex(String s, Console cons, TCPManager tcpm) {
		int index = -1;
		try { index = Integer.parseInt(s); } catch (NumberFormatException e) { cons.println("index wasn`t found"); return false; }
		if (index < 0) { cons.println("index < 0"); return false; }
		return true;
	}

	private static boolean argN(String s, Console cons, TCPManager tcpm) {
		int N = -1;
		try { N = Integer.parseInt(s); } catch (NumberFormatException e) { cons.println("N wasn`t found"); return false; }
		if (N < 1) { cons.println("N < 1"); return false; }
		return true;
	}


	public static Object askLabWork(Console cons) {
		try {
			cons.println("* Creating Lab Work:");
			LabWork d = Ask.askLabWork(cons);
      System.out.println( "our labwork -> "+ d.toString());

				return d;

		} catch (Ask.AskBreak e) {
			cons.println("Cancel...");
			return null;
		}
	}
  private static boolean argID(String s, Console cons, TCPManager tcpm) {
    long id = -1;
    try { id = Long.parseLong(s); } catch (NumberFormatException e) { cons.println("ID не распознан"); return false; }
    return true;
  }
}

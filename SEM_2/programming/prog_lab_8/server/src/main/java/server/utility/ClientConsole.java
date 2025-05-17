package server.utility;

import java.util.NoSuchElementException;
import java.util.Scanner;

public class ClientConsole implements Console {
	private static final String P1 = "$ ";
	private static StringBuilder out = new StringBuilder();
	public void print(Object obj) {
		out.append(obj==null?"null":obj.toString());
	}
	public void println(Object obj) {
		out.append(obj==null?"null\n":obj.toString()+"\n");
	}

	public void printError(Object obj) {
		out.append("Error(err):"+(obj==null?"null\n":obj+"\n"));
	}

	public String readln() throws NoSuchElementException, IllegalStateException { return null; }

	public boolean isCanReadln() throws IllegalStateException { return false; }

	public void printTable(Object elementLeft, Object elementRight) {
		 out.append(String.format(" %-35s%-1s%n", elementLeft, elementRight));
	}

	public void prompt() {
		print(P1);
	}

	public String getPrompt() {
		return P1;
	}

	public void selectFileScanner(Scanner scanner) {}

	public void selectConsoleScanner() {}

	public void clearOut() {out.setLength(0);}
	public String getOut() {return out.toString();}
}

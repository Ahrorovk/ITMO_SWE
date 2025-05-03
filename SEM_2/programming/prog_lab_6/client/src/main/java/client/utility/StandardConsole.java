package client.utility;

import java.util.NoSuchElementException;
import java.util.Scanner;

public class StandardConsole implements Console {
	private static final String P1 = "$ ";
	private static Scanner fileScanner = null;
	private static Scanner defScanner = new Scanner(System.in);

	public void print(Object obj) {
		System.out.print(obj);
	}

	public void println(Object obj) {
		System.out.println(obj);
	}
	public void printError(Object obj) {
		System.err.println("Error(err): " + obj);
		System.out.println("Error(out): " + obj);
	}

	public String readln() throws NoSuchElementException, IllegalStateException {
		return (fileScanner!=null?fileScanner:defScanner).nextLine();
	}

	public boolean isCanReadln() throws IllegalStateException {
		return (fileScanner!=null?fileScanner:defScanner).hasNextLine();
	}

	public void printTable(Object elementLeft, Object elementRight) {
		System.out.printf(" %-40s%-1s%n", elementLeft, elementRight);
	}

	public void prompt() {
		print(P1);
	}

	public String getPrompt() {
		return P1;
	}

	public void selectFileScanner(Scanner scanner) {
		this.fileScanner = scanner;
	}

	public void selectConsoleScanner() {
		this.fileScanner = null;
	}
}

package client.apk;

import common.apk.model.CommandRequest;
import common.apk.model.CommandResponse;
import common.apk.model.Difficulty;
import common.apk.model.LabWork;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.InetSocketAddress;
import java.nio.channels.Channels;
import java.nio.channels.SocketChannel;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Client {
    private static final Logger logger = Logger.getLogger(Client.class.getName());
    private static final int MAX_RETRIES = 3;
    private static final long RETRY_DELAY = 5000; // 5 seconds

    private final String host;
    private final int port;
    private SocketChannel socketChannel;
    private ObjectInputStream inputStream;
    private ObjectOutputStream outputStream;
    private boolean isConnected;
    private final Scanner scanner;

    public Client(String host, int port) {
        this.host = host;
        this.port = port;
        this.isConnected = false;
        this.scanner = new Scanner(System.in);
    }

    public void start() {
        try {
            if (!connectWithRetry()) {
                logger.severe("Failed to connect to server after " + MAX_RETRIES + " attempts");
                return;
            }

            System.out.println("Connected to server. Type 'help' for available commands or 'exit' to quit.");

            while (true) {
                System.out.print("> ");
                String input = scanner.nextLine().trim();

                if ("exit".equalsIgnoreCase(input)) {
                    break;
                }

                try {
                    CommandResponse response = sendCommand(input);
                    if (response.isSuccess()) {
                        System.out.println(response.getMessage());
                        if (response.getData() != null) {
                            System.out.println(response.getData());
                        }
                    } else {
                        System.err.println("Error: " + response.getMessage());
                    }
                } catch (Exception e) {
                    logger.log(Level.SEVERE, "Error processing command", e);
                    System.err.println("Error: " + e.getMessage());
                    if (!reconnect()) {
                        break;
                    }
                }
            }
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error in client", e);
        } finally {
            disconnect();
            scanner.close();
        }
    }

    private boolean connectWithRetry() {
        for (int i = 0; i < MAX_RETRIES; i++) {
            try {
                connect();
                if (isConnected) {
                    return true;
                }
                logger.warning("Connection attempt " + (i + 1) + " failed, retrying in " + (RETRY_DELAY/1000) + " seconds...");
                Thread.sleep(RETRY_DELAY);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                return false;
            }
        }
        return false;
    }

    private boolean reconnect() {
        disconnect();
        return connectWithRetry();
    }

    private void connect() {
        try {
            socketChannel = SocketChannel.open();
            socketChannel.connect(new InetSocketAddress(host, port));
            outputStream = new ObjectOutputStream(Channels.newOutputStream(socketChannel));
            inputStream = new ObjectInputStream(Channels.newInputStream(socketChannel));
            isConnected = true;
            logger.info("Connected to server at " + host + ":" + port);
        } catch (IOException e) {
            logger.log(Level.SEVERE, "Failed to connect to server", e);
            isConnected = false;
        }
    }

    private void disconnect() {
        try {
            if (socketChannel != null) {
                socketChannel.close();
                socketChannel = null;
            }
            if (inputStream != null) {
                inputStream.close();
            }
            if (outputStream != null) {
                outputStream.close();
            }
            isConnected = false;
            logger.info("Disconnected from server");
        } catch (IOException e) {
            logger.log(Level.SEVERE, "Error disconnecting from server", e);
        }
    }

    private CommandResponse sendCommand(String command) throws IOException, ClassNotFoundException {
        if (!isConnected) {
            throw new IOException("Not connected to server");
        }
        
        String[] parts = command.split(" ", 2);
        String commandName = parts[0].toLowerCase();
        Object[] arguments = new Object[0];

        switch (commandName) {
            case "add":
            case "add_if_max":
            case "remove_greater":
            case "remove_lower":
                arguments = handleLabWorkCommand(commandName, parts);
                break;
            case "update":
                if (parts.length > 1) {
                    try {
                        String[] updateParts = parts[1].split(" ", 2);
                        Long id = Long.parseLong(updateParts[0]);
                        arguments = new Object[]{id, handleLabWorkCommand(commandName, new String[]{commandName, updateParts[1]})[0]};
                    } catch (NumberFormatException e) {
                        throw new IllegalArgumentException("Invalid ID format");
                    }
                }
                break;
            case "filter_greater_than_difficulty":
                arguments = handleDifficultyCommand();
                break;
            case "remove_by_id":
                if (parts.length > 1) {
                    try {
                        arguments = new Object[]{Long.parseLong(parts[1])};
                    } catch (NumberFormatException e) {
                        throw new IllegalArgumentException("Invalid ID format");
                    }
                }
                break;
            case "save":
            case "load":
            case "execute_script":
                if (parts.length > 1) {
                    arguments = new Object[]{parts[1]};
                }
                break;
        }
        
        CommandRequest request = new CommandRequest(commandName, arguments);
        outputStream.writeObject(request);
        
        return (CommandResponse) inputStream.readObject();
    }

    private Object[] handleLabWorkCommand(String commandName, String[] parts) {
        LabWork labWork = new LabWork();
        // Fill lab work fields based on command type
        // This should be implemented based on your LabWork class structure
        return new Object[]{labWork};
    }

    private Object[] handleDifficultyCommand() {
        System.out.println("Choose difficulty from: ");
        for (Difficulty diff : Difficulty.values()) {
            System.out.println(diff.name());
        }
        
        while (true) {
            try {
                String response = scanner.nextLine().toUpperCase();
                return new Object[]{Difficulty.valueOf(response)};
            } catch (IllegalArgumentException e) {
                System.out.println("Invalid difficulty. Please choose from the available options.");
            }
        }
    }

    public static void main(String[] args) {
        String host = "localhost";
        int port = 6452;

        if (args.length > 0) {
            host = args[0];
        }
        if (args.length > 1) {
            try {
                port = Integer.parseInt(args[1]);
            } catch (NumberFormatException e) {
                logger.severe("Invalid port number");
                return;
            }
        }

        Client client = new Client(host, port);
        client.start();
    }
} 
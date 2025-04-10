package server.apk;

import common.apk.model.CommandRequest;
import common.apk.model.CommandResponse;
import server.apk.manager.CollectionManager;
import server.apk.manager.CommandManager;

import java.io.EOFException;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.InetSocketAddress;
import java.nio.channels.Channels;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Server {
    private static final Logger logger = Logger.getLogger(Server.class.getName());
    private final int port;
    private final CollectionManager collectionManager;
    private final CommandManager commandManager;
    private ServerSocketChannel serverSocketChannel;
    private boolean isRunning;

    public Server(int port, String filePath) {
        this.port = port;
        this.collectionManager = new CollectionManager(filePath);
        this.commandManager = new CommandManager(collectionManager);
        this.isRunning = true;
    }

    public void start() {
        try {
            serverSocketChannel = ServerSocketChannel.open();
            serverSocketChannel.bind(new InetSocketAddress(port));
            serverSocketChannel.configureBlocking(false);
            logger.info("Server started on port " + port);

            while (isRunning) {
                try {
                    SocketChannel clientChannel = serverSocketChannel.accept();
                    if (clientChannel != null) {
                        handleClient(clientChannel);
                    }
                } catch (IOException e) {
                    logger.log(Level.SEVERE, "Error accepting client connection", e);
                }
            }
        } catch (IOException e) {
            logger.log(Level.SEVERE, "Error starting server", e);
        }
    }

    private void handleClient(SocketChannel clientChannel) {
        try {
            // Configure client channel for blocking I/O
            clientChannel.configureBlocking(true);
            logger.info("New client connected: " + clientChannel.getRemoteAddress());

            // Create input and output streams
            ObjectInputStream inputStream = new ObjectInputStream(Channels.newInputStream(clientChannel));
            ObjectOutputStream outputStream = new ObjectOutputStream(Channels.newOutputStream(clientChannel));

            // Send initial connection success message
            outputStream.writeObject(new CommandResponse(true, "Connected successfully to server", null));

            while (clientChannel.isConnected()) {
                try {
                    Object request = inputStream.readObject();
                    if (request instanceof CommandRequest) {
                        CommandRequest commandRequest = (CommandRequest) request;
                        CommandResponse response = commandManager.executeCommand(commandRequest);
                        outputStream.writeObject(response);
                    }
                } catch (EOFException e) {
                    break;
                } catch (Exception e) {
                    logger.log(Level.SEVERE, "Error processing client request", e);
                    outputStream.writeObject(new CommandResponse(false, "Error: " + e.getMessage(), null));
                    break;
                }
            }

            clientChannel.close();
            logger.info("Client disconnected: " + clientChannel.getRemoteAddress());
        } catch (IOException e) {
            logger.log(Level.SEVERE, "Error handling client", e);
        }
    }

    public void stop() {
        isRunning = false;
        try {
            if (serverSocketChannel != null) {
                serverSocketChannel.close();
                serverSocketChannel = null;
            }
        } catch (IOException e) {
            logger.log(Level.SEVERE, "Error stopping server", e);
        }
    }

    public static void main(String[] args) {
        int port = 6574; // Default port
        String filePath = "data.csv"; // Default file path

        if (args.length > 0) {
            try {
                port = Integer.parseInt(args[0]);
            } catch (NumberFormatException e) {
                logger.severe("Invalid port number");
                return;
            }
        }

        if (args.length > 1) {
            filePath = args[1];
        }

        Server server = new Server(port, filePath);
        server.start();
    }
} 
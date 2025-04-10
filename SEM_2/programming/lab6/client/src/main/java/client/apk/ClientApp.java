package client.apk;

import java.util.logging.Level;
import java.util.logging.Logger;

public class ClientApp {
    private static final Logger logger = Logger.getLogger(ClientApp.class.getName());

    public static void main(String[] args) {
        try {
            // Configure logging
            System.setProperty("java.util.logging.SimpleFormatter.format",
                    "%1$tF %1$tT %4$s %2$s %5$s%6$s%n");

            // Connect to localhost:5000 by default
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
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Client application error", e);
        }
    }
} 
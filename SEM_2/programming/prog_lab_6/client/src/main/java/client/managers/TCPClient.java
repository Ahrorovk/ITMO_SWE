package client.managers;

import java.io.*;
import java.net.InetSocketAddress;
import java.nio.channels.SocketChannel;
import java.util.Scanner;


public class TCPClient {
  private final InetSocketAddress host;
  private SocketChannel socketChannel;
  private final ClientReceivingManager receivingManager;
  private final ClientSendingManager sendingManager;

  public TCPClient(String host, int port) {
    this.host = new InetSocketAddress(host, port);
    this.receivingManager = new ClientReceivingManager(this);
    this.sendingManager = new ClientSendingManager(this);
  }

  /**
   * Основной старт / переподключение к серверу
   */
  public void start() {
    try {
      if (socketChannel != null && socketChannel.isOpen()) {
        socketChannel.close();
      }
      socketChannel = SocketChannel.open();
      socketChannel.configureBlocking(false);
      socketChannel.connect(host);
      // Завершаем неблокирующий коннект
      while (!socketChannel.finishConnect()) {
        Thread.sleep(50);
      }
      System.out.println("Connected to " + host);
    } catch (IOException | InterruptedException e) {
      System.err.println("Failed to connect: " + e.getMessage());
      // Можно либо пробовать рекурсивно start(), либо бросить исключение выше
      throw new RuntimeException("Cannot start TCP client", e);
    }
  }

  public SocketChannel getSocketChannel() {
    return socketChannel;
  }

  public Object send(String cmd, Object payload) {
    try (var baos = new ByteArrayOutputStream();
         var oos = new ObjectOutputStream(baos)) {

      oos.writeUTF(cmd);
      oos.writeObject(payload);
      oos.flush();

      sendingManager.send(baos.toByteArray());
      byte[] responseBytes = receivingManager.receive();
      try (var ois = new ObjectInputStream(new ByteArrayInputStream(responseBytes))) {
        return ois.readObject();
      }
    } catch (Exception e) {
      System.err.println("Send/receive error: " + e.getMessage());
      return null;
    }
  }

  public boolean isConnected() {
    try {
      return socketChannel != null
        && socketChannel.isOpen()
        && socketChannel.finishConnect()
        && socketChannel.isConnected();
    } catch (IOException e) {
      return false;
    }
  }

  /**
   * Тихое переподключение: жмём 2 с и переподключаемся
   */
  public void reconnect() {
    System.err.println("Reconnecting to " + host + "...");
    start();
  }

  /**
   * Интерктивно сменить host:port по запросу пользователя
   */
  public void newIP() {
    var sc = new Scanner(System.in);
    System.out.println("Enter new host:port");
    while (true) {
      String line = sc.nextLine();
      String[] parts = line.split(":");
      try {
        if (parts.length == 2) {
          String addr = parts[0];
          int prt = Integer.parseInt(parts[1]);
          socketChannel.close();
        }
        break;
      } catch (Exception ex) {
        System.out.println("Invalid input, try again");
      }
    }
  }
}

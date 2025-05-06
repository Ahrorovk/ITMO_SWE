package client.managers;


import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;
import java.util.Arrays;

public class ClientSendingManager {
  private static final int PACKET_SIZE = 1024;
  private static final int DATA_SIZE = PACKET_SIZE - 1;

  private final TCPClient tcpClient;

  public ClientSendingManager(TCPClient tcpClient) {
    this.tcpClient = tcpClient;
  }

  public void send(byte[] data) throws InterruptedException, IOException {
    byte[][] chunks = new byte[(data.length + DATA_SIZE - 1) / DATA_SIZE][];
    for (int i = 0, off = 0; i < chunks.length; i++, off += DATA_SIZE) {
      int len = Math.min(DATA_SIZE, data.length - off);
      chunks[i] = Arrays.copyOfRange(data, off, off + len);
    }

    while (true) {
      try {
        SocketChannel channel = tcpClient.getSocketChannel();
        if (channel == null || !channel.isOpen() || !tcpClient.isConnected()) {
          tcpClient.reconnect();
          continue;
        }
        if (channel.isConnectionPending()) {
          channel.finishConnect();
        }

        // 2c) Send each chunk with end-of-message flag
        System.out.print("Sending " + chunks.length + " chunks…");
        for (int i = 0; i < chunks.length; i++) {
          byte[] chunk = chunks[i];
          ByteBuffer buf = ByteBuffer.allocate(chunk.length + 1);
          buf.put(chunk);
          buf.put(i == chunks.length - 1 ? (byte) 1 : (byte) 0);
          buf.flip();
          while (buf.hasRemaining()) {
            channel.write(buf);
          }
        }
        System.out.println(" done.");
        return;

      } catch (IOException ioe) {
        System.err.println("I/O error, reconnecting… " + ioe.getMessage());
        tcpClient.reconnect();
      }
    }
  }
}

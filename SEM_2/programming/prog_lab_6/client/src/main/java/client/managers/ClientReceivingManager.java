package client.managers;


import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;
import java.util.Arrays;
import java.util.Objects;
public class ClientReceivingManager {
  private static final int PACKET_SIZE = 1024;
  private final TCPClient tcpClient;
  private byte[] receivedData = new byte[0];

  public ClientReceivingManager(TCPClient tcpClient) {
    this.tcpClient = tcpClient;
  }

  public byte[] receive() throws InterruptedException, IOException {
    receivedData = new byte[0];
    ByteBuffer buf = ByteBuffer.allocate(PACKET_SIZE);

    while (true) {
      try {
        SocketChannel channel = tcpClient.getSocketChannel();

        if (channel == null || !channel.isOpen() || !channel.isConnected()) {
          tcpClient.reconnect();
          continue;
        }

        if (channel.isConnectionPending()) {
          channel.finishConnect();
        }


        buf.clear();
        int n = channel.read(buf);

        if (n > 0) {
           byte[] chunk = Arrays.copyOf(buf.array(), n - 1);
          ByteArrayOutputStream out = new ByteArrayOutputStream();
          out.write(receivedData);
          out.write(chunk);
          receivedData = out.toByteArray();

          if (buf.array()[n - 1] == 1) {
            return receivedData;
          }

        } else if (n < 0) {
          tcpClient.reconnect();

        } else {
          Thread.sleep(50);
        }

      } catch (IOException ioe) {
        tcpClient.reconnect();

      }
    }
  }
}

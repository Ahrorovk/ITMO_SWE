package client.managers;


import java.io.ByteArrayOutputStream;
import java.nio.ByteBuffer;
import java.util.Arrays;
import java.util.Objects;

public class ClientReceivingManager {

  private byte[] receivedData;
  private final int DATA_QUERY = 1024;
  private final TCPClient tcpClient;

  public ClientReceivingManager(TCPClient tcpClient) {
    this.tcpClient = tcpClient;
    this.receivedData = new byte[0];
  }

  public byte[] receive() {
    receivedData = new byte[0];
    for (; ; ) {
      try {
        if (tcpClient.getSocketChannel() == null)
          continue;


        while (tcpClient.getSocketChannel().isConnectionPending()) {
          tcpClient.getSocketChannel().finishConnect();
        }

        if (!tcpClient.getSocketChannel().isOpen()) {
          tcpClient.start();
          Thread.sleep(3000);
          continue;
        }
        ByteBuffer byteBuffer = ByteBuffer.allocate(DATA_QUERY);
        var readBytes = tcpClient.getSocketChannel().read(byteBuffer);
        if (readBytes == 0) {
          Thread.sleep(50);
          continue;
        }
        if (readBytes == -1)
          tcpClient.getSocketChannel().close();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        outputStream.write(receivedData);
        outputStream.write(Arrays.copyOf(byteBuffer.array(), byteBuffer.array().length - 1));
        receivedData = outputStream.toByteArray();
        if (byteBuffer.array()[readBytes - 1] == 1) {
          return receivedData;
        }
        byteBuffer.clear();
      } catch (Exception e) {
        if (Objects.equals(e.getMessage(), "Connection reset")) {
          try {
            Thread.sleep(3000);
            tcpClient.getSocketChannel().close();
            tcpClient.start();
          } catch (Exception e1) {
          }
        }
      }
    }
  }
}

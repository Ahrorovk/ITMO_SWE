package server.managers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.RecursiveTask;

public class TCPServer {

  /* ====== интерфейс «ядра» ======================================== */
  @FunctionalInterface
  public interface TCPExecute {
    Object apply(String cmd, Object arg, String login, String pass);
  }

  /* ====== поля ==================================================== */
  private static final Logger LOG = LoggerFactory.getLogger("TCPServer");

  private final int          port;
  private final TCPExecute   exec;
  private final HashSet<SocketChannel> sessions = new HashSet<>();
  private final ForkJoinPool pool = new ForkJoinPool();

  private Selector selector;

  public TCPServer(int port, TCPExecute exec) {
    this.port = port;
    this.exec = exec;
  }

  private static final int PKT = 64 * 1024;

  private static byte[] readPacket(SocketChannel ch) throws IOException {
    ByteBuffer buf = ByteBuffer.allocate(PKT);
    int n = ch.read(buf);
    if (n <= 0) return null;
    return Arrays.copyOf(buf.array(), n);
  }

  private static void writePacket(SocketChannel ch, byte[] data) throws IOException {
    ch.write(ByteBuffer.wrap(data));
  }

  /* ====== старт сервера ========================================== */
  public void start() {
    try {
      selector = Selector.open();
      ServerSocketChannel ssc = ServerSocketChannel.open();
      ssc.bind(new InetSocketAddress("localhost", port));
      ssc.configureBlocking(false);
      ssc.register(selector, SelectionKey.OP_ACCEPT);
      LOG.info("TCP server started on :" + port);

      while (true) {
        selector.select();
        Iterator<SelectionKey> it = selector.selectedKeys().iterator();
        while (it.hasNext()) {
          SelectionKey k = it.next(); it.remove();
          if (!k.isValid()) continue;
          if (k.isAcceptable()) accept(k);
          else if (k.isReadable()) process(k);
        }
      }
    } catch (IOException e) {
      LOG.error("server error: " + e.getMessage());
    }
  }

  private void accept(SelectionKey k) throws IOException {
    ServerSocketChannel ssc = (ServerSocketChannel) k.channel();
    SocketChannel ch = ssc.accept();
    ch.configureBlocking(false);
    ch.register(selector, SelectionKey.OP_READ);
    sessions.add(ch);
    LOG.info("accepted " + ch.getRemoteAddress());
  }

  private void process(SelectionKey k) {
    SocketChannel ch = (SocketChannel) k.channel();
    try {
      byte[] pkt = readPacket(ch);
      if (pkt == null) { ch.close(); return; }

      try (ObjectInputStream ois =
             new ObjectInputStream(new ByteArrayInputStream(pkt))) {

        String cmd   = ois.readUTF();
        String login = ois.readUTF();
        String pass  = ois.readUTF();
        Object arg   = ois.readObject();

        Object res = pool.invoke(new ExecTask(cmd, arg, login, pass));

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (ObjectOutputStream oos = new ObjectOutputStream(baos)) {
          oos.writeObject(res);
        }
        writePacket(ch, baos.toByteArray());
      }

    } catch (Exception e) {
      LOG.error("process: " + e.getMessage());
      try { ch.close(); } catch (IOException ignored) {}
    }
  }

  /* task для ForkJoinPool */
  private class ExecTask extends RecursiveTask<Object> {
    private final String c; private final Object a; private final String l,p;
    ExecTask(String c,Object a,String l,String p){this.c=c;this.a=a;this.l=l;this.p=p;}
    @Override protected Object compute(){ return exec.apply(c,a,l,p); }
  }
}

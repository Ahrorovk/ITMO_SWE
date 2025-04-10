package server.apk.network;

import common.apk.network.requests.Request;
import common.apk.network.responses.NoSuchCommandResponse;
import common.apk.network.responses.Response;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.SerializationException;
import org.apache.commons.lang3.SerializationUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.logging.log4j.Logger;
import server.apk.ServerApp;
import server.apk.handlers.CommandHandler;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.SocketAddress;
import java.net.SocketException;

/**
 * UDP обработчик запросов
 */
abstract class Server {
  private final InetSocketAddress addr;
  private final CommandHandler commandHandler;
  private Runnable afterHook;

  private final Logger logger = ServerApp.logger;

  private boolean running = true;

  public Server(InetSocketAddress addr, CommandHandler commandHandler) {
    this.addr = addr;
    this.commandHandler = commandHandler;
  }

  public InetSocketAddress getAddr() {
    return addr;
  }

  /**
   * Получает данные с клиента.
   * Возвращает пару из данных и адреса клиента
   */
  public abstract Pair<Byte[], SocketAddress> receiveData() throws IOException;

  /**
   * Отправляет данные клиенту
   */
  public abstract void sendData(byte[] data, SocketAddress addr) throws IOException;

  public abstract void connectToClient(SocketAddress addr) throws SocketException;

  public abstract void disconnectFromClient();
  public abstract void close();

  public void run() {
    logger.info("Server started by address " + addr);

    while (running) {
      Pair<Byte[], SocketAddress> dataPair;
      try {
        dataPair = receiveData();
      } catch (Exception e) {
        logger.error("Data retrieval error : " + e.toString(), e);
        disconnectFromClient();
        continue;
      }

      var dataFromClient = dataPair.getKey();
      var clientAddr = dataPair.getValue();

      try {
        connectToClient(clientAddr);
        logger.info("CONNECTED WITH " + clientAddr);
      } catch (Exception e) {
        logger.error("Connection error : " + e.toString(), e);
      }

      Request request;
      try {
        request = SerializationUtils.deserialize(ArrayUtils.toPrimitive(dataFromClient));
        logger.info("Processing " + request + " from " + clientAddr);
      } catch (SerializationException e) {
        logger.error("Not possible to implement the request object.", e);
        disconnectFromClient();
        continue;
      }

      Response response = null;
      try {
        response = commandHandler.handle(request);
        if (afterHook != null) afterHook.run();
      } catch (Exception e) {
        logger.error("Command execution error : " + e.toString(), e);
      }
      if (response == null) response = new NoSuchCommandResponse(request.getName());

      var data = SerializationUtils.serialize(response);
      logger.info("Response: " + response);

      try {
        sendData(data, clientAddr);
        logger.info("Response to client sent " + clientAddr);
      } catch (Exception e) {
        logger.error("Input-Output error : " + e.toString(), e);
      }

      disconnectFromClient();
      logger.info("Disconnect from client " + clientAddr);
    }

    close();
  }

  /**
   * Вызывает хук после каждого запроса.
   * @param afterHook хук, вызываемый после каждого запроса
   */
  public void setAfterHook(Runnable afterHook) {
    this.afterHook = afterHook;
  }

  public void stop() {
    running = false;
  }
}

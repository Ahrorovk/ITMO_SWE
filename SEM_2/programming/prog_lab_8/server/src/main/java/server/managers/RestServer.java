package server.managers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import common.model.CreateUserReq;
import common.model.LabWork;
import common.model.Response;
import common.model.SimpleResp;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import server.utility.LocalDateAdapter;
import server.utility.User;

import java.io.*;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.LocalDate;
import java.util.Map;
import java.util.UUID;

import static java.util.concurrent.Executors.newCachedThreadPool;

public class RestServer {

  private static final Logger log = LoggerFactory.getLogger(RestServer.class);
  private CommandManager commandManager;
  private UserManager userManager;
  private TokenManager tokenManager;

  private record CmdReq(String command, Object argument) {
  }

  private final Gson gson = new GsonBuilder()
    .registerTypeAdapter(LocalDate.class, new LocalDateAdapter())
    .create();
  private final TCPServer.TCPExecute exec;

  public RestServer(int port, TCPServer.TCPExecute exec, UserManager userManager, CommandManager commandManager, TokenManager tokenManager) throws IOException {
    this.exec = exec;
    this.userManager = userManager;
    this.commandManager = commandManager;
    this.tokenManager = tokenManager;
    HttpServer httpServer = HttpServer.create(new InetSocketAddress(port), 0);

    login(httpServer);

    add(httpServer);

    show(httpServer);

    httpServer.setExecutor(newCachedThreadPool());
    httpServer.start();
    System.out.println("REST started on :" + port);
  }

  private void login(HttpServer httpServer) {
    httpServer.createContext("/api/login", ex -> {
      if (!ex.getRequestMethod().equalsIgnoreCase("POST")) {
        ex.sendResponseHeaders(405, -1);
        return;
      }

      try (InputStreamReader rdr = new InputStreamReader(ex.getRequestBody())) {
        var req = gson.fromJson(rdr, CreateUserReq.class); // или LoginReq
        User u = userManager.getUser(req.login());

        if (u == null) {
          ex.sendResponseHeaders(401, -1);
          return;
        }

        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(req.password().getBytes());
        String passHash = java.util.HexFormat.of().formatHex(md.digest());

        if (!u.getPassword().equals(passHash)) {
          ex.sendResponseHeaders(403, -1);
          return;
        }
        String token = UUID.randomUUID().toString();

        boolean insertToken = userManager.insertToken(u,token);

        byte[] json = gson.toJson(Map.of("token", token)).getBytes();
        if(insertToken) {
          ex.getResponseHeaders().add("Content-Type", "application/json");
          ex.sendResponseHeaders(200, json.length);
          ex.getResponseBody().write(json);
          ex.close();
        }
        else {
          byte[] err = gson.toJson(new Response(500, "Something went wrong. Try again")).getBytes();
          ex.sendResponseHeaders(500, err.length);
          ex.getResponseBody().write(err);
          ex.close();
        }
      } catch (Exception e) {
        byte[] err = gson.toJson(new Response(500, e.getMessage())).getBytes();
        ex.sendResponseHeaders(500, err.length);
        ex.getResponseBody().write(err);
        ex.close();
      }
    });
  }

  private void add(HttpServer httpServer) {
    httpServer.createContext("/api/add", ex -> {
      if (!ex.getRequestMethod().equalsIgnoreCase("POST")) {
        ex.sendResponseHeaders(405, -1);
        return;
      }

      String token = ex.getRequestHeaders().getFirst("Authorization");
      if (token == null || !userManager.isValid(token)) {
        ex.sendResponseHeaders(401, -1);
        return;
      }

      User user = userManager.getUserByToken(token);

      try (InputStreamReader reader = new InputStreamReader(ex.getRequestBody())) {
        LabWork lab = gson.fromJson(reader, LabWork.class);
        Response resp = commandManager.getCommands().get("add").apply(new String[]{"add", ""}, lab, user);
        byte[] json = gson.toJson(resp).getBytes();

        ex.getResponseHeaders().add("Content-Type", "application/json");
        ex.sendResponseHeaders(200, json.length);
        ex.getResponseBody().write(json);
        ex.close();
      } catch (Exception e) {
        byte[] err = gson.toJson(new Response(500, e.getMessage())).getBytes();
        ex.sendResponseHeaders(500, err.length);
        ex.getResponseBody().write(err);
        ex.close();
      }
    });
  }

  private void show(HttpServer httpServer) {
    httpServer.createContext("/api/show", ex -> {
      try {
        if (!ex.getRequestMethod().equalsIgnoreCase("GET")) {
          ex.sendResponseHeaders(405, -1);
          ex.close();
          return;
        }

        String token = ex.getRequestHeaders().getFirst("Authorization");
        if (token == null || !userManager.isValid(token)) {
          ex.sendResponseHeaders(401, -1);
          ex.close();
          return;
        }

        User user = userManager.getUserByToken(token);
        Response response = commandManager.getCommands().get("show").apply(new String[]{"show", ""}, null, user);

        byte[] json = gson.toJson(response).getBytes(StandardCharsets.UTF_8);
        ex.getResponseHeaders().add("Content-Type", "application/json");
        ex.sendResponseHeaders(200, json.length);
        ex.getResponseBody().write(json);
        ex.getResponseBody().flush();
        ex.close();

      } catch (Exception e) {
        e.printStackTrace();
        byte[] err = gson.toJson(new Response(500, e.getMessage())).getBytes(StandardCharsets.UTF_8);
        try {
          ex.getResponseHeaders().add("Content-Type", "application/json");
          ex.sendResponseHeaders(500, err.length);
          ex.getResponseBody().write(err);
        } catch (Exception ignore) {}
        ex.close();
      }
    });


  }

}

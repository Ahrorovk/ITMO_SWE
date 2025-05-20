package server.managers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.sun.net.httpserver.HttpServer;
import common.dto.ByIdRequest;
import common.dto.CreateUserReq;
import common.dto.FilterDifficultyRequest;
import common.dto.UpdateLabWorkRequest;
import common.model.LabWork;
import common.model.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import server.utility.LocalDateAdapter;
import server.utility.User;

import java.io.IOException;
import java.io.InputStreamReader;
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
  private HttpServer httpServer;
  private CollectionManager collectionManager;

  private final Gson gson = new GsonBuilder()
    .registerTypeAdapter(LocalDate.class, new LocalDateAdapter())
    .create();
  private final TCPServer.TCPExecute exec;

  public RestServer(int port, TCPServer.TCPExecute exec, UserManager userManager, CommandManager commandManager, CollectionManager collectionManager) throws IOException {

    this.exec = exec;

    this.userManager = userManager;

    this.commandManager = commandManager;

    this.collectionManager = collectionManager;

    httpServer = HttpServer.create(new InetSocketAddress(port), 0);

    login();

    signUp();

    add();

    add_if_max();

    clear();

    show();

    filterGreaterThanDifficulty();

    info();

    minByMaximumPoint();

    printUniqueDiscipline();

    removeById();

    removeGreater();

    removeLower();

    reorder();

    update();

    httpServer.setExecutor(newCachedThreadPool());

    httpServer.start();

    System.out.println("REST started on :" + port);
  }

  private void login() {
    httpServer.createContext("/api/login", ex -> {
      if (!ex.getRequestMethod().equalsIgnoreCase("POST")) {
        ex.sendResponseHeaders(405, -1);
        return;
      }

      try (InputStreamReader rdr = new InputStreamReader(ex.getRequestBody())) {
        var req = gson.fromJson(rdr, CreateUserReq.class);
        if (req == null) {
          byte[] err = gson.toJson(new Response(400, "Request is null!")).getBytes();
          ex.sendResponseHeaders(400, err.length);
          ex.getResponseBody().write(err);
          ex.close();
          return;
        }

        User u = userManager.getUser(req.getLogin());
        if (u == null) {
          byte[] err = gson.toJson(new Response(401, "UnAuthorized!")).getBytes();
          ex.getResponseBody().write(err);
          ex.sendResponseHeaders(401, -1);
          return;
        }

        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(req.getPassword().getBytes());
        byte[] digest = md.digest();
        String passHash = java.util.HexFormat.of().formatHex(digest);
        if (!u.getPassword().equals(passHash)) {
          ex.sendResponseHeaders(403, -1);
          return;
        }
        String token = UUID.randomUUID().toString();

        boolean insertToken = userManager.insertToken(u, token);

        byte[] json = gson.toJson(new Response(200,"Success",token)).getBytes();

        if (insertToken) {
          collectionManager.selectByID((int) u.getID());
          System.out.println(collectionManager.getCollection());
          ex.getResponseHeaders().add("Content-Type", "application/json");

          ex.sendResponseHeaders(200, json.length);
          ex.getResponseBody().write(json);
          ex.close();
        } else {
          byte[] err = gson.toJson(new Response(500, "Something went wrong. Try again")).getBytes();
          ex.sendResponseHeaders(500, err.length);
          ex.getResponseBody().write(err);
          ex.close();
        }
      } catch (Exception e) {
        byte[] err = gson.toJson(new Response(500, e.getMessage())).getBytes();
        System.out.println(e.getMessage());
        ex.sendResponseHeaders(500, err.length);
        ex.getResponseBody().write(err);
        ex.close();
      }
    });
  }

  private void signUp() {
    httpServer.createContext("/api/sign-up", ex -> {
      if (!ex.getRequestMethod().equalsIgnoreCase("POST")) {
        ex.sendResponseHeaders(405, -1);
        return;
      }

      try (InputStreamReader rdr = new InputStreamReader(ex.getRequestBody())) {
        var req = gson.fromJson(rdr, CreateUserReq.class);
        if (req == null) {
          byte[] err = gson.toJson(new Response(400, "Request is null!")).getBytes();
          ex.sendResponseHeaders(400, err.length);
          ex.getResponseBody().write(err);
          ex.close();
          return;
        }
        String b = userManager.addUser(req.getLogin(), req.getPassword());
        if (b.isEmpty()) {
          User u = userManager.getUser(req.getLogin());

          String token = UUID.randomUUID().toString();

          boolean insertToken = userManager.insertToken(u, token);

          byte[] json = gson.toJson(new Response(200,"Success",token)).getBytes();

          if (insertToken) {
            collectionManager.selectByID((int) u.getID());
            ex.getResponseHeaders().add("Content-Type", "application/json");
            ex.sendResponseHeaders(200, json.length);
            ex.getResponseBody().write(json);
            ex.close();
          } else {
            byte[] err = gson.toJson(new Response(500, "Something went wrong. Try again")).getBytes();
            ex.sendResponseHeaders(500, err.length);
            ex.getResponseBody().write(err);
            ex.close();
          }
        } else {
          byte[] err = gson.toJson(new Response(401, b)).getBytes();
          ex.sendResponseHeaders(401, err.length);
          ex.getResponseBody().write(err);
        }
      } catch (Exception e) {
        byte[] err = gson.toJson(new Response(500, e.getMessage())).getBytes();
        System.out.println(e.getMessage());
        ex.sendResponseHeaders(500, err.length);
        ex.getResponseBody().write(err);
        ex.close();
      }
    });
  }

  private void add() {
    httpServer.createContext("/api/lab-works/add", ex -> {
      if (!ex.getRequestMethod().equalsIgnoreCase("POST")) {
        ex.sendResponseHeaders(405, -1);
        return;
      }

      String token = ex.getRequestHeaders().getFirst("Authorization");
      if (token == null || !userManager.isValid(token)) {
        byte[] err = gson.toJson(new Response(401, "UnAuthorized!")).getBytes();
        ex.getResponseBody().write(err);
        ex.sendResponseHeaders(401, -1);
        return;
      }

      User user = userManager.getUserByToken(token);

      try (InputStreamReader reader = new InputStreamReader(ex.getRequestBody())) {
        LabWork lab = gson.fromJson(reader, LabWork.class);
        System.out.println(lab.toString());
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

  private void clear() {
    httpServer.createContext("/api/lab-works/clear", ex -> {
      if (!ex.getRequestMethod().equalsIgnoreCase("GET")) {
        ex.sendResponseHeaders(405, -1);
        return;
      }

      String token = ex.getRequestHeaders().getFirst("Authorization");
      if (token == null || !userManager.isValid(token)) {
        byte[] err = gson.toJson(new Response(401, "UnAuthorized!")).getBytes();
        ex.getResponseBody().write(err);
        ex.sendResponseHeaders(401, -1);
        return;
      }

      User user = userManager.getUserByToken(token);

      try {
        Response resp = commandManager.getCommands().get("clear").apply(new String[]{"clear", ""}, new Object(), user);
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


  private void add_if_max() {
    httpServer.createContext("/api/lab-works/add-if-max", ex -> {
      if (!ex.getRequestMethod().equalsIgnoreCase("POST")) {
        ex.sendResponseHeaders(405, -1);
        return;
      }

      String token = ex.getRequestHeaders().getFirst("Authorization");
      if (token == null || !userManager.isValid(token)) {
        byte[] err = gson.toJson(new Response(401, "UnAuthorized!")).getBytes();
        ex.getResponseBody().write(err);
        ex.sendResponseHeaders(401, -1);
        return;
      }

      User user = userManager.getUserByToken(token);

      try (InputStreamReader reader = new InputStreamReader(ex.getRequestBody())) {
        LabWork lab = gson.fromJson(reader, LabWork.class);
        Response resp = commandManager.getCommands().get("add_if_max").apply(new String[]{"add_if_max", ""}, lab, user);
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

  private void show() {
    httpServer.createContext("/api/lab-works/show", ex -> {
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
        } catch (Exception ignore) {
        }
        ex.close();
      }
    });
  }

  private void filterGreaterThanDifficulty() {
    httpServer.createContext("/api/lab-works/filter-greater-difficulty", ex -> {
      if (!ex.getRequestMethod().equalsIgnoreCase("GET")) {
        ex.sendResponseHeaders(405, -1);
        return;
      }

      try (InputStreamReader rdr = new InputStreamReader(ex.getRequestBody())) {
        FilterDifficultyRequest req = gson.fromJson(rdr, FilterDifficultyRequest.class);
        if (req == null || req.getDifficulty() == null) {
          byte[] err = gson.toJson(Map.of(
            "exitCode", 400,
            "message", "difficulty required"
          )).getBytes();
          ex.sendResponseHeaders(400, err.length);
          ex.getResponseBody().write(err);
          ex.close();
          return;
        }
        String token = ex.getRequestHeaders().getFirst("Authorization");
        if (token == null || !userManager.isValid(token)) {
          byte[] err = gson.toJson(new Response(401, "UnAuthorized!")).getBytes();
          ex.getResponseBody().write(err);
          ex.sendResponseHeaders(401, -1);
          ex.close();
          return;
        }

        User user = userManager.getUserByToken(token);
        Response response = commandManager.getCommands().get("filter_greater_difficulty").apply(new String[]{"filter_greater_difficulty", ""}, req, user);

        byte[] json = gson.toJson(response).getBytes();
        ex.getResponseHeaders().add("Content-Type", "application/json");
        ex.sendResponseHeaders(200, json.length);
        ex.getResponseBody().write(json);
        ex.close();

      } catch (Exception e) {
        byte[] err = gson.toJson(Map.of(
          "exitCode", 500,
          "message", e.getMessage()
        )).getBytes();
        ex.sendResponseHeaders(500, err.length);
        ex.getResponseBody().write(err);
        ex.close();
      }
    });
  }

  private void info() {
    httpServer.createContext("/api/lab-works/info", ex -> {
      if (!ex.getRequestMethod().equalsIgnoreCase("GET")) {
        ex.sendResponseHeaders(405, -1);
        return;
      }

      try {
        String token = ex.getRequestHeaders().getFirst("Authorization");
        if (token == null || !userManager.isValid(token)) {
          byte[] err = gson.toJson(new Response(401, "UnAuthorized!")).getBytes();
          ex.getResponseBody().write(err);
          ex.sendResponseHeaders(401, -1);
          ex.close();
          return;
        }

        User user = userManager.getUserByToken(token);
        Response response = commandManager.getCommands().get("info").apply(new String[]{"info", ""}, null, user);

        byte[] json = gson.toJson(response).getBytes();
        ex.getResponseHeaders().add("Content-Type", "application/json");
        ex.sendResponseHeaders(200, json.length);
        ex.getResponseBody().write(json);
        ex.close();

      } catch (Exception e) {
        byte[] err = gson.toJson(Map.of(
          "exitCode", 500,
          "message", e.getMessage()
        )).getBytes();
        ex.sendResponseHeaders(500, err.length);
        ex.getResponseBody().write(err);
        ex.close();
      }
    });
  }

  private void minByMaximumPoint() {
    httpServer.createContext("/api/lab-works/min-by-maximum-point", ex -> {
      if (!ex.getRequestMethod().equalsIgnoreCase("GET")) {
        ex.sendResponseHeaders(405, -1);
        return;
      }

      try {
        String token = ex.getRequestHeaders().getFirst("Authorization");
        if (token == null || !userManager.isValid(token)) {
          byte[] err = gson.toJson(new Response(401, "UnAuthorized!")).getBytes();
          ex.getResponseBody().write(err);
          ex.sendResponseHeaders(401, -1);
          ex.close();
          return;
        }

        User user = userManager.getUserByToken(token);
        Response response = commandManager.getCommands().get("min_by_maximum_point").apply(new String[]{"min_by_maximum_point", ""}, null, user);

        byte[] json = gson.toJson(response).getBytes();
        ex.getResponseHeaders().add("Content-Type", "application/json");
        ex.sendResponseHeaders(200, json.length);
        ex.getResponseBody().write(json);
        ex.close();

      } catch (Exception e) {
        byte[] err = gson.toJson(Map.of(
          "exitCode", 500,
          "message", e.getMessage()
        )).getBytes();
        ex.sendResponseHeaders(500, err.length);
        ex.getResponseBody().write(err);
        ex.close();
      }
    });
  }

  private void printUniqueDiscipline() {
    httpServer.createContext("/api/lab-works/print-unique-discipline", ex -> {
      if (!ex.getRequestMethod().equalsIgnoreCase("GET")) {
        ex.sendResponseHeaders(405, -1);
        return;
      }

      try {
        String token = ex.getRequestHeaders().getFirst("Authorization");
        if (token == null || !userManager.isValid(token)) {
          byte[] err = gson.toJson(new Response(401, "UnAuthorized!")).getBytes();
          ex.getResponseBody().write(err);
          ex.sendResponseHeaders(401, -1);
          ex.close();
          return;
        }

        User user = userManager.getUserByToken(token);
        System.out.println(user.getID());
        Response response = commandManager.getCommands().get("print_unique_discipline").apply(new String[]{"print_unique_discipline", ""}, null, user);

        byte[] json = gson.toJson(response).getBytes();
        ex.getResponseHeaders().add("Content-Type", "application/json");
        ex.sendResponseHeaders(200, json.length);
        ex.getResponseBody().write(json);
        ex.close();

      } catch (Exception e) {
        byte[] err = gson.toJson(Map.of(
          "exitCode", 500,
          "message", e.getMessage()
        )).getBytes();
        ex.sendResponseHeaders(500, err.length);
        ex.getResponseBody().write(err);
        ex.close();
      }
    });
  }

  private void removeById() {
    httpServer.createContext("/api/lab-works/remove-by-id", ex -> {
      if (!ex.getRequestMethod().equalsIgnoreCase("POST")) {
        ex.sendResponseHeaders(405, -1);
        return;
      }

      try (InputStreamReader reader = new InputStreamReader(ex.getRequestBody())) {
        ByIdRequest id = gson.fromJson(reader, ByIdRequest.class);
        if (id == null) {
          byte[] err = gson.toJson(Map.of(
            "exitCode", 400,
            "message", "id required"
          )).getBytes();
          ex.sendResponseHeaders(400, err.length);
          ex.getResponseBody().write(err);
          ex.close();
          return;
        }

        String token = ex.getRequestHeaders().getFirst("Authorization");
        if (token == null || !userManager.isValid(token)) {
          byte[] err = gson.toJson(new Response(401, "UnAuthorized!")).getBytes();
          ex.getResponseBody().write(err);
          ex.sendResponseHeaders(401, -1);
          ex.close();
          return;
        }

        User user = userManager.getUserByToken(token);
        Response response = commandManager.getCommands().get("remove_by_id").apply(new String[]{"remove_by_id", id.getId().toString()}, null, user);

        byte[] json = gson.toJson(response).getBytes();
        ex.getResponseHeaders().add("Content-Type", "application/json");
        ex.sendResponseHeaders(200, json.length);
        ex.getResponseBody().write(json);
        ex.close();

      } catch (Exception e) {
        byte[] err = gson.toJson(Map.of(
          "exitCode", 500,
          "message", e.getMessage()
        )).getBytes();
        ex.sendResponseHeaders(500, err.length);
        ex.getResponseBody().write(err);
        ex.close();
      }
    });
  }

  private void removeGreater() {
    httpServer.createContext("/api/lab-works/remove-greater", ex -> {
      if (!ex.getRequestMethod().equalsIgnoreCase("POST")) {
        ex.sendResponseHeaders(405, -1);
        return;
      }

      try {
        String token = ex.getRequestHeaders().getFirst("Authorization");
        if (token == null || !userManager.isValid(token)) {
          byte[] err = gson.toJson(new Response(401, "UnAuthorized!")).getBytes();
          ex.getResponseBody().write(err);
          ex.sendResponseHeaders(401, -1);
          ex.close();
          return;
        }

        User user = userManager.getUserByToken(token);
        Response response = commandManager.getCommands().get("remove_greater").apply(new String[]{"remove_greater", ""}, null, user);

        byte[] json = gson.toJson(response).getBytes();
        ex.getResponseHeaders().add("Content-Type", "application/json");
        ex.sendResponseHeaders(200, json.length);
        ex.getResponseBody().write(json);
        ex.close();

      } catch (Exception e) {
        byte[] err = gson.toJson(Map.of(
          "exitCode", 500,
          "message", e.getMessage()
        )).getBytes();
        ex.sendResponseHeaders(500, err.length);
        ex.getResponseBody().write(err);
        ex.close();
      }
    });
  }

  private void removeLower() {
    httpServer.createContext("/api/lab-works/remove-lower", ex -> {
      if (!ex.getRequestMethod().equalsIgnoreCase("POST")) {
        ex.sendResponseHeaders(405, -1);
        return;
      }

      try {
        String token = ex.getRequestHeaders().getFirst("Authorization");
        if (token == null || !userManager.isValid(token)) {
          byte[] err = gson.toJson(new Response(401, "UnAuthorized!")).getBytes();
          ex.getResponseBody().write(err);
          ex.sendResponseHeaders(401, -1);
          ex.close();
          return;
        }

        User user = userManager.getUserByToken(token);
        Response response = commandManager.getCommands().get("remove_lower").apply(new String[]{"remove_lower", ""}, null, user);

        byte[] json = gson.toJson(response).getBytes();
        ex.getResponseHeaders().add("Content-Type", "application/json");
        ex.sendResponseHeaders(200, json.length);
        ex.getResponseBody().write(json);
        ex.close();

      } catch (Exception e) {
        byte[] err = gson.toJson(Map.of(
          "exitCode", 500,
          "message", e.getMessage()
        )).getBytes();
        ex.sendResponseHeaders(500, err.length);
        ex.getResponseBody().write(err);
        ex.close();
      }
    });
  }

  private void reorder() {
    httpServer.createContext("/api/lab-works/reorder", ex -> {
      if (!ex.getRequestMethod().equalsIgnoreCase("POST")) {
        ex.sendResponseHeaders(405, -1);
        return;
      }

      try {
        String token = ex.getRequestHeaders().getFirst("Authorization");
        if (token == null || !userManager.isValid(token)) {
          byte[] err = gson.toJson(new Response(401, "UnAuthorized!")).getBytes();
          ex.getResponseBody().write(err);
          ex.sendResponseHeaders(401, -1);
          ex.close();
          return;
        }

        User user = userManager.getUserByToken(token);
        Response response = commandManager.getCommands().get("reorder").apply(new String[]{"reorder", ""}, null, user);

        byte[] json = gson.toJson(response).getBytes();
        ex.getResponseHeaders().add("Content-Type", "application/json");
        ex.sendResponseHeaders(200, json.length);
        ex.getResponseBody().write(json);
        ex.close();

      } catch (Exception e) {
        byte[] err = gson.toJson(Map.of(
          "exitCode", 500,
          "message", e.getMessage()
        )).getBytes();
        ex.sendResponseHeaders(500, err.length);
        ex.getResponseBody().write(err);
        ex.close();
      }
    });
  }

  private void update() {
    httpServer.createContext("/api/lab-works/update", ex -> {
      if (!ex.getRequestMethod().equalsIgnoreCase("POST")) {
        ex.sendResponseHeaders(405, -1);
        return;
      }

      try (InputStreamReader reader = new InputStreamReader(ex.getRequestBody())) {
        UpdateLabWorkRequest req = gson.fromJson(reader, UpdateLabWorkRequest.class);
        if ( req.getId() == null) {
          byte[] err = gson.toJson(Map.of(
            "exitCode", 400,
            "message", "id required"
          )).getBytes();
          ex.sendResponseHeaders(400, err.length);
          ex.getResponseBody().write(err);
          ex.close();
          return;
        }
        String token = ex.getRequestHeaders().getFirst("Authorization");
        if (token == null || !userManager.isValid(token)) {
          byte[] err = gson.toJson(new Response(401, "UnAuthorized!")).getBytes();
          ex.getResponseBody().write(err);
          ex.sendResponseHeaders(401, -1);
          ex.close();
          return;
        }

        User user = userManager.getUserByToken(token);
        Response response = commandManager.getCommands().get("update").apply(new String[]{"update", req.getId().toString()}, req.getLabWork(), user);

        byte[] json = gson.toJson(response).getBytes();
        ex.getResponseHeaders().add("Content-Type", "application/json");
        ex.sendResponseHeaders(200, json.length);
        ex.getResponseBody().write(json);
        ex.close();

      } catch (Exception e) {
        byte[] err = gson.toJson(Map.of(
          "exitCode", 500,
          "message", e.getMessage()
        )).getBytes();
        ex.sendResponseHeaders(500, err.length);
        ex.getResponseBody().write(err);
        ex.close();
      }
    });
  }

}

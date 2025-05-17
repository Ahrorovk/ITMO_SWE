package server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import server.commands.*;
import server.managers.*;
import server.utility.Runner;
import server.utility.StandardConsole;

import java.io.IOException;

public class Main {

  private static final Logger LOG = LoggerFactory.getLogger("Main");

  public static void main(String[] args) {

    /* ─────────── инициализация среды ─────────── */
    StandardConsole console = new StandardConsole();
    PropertyManager props = new PropertyManager("prop.ini", console);
    if (!props.readConf()) System.exit(1);

    BDManager db = new BDManager(
      props.getProperty("DB_URL", "jdbc:postgresql://localhost:5432/studs"),
      props.getProperty("DB_USER", "postgres"),
      props.getProperty("DB_PASSWORD", "pass"),
      console
    );

    DumpManager dump = new DumpManager(db, props, console);
    if (!dump.initTables()) System.exit(1);

    UserManager userMgr = new UserManager(dump);
    userMgr.init();
    CollectionManager collMgr = new CollectionManager(dump, userMgr);
    collMgr.init();

    /* ─────────── команды ─────────── */
    CommandManager cmdMgr = CommandConfigurator.configure(userMgr, collMgr);

    /* ─────────── ядро вызова команд ─────────── */
    Runner runner = new Runner(console, cmdMgr, userMgr);

    TokenManager tokenManager = new TokenManager();
    /* =========================================================== */
    /*                         TCP-СЕРВЕР                           */
    /* =========================================================== */
    int tcpPort = props.getProperty("PORT", 2366);
    TCPServer tcp = new TCPServer(tcpPort, runner::executeCommand);
    new Thread(tcp::start, "tcp-server").start();
    LOG.info("TCP server listening on :{}", tcpPort);

    /* =========================================================== */
    /*                         REST-СЕРВЕР                         */
    /* =========================================================== */
    int restPort = props.getProperty("REST_PORT", 8080);
    try {
      new RestServer(restPort, runner::executeCommand, userMgr, cmdMgr, tokenManager);  // запускается в конструкторе
      LOG.info("REST server listening on :{} (/api/command)", restPort);
    } catch (IOException e) {
      LOG.error("REST server failed: {}", e.getMessage());
    }
  }

  /* ---------------------------------------------------------------
     Вынес регистрацию команд в отдельный метод-помощник, чтобы
     main не разрастался. При желании оставьте прямой блок инициализации.
     --------------------------------------------------------------- */
  private static class CommandConfigurator {
    static CommandManager configure(UserManager um, CollectionManager cm) {

      return new CommandManager() {{
        register("get_commands", new GetCommands(this, um));

        register("create_user", new NUserCreate(um));
        register("user_add_functionality", new NUserAddFunctionality(um, this));
        register("user_remove_functionality", new NUserRemoveFunctionality(um, this));
        register("user_set_role", new NUserSetRole(um));
        register("info", new Info(cm));
        register("show", new Show(cm));
        register("add", new Add(cm));
        register("clear", new Clear(cm));
        register("min_by_maximum_point", new MinByMaximumPointCommand(cm));
        register("print_unique_discipline", new PrintUniqueDiscipline(cm));
        register("remove_greater", new RemoveGreater(cm));
        register("filter_greater_difficulty", new FilterGreaterThanDifficulty(cm));
        register("remove_lower", new RemoveLower(cm));
        register("remove_by_id", new RemoveById(cm));
        register("add_if_max", new AddIfMax(cm));
        register("update", new Update(cm));
        register("reorder", new Reorder(cm));
        register("is_id_exist", new IsIdExist(cm));

        /* если нужны команды управления пользователями — добавьте их */
      }};
    }
  }
}

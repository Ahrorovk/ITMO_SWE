package server.managers;

import server.managers.*;
import common.model.*;
import server.utility.Console;
import server.utility.User;

import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

public class DumpManager {
  private final BDManager bdManager;
  private final Console console;
  private final PropertyManager propertyManager;

  private final DBLabWorkManager labWorkManager;
  private final DBUserManager    userManager;
  private final DBEventManager   eventManager;
  private final DBBookingManager bookingManager;

  public DumpManager(BDManager bdManager,
                     PropertyManager propertyManager,
                     Console console) {
    this.bdManager       = bdManager;
    this.propertyManager = propertyManager;
    this.console         = console;

    // создаём все «DAO-менеджеры»
    this.labWorkManager = new DBLabWorkManager(bdManager);
    this.userManager    = new DBUserManager(bdManager);
    this.eventManager   = new DBEventManager(bdManager);
    this.bookingManager = new DBBookingManager(bdManager);
  }

  /** Инициализация таблиц по скрипту из properties */
  public boolean initTables() {
    try {
      if (!bdManager.init()) System.exit(1);
      var stmt = bdManager.getStatement();
      for (String script : propertyManager
        .getProperty("DB_CREATE_TABLE_SQL", "")
        .split(";")) {
        if (!script.isBlank()) {
          stmt.executeUpdate(script + ";");
        }
      }
      stmt.close();
      return true;
    } catch (SQLException | InterruptedException e) {
      console.printError(e.toString());
      return false;
    }
  }

  // ====== LabWork ======

  public LinkedList<DBLabWorkManager.LabWorkAndUserID> selectLabWorks() {
    return labWorkManager.select();
  }
  public LinkedList<DBLabWorkManager.LabWorkAndUserID> selectLabWorksByUserId(int userId) {
    return labWorkManager.selectByUserId(userId);
  }
  public boolean insertLabWork(LabWork lw, long userId) {
    return labWorkManager.insert(lw, userId);
  }
  public boolean updateLabWork(LabWork lw) {
    return labWorkManager.update(lw);
  }
  public boolean removeLabWork(long id) {
    return labWorkManager.remove(id);
  }

  // ====== Users ======

  public List<User> listUsers() {
    try {
      return userManager.listAll();
    } catch (SQLException e) {
      console.printError(e.toString());
      return List.of();
    }
  }
  public long createUser(String login, String pwdHash, String role) {
    try {
      return userManager.createUser(login, pwdHash, role);
    } catch (SQLException e) {
      console.printError(e.toString());
      return -1;
    }
  }
  public boolean updateUser(User u) {
    try {
      return userManager.updateUser(u);
    } catch (SQLException e) {
      console.printError(e.toString());
      return false;
    }
  }
  public boolean deleteUser(long id) {
    try {
      return userManager.deleteUser(id);
    } catch (SQLException e) {
      console.printError(e.toString());
      return false;
    }
  }
  public User findUserByToken(String token) {
    try {
      return userManager.getUserByToken(token);
    } catch (SQLException e) {
      console.printError(e.toString());
      return null;
    }
  }
  public boolean insertToken(User u, String token) {
    try {
      return userManager.insertToken(u, token);
    } catch (SQLException e) {
      console.printError(e.toString());
      return false;
    }
  }
  public boolean deleteToken(String token) {
    try {
      return userManager.deleteToken(token);
    } catch (SQLException e) {
      console.printError(e.toString());
      return false;
    }
  }

  // ====== Events ======

  /** Все события */
  public List<Event> selectAllEvents() {
    try {
      return eventManager.selectAllEvents();
    } catch (SQLException e) {
      console.printError(e.toString());
      return List.of();
    }
  }

  /** Количество оставшихся билетов для события */
  public int getAvailableTickets(long eventId) {
    try {
      return eventManager.getAvailableTickets(eventId);
    } catch (SQLException e) {
      console.printError(e.toString());
      return 0;
    }
  }

  // ====== Bookings ======

  /** Список бронирований пользователя */
  public List<Booking> getBookingsByUser(long userId) {
    try {
      return bookingManager.getBookingsByUser(userId);
    } catch (SQLException e) {
      console.printError(e.toString());
      return List.of();
    }
  }

  /**
   * Попытка забронировать count билетов для userId на событие eventId.
   * Возвращает true, если успешно, false — если нет.
   */
  public boolean bookTickets(long userId, long eventId, int count) {
    try {
      // сначала нужно узнать ticket_id по eventId
      // (предположим, в tickets.event_id → 1:1 связь)
      long ticketId = eventManager.findTicketIdByEventId(eventId);
      return bookingManager.book(userId, ticketId, count);
    } catch (SQLException e) {
      console.printError(e.toString());
      return false;
    }
  }

  /** Отменить бронирование по его ID */
  public boolean cancelBooking(long bookingId) {
    try {
      return bookingManager.cancelBooking(bookingId);
    } catch (SQLException e) {
      console.printError(e.toString());
      return false;
    }
  }
}

package server.managers;

import common.model.Booking;    // ваш POJO для bookings
import common.model.Ticket;     // POJO для tickets
import java.sql.*;
import java.util.*;

public class DBBookingManager {
    private final BDManager manager;

    public DBBookingManager(BDManager manager) {
        this.manager = manager;
    }

    /** Список всех бронирований данного пользователя */
    public List<Booking> getBookingsByUser(long userId) throws SQLException {
        String sql =
          "SELECT b.id, b.user_id, b.ticket_id, b.quantity, b.booked_at, " +
          "  t.event_id, t.total_count, t.sold_count " +
          "FROM bookings b " +
          "JOIN tickets t ON t.id = b.ticket_id " +
          "WHERE b.user_id = ?";
        List<Booking> list = new ArrayList<>();
        try (PreparedStatement ps = manager.getPreparedStatementRGK(sql)) {
            ps.setLong(1, userId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    Booking bc = new Booking();
                    bc.setId(rs.getLong("id"));
                    bc.setUserId(rs.getLong("user_id"));
                    bc.setTicketId(rs.getLong("ticket_id"));
                    bc.setQuantity(rs.getInt("quantity"));
                    bc.setBookedAt(rs.getTimestamp("booked_at").toLocalDateTime());
                    // Вложенный объект Ticket (без связанного Event)
                    Ticket t = new Ticket();
                    t.setId(rs.getLong("ticket_id"));
                    t.setEventId(rs.getLong("event_id"));
                    t.setTotalCount(rs.getInt("total_count"));
                    t.setSoldCount(rs.getInt("sold_count"));
                    bc.setTicket(t);
                    list.add(bc);
                }
            }
        }
        return list;
    }

    /** Проверить, сколько билетов осталось для данного ticket_id */
    public int getAvailableTickets(long ticketId) throws SQLException {
        String sql = "SELECT total_count - sold_count AS available FROM tickets WHERE id = ?";
        try (PreparedStatement ps = manager.getPreparedStatementRGK(sql)) {
            ps.setLong(1, ticketId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return rs.getInt("available");
                throw new SQLException("Ticket not found: " + ticketId);
            }
        }
    }

    /**
     * Забронировать count билетов на пакет ticketId для userId.
     * @return true — успешно, false — если не хватает билетов.
     */
    public boolean book(long userId, long ticketId, int count) throws SQLException {
        Connection conn = manager.getConnection();
        conn.setAutoCommit(false);
        try {
            // 1) Получаем текущее состояние и блокируем строку
            String sel = "SELECT total_count, sold_count FROM tickets WHERE id = ? FOR UPDATE";
            int total, sold;
            try (PreparedStatement ps = conn.prepareStatement(sel)) {
                ps.setLong(1, ticketId);
                try (ResultSet rs = ps.executeQuery()) {
                    if (!rs.next())
                        throw new SQLException("Ticket not found " + ticketId);
                    total = rs.getInt("total_count");
                    sold  = rs.getInt("sold_count");
                }
            }
            if (total - sold < count) {
                conn.rollback();
                return false;
            }

            // 2) Обновляем sold_count
            String upd =
              "UPDATE tickets SET sold_count = sold_count + ? WHERE id = ?";
            try (PreparedStatement ps = conn.prepareStatement(upd)) {
                ps.setInt(1, count);
                ps.setLong(2, ticketId);
                ps.executeUpdate();
            }

            // 3) Вставляем запись брони
            String ins =
              "INSERT INTO bookings(user_id, ticket_id, quantity) VALUES(?, ?, ?)";
            try (PreparedStatement ps = conn.prepareStatement(ins)) {
                ps.setLong(1, userId);
                ps.setLong(2, ticketId);
                ps.setInt(3, count);
                ps.executeUpdate();
            }

            conn.commit();
            return true;
        } catch (SQLException ex) {
            conn.rollback();
            throw ex;
        } finally {
            conn.setAutoCommit(true);
        }
    }

    /** Отменить бронирование (удаляет запись и возвращает билеты) */
    public boolean cancelBooking(long bookingId) throws SQLException {
        Connection conn = manager.getConnection();
        conn.setAutoCommit(false);
        try {
            // 1) Узнаём, сколько вернуть
            String sel = "SELECT ticket_id, quantity FROM bookings WHERE id = ?";
            long ticketId;
            int qty;
            try (PreparedStatement ps = conn.prepareStatement(sel)) {
                ps.setLong(1, bookingId);
                try (ResultSet rs = ps.executeQuery()) {
                    if (!rs.next())
                        return false;
                    ticketId = rs.getLong("ticket_id");
                    qty      = rs.getInt("quantity");
                }
            }
            // 2) Уменьшаем sold_count
            String upd = "UPDATE tickets SET sold_count = sold_count - ? WHERE id = ?";
            try (PreparedStatement ps = conn.prepareStatement(upd)) {
                ps.setInt(1, qty);
                ps.setLong(2, ticketId);
                ps.executeUpdate();
            }
            // 3) Удаляем бронирование
            String del = "DELETE FROM bookings WHERE id = ?";
            try (PreparedStatement ps = conn.prepareStatement(del)) {
                ps.setLong(1, bookingId);
                ps.executeUpdate();
            }

            conn.commit();
            return true;
        } catch (SQLException ex) {
            conn.rollback();
            throw ex;
        } finally {
            conn.setAutoCommit(true);
        }
    }
}

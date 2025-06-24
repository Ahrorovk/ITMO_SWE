package server.managers;

import common.model.Event;
import common.model.Image;
import common.model.Coordinates;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DBEventManager {

    private final BDManager manager;

    public DBEventManager(BDManager manager) {
        this.manager = manager;
    }

    /**
     * Возвращает список всех событий вместе с их координатами, количеством билетов и изображением.
     */
    public List<Event> selectAllEvents() throws SQLException {
        String sql =
            "SELECT E.id, E.title, E.description, E.created_at, E.event_date, " +
            "       C.x AS coord_x, C.y AS coord_y, " +
            "       T.id AS ticket_id, T.total_count, T.sold_count, " +
            "       I.id AS image_id, I.name AS image_name, I.event_id AS image_event_id, " +
            "       E.created_by AS user_id " +
            "FROM events E " +
            "JOIN locations C ON C.id = E.location_id " +
            "LEFT JOIN tickets T ON T.event_id = E.id " +
            "LEFT JOIN TImages I ON I.id = E.id_image";

        List<Event> out = new ArrayList<>();
        try (ResultSet rs = manager.getStatement().executeQuery(sql)) {
            while (rs.next()) {
                Coordinates coord = new Coordinates(
                    rs.getLong("coord_x"),
                    rs.getLong("coord_y")
                );
                int available = rs.getInt("total_count") - rs.getInt("sold_count");
                Image img = null;
                if (rs.getString("image_name") != null) {
                    img = new Image(
                        rs.getLong("image_id"),
                        rs.getString("image_name"),
                        rs.getLong("image_event_id")
                    );
                }
                Event ev = new Event(
                    rs.getLong("id"),
                    rs.getString("title"),
                    rs.getString("description"),
                    coord,
                    rs.getTimestamp("created_at").toLocalDateTime().toLocalDate(),
                    rs.getTimestamp("event_date").toLocalDateTime().toLocalDate(),
                    available,
                    img,
                    rs.getLong("user_id")
                );
                out.add(ev);
            }
        }
        return out;
    }

    /**
     * Возвращает количество доступных билетов для заданного события.
     */
    public int getAvailableTickets(long eventId) throws SQLException {
        String sql =
            "SELECT (total_count - sold_count) AS available " +
            "FROM tickets WHERE event_id = ?";
        try (PreparedStatement ps = manager.getPreparedStatement(sql)) {
            ps.setLong(1, eventId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return rs.getInt("available");
                else throw new SQLException("Event not found or no tickets: " + eventId);
            }
        }
    }

    /**
     * Находит ID записи tickets по ID события.
     * Нужен для процесса бронирования.
     */
    public long findTicketIdByEventId(long eventId) throws SQLException {
        String sql = "SELECT id FROM tickets WHERE event_id = ?";
        try (PreparedStatement ps = manager.getPreparedStatementRGK(sql)) {
            ps.setLong(1, eventId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return rs.getLong("id");
                else throw new SQLException("No ticket package defined for event " + eventId);
            }
        }
    }
}

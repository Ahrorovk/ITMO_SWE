package server.utility;

import com.google.gson.*;
import java.lang.reflect.Type;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class LocalDateAdapter implements JsonSerializer<LocalDate>, JsonDeserializer<LocalDate> {
  private static final DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;

  @Override
  public JsonElement serialize(LocalDate date, Type type, JsonSerializationContext context) {
    return new JsonPrimitive(date.format(formatter));
  }

  @Override
  public LocalDate deserialize(JsonElement json, Type type, JsonDeserializationContext context)
      throws JsonParseException {
    return LocalDate.parse(json.getAsString(), formatter);
  }
}

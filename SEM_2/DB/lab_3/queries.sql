CREATE TABLE spit_event_logs (
  log_id          SERIAL PRIMARY KEY,
  event_id        INT        REFERENCES spit_events(event_id),
  dilofosaur_id   INT        REFERENCES dilofosavrs(dilofosaur_id),
  old_count       INT        NOT NULL,
  new_count       INT        NOT NULL,
  logged_at       TIMESTAMP  NOT NULL DEFAULT now()
);
CREATE TABLE spit_alerts (
  alert_id        SERIAL PRIMARY KEY,
  dilofosaur_id   INT        REFERENCES dilofosavrs(dilofosaur_id),
  alert_type      TEXT       NOT NULL,
  alert_message   TEXT       NOT NULL,
  alert_at        TIMESTAMP  NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION fn_handle_spit_event() 
RETURNS TRIGGER AS $$
DECLARE
  old_count INT;
  new_count INT;
BEGIN
  SELECT spit_count 
    INTO old_count 
    FROM dilofosavrs
   WHERE dilofosaur_id = NEW.dilofosaur_id;
  new_count := old_count + 1;
  UPDATE dilofosavrs
     SET spit_count = new_count
   WHERE dilofosaur_id = NEW.dilofosaur_id;

  INSERT INTO spit_event_logs(
    event_id, dilofosaur_id, old_count, new_count
  ) VALUES (
    NEW.event_id, NEW.dilofosaur_id, old_count, new_count
  );
  IF new_count > 10 THEN
    INSERT INTO spit_alerts(
      dilofosaur_id, alert_type, alert_message
    ) VALUES (
      NEW.dilofosaur_id,
      'HighSpitCount',
      'Spit count exceeded threshold (10). Current count: ' || new_count
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;



CREATE TRIGGER trg_spit_event_logging
  AFTER INSERT ON spit_events
  FOR EACH ROW
  EXECUTE PROCEDURE fn_handle_spit_event();



INSERT INTO dilofosavrs(name, species, river_id, spit_count)
VALUES ('Рэкс', 'Dilophosaurus wetherilli', NULL, 9);-- запомним id
SELECT dilofosaur_id FROM dilofosavrs WHERE name = 'Рэкс';
SELECT spit_count
FROM   dilofosavrs
WHERE  dilofosaur_id = 2;

SELECT spit_count
INTO   old_count
FROM   dilofosavrs
WHERE  dilofosaur_id = NEW.dilofosaur_id;

INSERT INTO spit_events(dilofosaur_id, worker_id, event_time, description)
VALUES (2, 1, now(), 'Плевок в ограду');

SELECT spit_count
FROM   dilofosavrs
WHERE  dilofosaur_id = 2;
SELECT *
FROM   spit_event_logs
WHERE  dilofosaur_id = 2
ORDER  BY log_id DESC
LIMIT  1;

--Тревога
INSERT INTO spit_events(dilofosaur_id, worker_id, event_time, description)
VALUES (2, 1, now(), 'Ещё один плевок');

SELECT spit_count FROM dilofosavrs WHERE dilofosaur_id = 2;

SELECT *
FROM   spit_alerts
WHERE  dilofosaur_id = 2
ORDER  BY alert_id DESC
LIMIT  1;


-- получите запись с alert_type = 'HighSpitCount'


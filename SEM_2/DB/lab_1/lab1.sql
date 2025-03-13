CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    duration INTERVAL NOT NULL CHECK (duration > INTERVAL '0 minutes')
);
CREATE TABLE trees (
    tree_id SERIAL PRIMARY KEY,
    status VARCHAR(50) NOT NULL,
    task_id INTEGER REFERENCES tasks(task_id) ON DELETE CASCADE
);

CREATE TABLE metal_fastenings (
    fastening_id SERIAL PRIMARY KEY,
    type VARCHAR(50) DEFAULT 'metal',
    status VARCHAR(50) NOT NULL,
    tree_id INTEGER REFERENCES trees(tree_id) ON DELETE CASCADE
);

CREATE TABLE markers (
    marker_id SERIAL PRIMARY KEY,
    status VARCHAR(50) NOT NULL,
    task_id INTEGER REFERENCES tasks(task_id) ON DELETE CASCADE
);

CREATE TABLE supports (
    support_id SERIAL PRIMARY KEY,
    scheduled_time TIME NOT NULL,
    marker_id INTEGER REFERENCES markers(marker_id) ON DELETE SET NULL
);

CREATE TABLE greenkeepers (
    greenkeeper_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE support_builders (
    support_id INTEGER REFERENCES supports(support_id) ON DELETE CASCADE,
    greenkeeper_id INTEGER REFERENCES greenkeepers(greenkeeper_id) ON DELETE CASCADE,
    PRIMARY KEY (support_id, greenkeeper_id)
);

CREATE TABLE fences (
    fence_id SERIAL PRIMARY KEY,
    description TEXT NOT NULL
);

CREATE TABLE workers (
    worker_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    fence_id INTEGER REFERENCES fences(fence_id) ON DELETE SET NULL,
    side VARCHAR(50) NOT NULL
);

CREATE TABLE rivers (
    river_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE dilofosavrs (
    dilofosaur_id SERIAL PRIMARY KEY,
    species VARCHAR(100) DEFAULT 'Дилофозавры',
    location VARCHAR(100),
    river_id INTEGER REFERENCES rivers(river_id) ON DELETE SET NULL,
    spits_saliva BOOLEAN DEFAULT TRUE
);

CREATE TABLE observers (
    observer_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE observer_tasks (
    observer_id INTEGER REFERENCES observers(observer_id) ON DELETE CASCADE,
    task_id INTEGER REFERENCES tasks(task_id) ON DELETE CASCADE,
    PRIMARY KEY (observer_id, task_id)
);

CREATE TABLE spit_events (
    event_id SERIAL PRIMARY KEY,
    dilofosaur_id INTEGER REFERENCES dilofosavrs(dilofosaur_id) ON DELETE CASCADE,
    worker_id INTEGER REFERENCES workers(worker_id) ON DELETE CASCADE,
    event_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    description TEXT
);

INSERT INTO tasks (description, duration)
VALUES ('Выпрямить деревце, убрать металлические крепления и поставить метку для подпорки', INTERVAL '20 minutes');

INSERT INTO trees (status, task_id)
VALUES ('выпрямлено', 1);

INSERT INTO metal_fastenings (status, tree_id)
VALUES ('удалено', 1);

INSERT INTO markers (status, task_id)
VALUES ('установлена', 1);

INSERT INTO supports (scheduled_time, marker_id)
VALUES ('08:00:00', 1);

INSERT INTO greenkeepers (name) VALUES ('Иван Иванов');
INSERT INTO greenkeepers (name) VALUES ('Пётр Петров');

INSERT INTO support_builders (support_id, greenkeeper_id)
VALUES (1, 1), (1, 2);

INSERT INTO fences (description)
VALUES ('Ограда участка');

INSERT INTO workers (name, fence_id, side)
VALUES ('Алексей', 1, 'северная'),
       ('Борис', 1, 'южная');

INSERT INTO rivers (name)
VALUES ('Река Дила');
INSERT INTO dilofosavrs (location, river_id)
VALUES ('недалеко от реки', 1);

INSERT INTO observers (name)
VALUES ('Малдун');

INSERT INTO observer_tasks (observer_id, task_id)
VALUES (1, 1);

INSERT INTO spit_events (dilofosaur_id, worker_id, description)
VALUES (1, 1, 'Плевок ослепляющей слюной');

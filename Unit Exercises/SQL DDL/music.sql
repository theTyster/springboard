-- from the terminal run:
-- psql < music.sql

DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  release_date DATE NOT NULL
);

CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration_in_seconds INTEGER NOT NULL
);

CREATE TABLE producers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  album_id INTEGER REFERENCES albums(id) NOT NULL,
  song_id INTEGER REFERENCES songs(id) NOT NULL
);

CREATE TABLE artists(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  album_id INTEGER REFERENCES albums(id) NOT NULL,
  song_id INTEGER REFERENCES songs(id) NOT NULL
);

INSERT INTO albums
  (name, release_date)
VALUES
  ('Middle of nowhere', '04-15-1997'),
  ('A Night at the Opera', '10-31-1975'),
  ('Daydream', '11-14-1995'),
  ('A Star Is Born', '09-27-2018'),
  ('Silver Side Up', '08-21-2001'),
  ('The Blueprint 3', '10-20-2009'),
  ('Prism', '12-17-2013'),
  ('Hands All Over', '06-21-2011'),
  ('Let Go', '05-14-2002'),
  ('The Writing''s on the Wall', '11-07-1999');

INSERT INTO songs
  (title, duration_in_seconds)
VALUES
  ('MMMBop', 238),
  ('Bohemian Rhapsody', 355),
  ('One Sweet Day', 282),
  ('Shallow', 216),
  ('How You Remind Me', 223),
  ('New York State of Mind', 276),
  ('Dark Horse', 215),
  ('Moves Like Jagger', 201),
  ('Complicated', 244),
  ('Say My Name', 240);

INSERT INTO producers
  (name, album_id, song_id)
VALUES
  ('Dust Brothers', 1, 1),
  ('Stephen Lironi', 1, 1),
  ('Roy Thomas Baker', 2, 2),
  ('Walter Afanasieff', 3, 3),
  ('Benjamin Rice', 4, 4),
  ('Rick Parashar', 5, 5),
  ('Al Shux', 6, 6),
  ('Max Martin', 7, 7),
  ('Cirkut', 7, 7),
  ('Shellback', 8, 8),
  ('Benny Blanco', 8, 8),
  ('The Matrix', 9, 9),
  ('Darkchild', 10, 10);

INSERT INTO artists
  (name, song_id, album_id)
VALUES 
  ('Hanson', 1, 1),
  ('Queen', 2, 2),
  ('Mariah Cary', 3, 3),
  ('Boyz II Men', 3, 3),
  ('Lady Gaga', 4, 4),
  ('Bradley Cooper', 4, 4),
  ('Nickelback', 5, 5),
  ('Jay Z', 6, 6),
  ('Alicia Keys', 6, 6),
  ('Katy Perry', 7, 7),
  ('Juicy J', 7, 7),
  ('Maroon 5', 8, 8),
  ('Christina Aguilera', 8, 8),
  ('Avril Lavigne', 9, 9),
  ('Destiny''s Child', 10, 10);

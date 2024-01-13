DROP DATABASE IF EXISTS soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league;

CREATE TABLE teams(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL 
);

CREATE TABLE matches(
  id SERIAL PRIMARY KEY, 
  match_date DATE NOT NULL, 
  home_team_id INTEGER REFERENCES teams(id) NOT NULL, 
  away_team_id INTEGER REFERENCES teams(id) NOT NULL, 
  home_team_score INTEGER NOT NULL, 
  away_team_score INTEGER NOT NULL, 
  scoring_players_id INTEGER REFERENCES players(id) NOT NULL, 
  CHECK (home_team_id != away_team_id)
);

CREATE TABLE players(
  id SERIAL PRIMARY KEY, 
  first_name TEXT NOT NULL, 
  last_name TEXT NOT NULL, 
  team_id INTEGER REFERENCES teams(id) NOT NULL,
  match_id INTEGER REFERENCES matches(id) NOT NULL,
  player_number INTEGER NOT NULL,
  joined_team DATE NOT NULL
);

CREATE TABLE referees(
  id serial PRIMARY KEY, 
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL, 
  match_id INTEGER REFERENCES matches(id) NOT NULL
);

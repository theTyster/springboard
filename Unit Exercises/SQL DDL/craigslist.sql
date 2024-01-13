DROP DATABASE IF EXISTS craigslist;

CREATE DATABASE craigslist;

\c craigslist;

CREATE TABLE region(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  preferred_region_id integer REFERENCES region(id) NOT NULL, 
  username TEXT NOT NULL, 
  password TEXT NOT NULL
);

CREATE TABLE categories(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE posts(
  id SERIAL PRIMARY KEY, 
  title TEXT NOT NULL, 
  post_location TEXT NOT NULL,
  post_body TEXT NOT NULL,
  post_date DATE, 
  region_id INTEGER REFERENCES region(id) NOT NULL, 
  category INTEGER REFERENCES categories(id) NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL 
);

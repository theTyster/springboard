DROP DATABASE IF EXISTS healthcare_district;

CREATE DATABASE healthcare_district;

\c healthcare_district;

CREATE TABLE medical_center (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE doctor (
  id SERIAL PRIMARY KEY, 
  first_name TEXT NOT NULL, 
  last_name TEXT NOT NULL, 
  practice TEXT NOT NULL,
  medical_center_id INTEGER REFERENCES medical_center(id) NOT NULL
);

CREATE TABLE patient (
  id SERIAL PRIMARY KEY, 
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

CREATE TABLE visit (
  id SERIAL PRIMARY KEY, 
  doctor_id INTEGER REFERENCES doctor(id) NOT NULL, 
  patient_id INTEGER REFERENCES patient(id) NOT NULL,
  visit_date DATE
);

CREATE TABLE disease (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE diagnosis (
  id SERIAL PRIMARY KEY,
  visit_id INTEGER REFERENCES visit(id) NOT NULL,
  disease_id INTEGER REFERENCES disease(id) NOT NULL
);

CREATE DATABASE healthcare_district;

\c healthcare_district;

CREATE TABLE medical_center (
  id SERIAL PRIMARY KEY,
  name TEXT
);

CREATE TABLE doctor (
  id SERIAL PRIMARY KEY, 
  first_name TEXT, 
  last_name TEXT, 
  practice TEXT,
  medical_center_id INTEGER REFERENCES medical_center(id)
);

CREATE TABLE patient (
  id SERIAL PRIMARY KEY, 
  first_name TEXT,
  last_name TEXT
);

CREATE TABLE visit (
  id SERIAL PRIMARY KEY, 
  DATE,
  doctor_id INTEGER REFERENCES doctor(id), 
  patient_id INTEGER REFERENCES patient(id)
);

CREATE TABLE disease (
  id SERIAL PRIMARY KEY,
  name TEXT
);

CREATE TABLE diagnosis (
  id SERIAL PRIMARY KEY,
  visit_id INTEGER REFERENCES visit(id),
  disease_id INTEGER REFERENCES disease(id)
);

CREATE DATABASE IF NOT EXISTS appointments;

USE appointments;

CREATE TABLE appointments (
    id int NOT NULL AUTO_INCREMENT,
    doctor_id varchar(255) NOT NULL,
    patient_id varchar(255) NOT NULL,
    from_date varchar(255) NOT NULL,
    to_date varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

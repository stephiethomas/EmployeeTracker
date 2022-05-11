DROP DATABASE IF EXISTS empl_db;
CREATE DATABASE empl_db;
USE empl_db;

CREATE TABLE department(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE emplRole(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL,
    department_id INTEGER,
    FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER, 
    FOREIGN KEY(role_id) REFERENCES emplRole(id),
    FOREIGN KEY(manager_id) REFERENCES employee(id)
);
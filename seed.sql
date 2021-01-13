DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

CREATE TABLE employee (
id INT NOT NULL auto_increment,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT NULL,
manager_id INT NULL,
PRIMARY KEY(id),
FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

CREATE TABLE role (
id INT NOT NULL auto_increment,
title VARCHAR(30),
salary DECIMAL,
department_id INT NULL,
PRIMARY KEY(id)
);

CREATE TABLE department (
id INT NOT NULL auto_increment,
name VARCHAR(30),
PRIMARY KEY(id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "TheBuilder", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Willis", "Jones", 1, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("construction worker", 9.9, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("baker", 9.9, 2);

INSERT INTO department (name)
VALUES ("Construction");

INSERT INTO department (name)
VALUES ("Bakery");



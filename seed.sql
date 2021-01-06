DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

CREATE TABLE employee (
id INT NOT NULL auto_increment,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT NULL,
manager_id INT NOT NULL,
PRIMARY KEY(id)
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

INSERT INTO role (title, salary, department_id)
VALUES ("construction", 9.9, 1);

INSERT INTO department (name)
VALUES ("Construction");

-- SELECT * FROM employee;
-- SELECT * FROM role;
-- SELECT * FROM department;

SELECT employee.first_name, employee.last_name, role.title  
FROM role 
INNER JOIN employee ON employee.role_id = role.id



DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
\c employee_tracker;

-- Include schema
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_ID INTEGER NOT NULL REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL REFERENCES role(id) ON DELETE CASCADE,
    manager_id INTEGER REFERENCES employee(id) ON DELETE SET NULL
);

-- Include seed data
INSERT INTO department (name) 
VALUES 
    ('Eng'), 
    ('Sales'), 
    ('HR');

INSERT INTO role (title, salary, department_id) 
VALUES
    ('Software Engineer', 100000, 1),
    ('Sales Manager', 80000, 2),
    ('Employee Relations', 70000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES
    ('Blake', 'Torrey', 1, NULL),
    ('Rodrigo', 'Schmaltz', 2, 1),
    ('Braydon', 'Jeff', 3, 2);
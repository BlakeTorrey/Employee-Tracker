import dotenv from 'dotenv';
import pkg from 'pg';

const { Pool } = pkg;
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

export const getDepartments = async () => {
    const response = await pool.query('SELECT * FROM department');
    return response.rows;
};

export const getRoles = async () => {
    const response = await pool.query(`
        SELECT role.id, role.title, department.name AS department, role.salary 
        FROM role JOIN department ON role.department_id = department.id`);
    return response.rows;
};

export const getEmployees = async () => {
    const response = await pool.query(`
        SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, 
        COALESCE(m.first_name || ' ' || m.last_name, 'None') AS manager 
        FROM employee e
        JOIN role ON e.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee m ON e.manager_id = m.id`);
    return response.rows;
};

export const addDepartment = async (name) => {
    await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

export const addRole = async (roleTitle, roleSalary, departmentId) => {
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [roleTitle, roleSalary, departmentId]);
};

export const addEmployee = async (firstName, lastName, roleId, managerId) => {
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
                     [firstName, lastName, roleId, managerId || null]);
};

export const updateEmployeeRole = async (employeeId, roleId) => {
    await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
};

export const getEmployeesByManager = async (managerId) => {
    const response = await pool.query(`
        SELECT e.id, e.first_name, e.last_name, role.title
        FROM employee e
        JOIN role ON e.role_id = role.id
        WHERE e.manager_id = $1
    `, [managerId]);
    return response.rows;
};

export const getEmployeesByDepartment = async (departmentId) => {
    const response = await pool.query(`
        SELECT e.id, e.first_name, e.last_name, role.title
        FROM employee e
        JOIN role ON e.role_id = role.id
        WHERE role.department_id = $1
    `, [departmentId]);
    return response.rows;
};

export const getDepartmentBudget = async (departmentId) => {
    const response = await pool.query(`
        SELECT department.name, SUM(role.salary) as total_budget
        FROM employee
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        WHERE department.id = $1
        GROUP BY department.name
    `, [departmentId]);
    return response.rows[0];
};

export const updateEmployeeManager = async (employeeId, managerId) => {
    await pool.query('UPDATE employee SET manager_id = $1 WHERE id = $2', 
        [managerId, employeeId]);
};

export const deleteDepartment = async (id) => {
    await pool.query('DELETE FROM department WHERE id = $1', [id]);
};

export const deleteRole = async (id) => {
    await pool.query('DELETE FROM role WHERE id = $1', [id]);
};

export const deleteEmployee = async (id) => {
    await pool.query('DELETE FROM employee WHERE id = $1', [id]);
};
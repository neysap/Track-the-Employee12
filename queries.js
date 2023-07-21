const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Neyney#123',
  database: 'employee_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;

const pool = require('./connection');

function getAllDepartments() {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM department', (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

function getAllRoles() {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM role', (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

function getAllEmployees() {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM employee', (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

function addDepartment(name) {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO department (name) VALUES (?)', [name], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

function addRole(title, salary, departmentId) {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

function addEmployee(firstName, lastName, roleId, managerId) {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

function updateEmployeeRole(employeeId, newRoleId) {
  return new Promise((resolve, reject) => {
    pool.query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employeeId], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
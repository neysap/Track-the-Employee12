const inquirer = require('inquirer');
const {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} = require('./queries');

function start() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          getAllDepartments().then((departments) => {
            console.table('Departments:', departments);
            start();
          });
          break;
        case 'View all roles':
          getAllRoles().then((roles) => {
            console.table('Roles:', roles);
            start();
          });
          break;
        case 'View all employees':
          getAllEmployees().then((employees) => {
            console.table('Employees:', employees);
            start();
          });
          break;
        case 'Add a department':
          inquirer
            .prompt({
              name: 'name',
              type: 'input',
              message: 'Enter the name of the department:',
            })
            .then((departmentData) => {
              addDepartment(departmentData.name).then(() => {
                console.log('Department added successfully!');
                start();
              }).catch((error) => {
                console.error('Error adding department:', error);
                start();
              });
            });
          break;
        case 'Add a role':
          inquirer
            .prompt([
              {
                name: 'title',
                type: 'input',
                message: 'Enter the title of the role:',
              },
              {
                name: 'salary',
                type: 'number',
                message: 'Enter the salary for the role:',
              },
              {
                name: 'departmentId',
                type: 'number',
                message: 'Enter the department ID for the role:',
              },
            ])
            .then((roleData) => {
              addRole(roleData.title, roleData.salary, roleData.departmentId).then(() => {
                console.log('Role added successfully!');
                start();
              }).catch((error) => {
                console.error('Error adding role:', error);
                start();
              });
            });
          break;
        case 'Add an employee':
          inquirer
            .prompt([
              {
                name: 'firstName',
                type: 'input',
                message: 'Enter the first name of the employee:',
              },
              {
                name: 'lastName',
                type: 'input',
                message: 'Enter the last name of the employee:',
              },
              {
                name: 'roleId',
                type: 'number',
                message: 'Enter the role ID for the employee:',
              },
              {
                name: 'managerId',
                type: 'number',
                message: 'Enter the manager ID for the employee (if applicable):',
              },
            ])
            .then((employeeData) => {
              addEmployee(employeeData.firstName, employeeData.lastName, employeeData.roleId, employeeData.managerId).then(() => {
                console.log('Employee added successfully!');
                start();
              }).catch((error) => {
                console.error('Error adding employee:', error);
                start();
              });
            });
          break;
        case 'Update an employee role':
          inquirer
            .prompt([
              {
                name: 'employeeId',
                type: 'number',
                message: 'Enter the ID of the employee to update:',
              },
              {
                name: 'newRoleId',
                type: 'number',
                message: 'Enter the new role ID for the employee:',
              },
            ])
            .then((updateData) => {
              updateEmployeeRole(updateData.employeeId, updateData.newRoleId).then(() => {
                console.log('Employee role updated successfully!');
                start();
              }).catch((error) => {
                console.error('Error updating employee role:', error);
                start();
              });
            });
          break;
        case 'Exit':
          console.log('Goodbye!');
          break;
        default:
          console.log('Invalid action.');
          start();
          break;
      }
    });
}

start();
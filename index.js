const inquirer = require('inquirer');
const fs = require('fs');
const { viewDepts, viewRoles, viewEmployees, addDept, addRole, addEmployee, updateEmployee } = require('./sql');

inquirer 
    .prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "action",
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit', 'View All Employee']
        },
    ])
    .then(({ landing }) => {
        switch (landing) {
            case 'View All Employees': viewEmployees();
            break;
            case 'Add Employee': addEmployeePrompt();
            break;
            // case 'Update Employee Role': updateEmployee();
            break;
            case 'View All Roles': viewRoles();
            break;
            // case 'Add Role': addRole();
            break;
            case 'View All Departments': viewDepts();
            break;
            // case 'Add Department': addDept();
            break;
        }
    });
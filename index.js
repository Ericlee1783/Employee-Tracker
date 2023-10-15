const inquirer = require("inquirer");
const fs = require("fs");
const {
  viewDepts,
  viewRoles,
  viewEmployees,
  addDept,
  addRole,
  addEmployee,
  updateEmployee,
} = require("./sql.js");

const express = require("express");
// Import and require mysql2
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password
    password: "password",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

inquirer
  .prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "action",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit",
      ],
    },
  ])
  .then(({ action }) => {
    switch (action) {
      case "View All Employees":
        viewEmployees();
        break;
      case "Add Employee":
        addEmployeePrompt();
        break;
        // case 'Update Employee Role': updateEmployee();
        break;
      case "View All Roles":
        viewRoles();
        break;
        // case 'Add Role': addRole();
        break;
      case "View All Departments":
        viewDepts();
        break;
        // case 'Add Department': addDept();
        break;
    }
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

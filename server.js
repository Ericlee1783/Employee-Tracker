const mysql = require("mysql2");
const inquirer = require("inquirer");
const fs = require("fs");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "company_db",
  },
  console.log(`Connected to the company_db.`),
);
const mainScreen = function () {
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
          addEmployee();
          break;
          case 'Update Employee Role': updateEmployee();
          break;
        case "View All Roles":
          viewRoles();
          break;
          case 'Add Role': addRole();
          break;
        case "View All Departments":
          viewDepts();
          break;
        case "Add Department":
          addDept();
          break;
        case "Quit":
          quit();
      }
    });
}

//function to view all employees?
const viewEmployees = () => {
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // console.log(results);
    console.table(results);
  });
  // how to prompt the screen to go back to main?
   mainScreen();
};
//function to add an employee
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the first name of the employee?",
        name: "FirstName"
      },
      {
        type: "input",
        message: "What's the last name of the employee?",
        name: "LastName"
      },
      {
        type: "input",
        message: "What is the employee's role id number?",
        name: "roleID"
      },
      {
        type: "input",
        message: "What is the manager id number?",
        name: "managerID"
      }
    ])
    .then(function(answer) {
      const sql = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)"
      const final = "SELECT * FROM employees"
      //inserts the new employee into the table and displays it
      db.query(sql, [answer.FirstName, answer.LastName, answer.roleID, answer.managerID], function(err, res) {
        if (err) throw err;
        console.table(res);
        //shows the final result after the insertion
        db.query(final, (err, res) => {
         if (err) {
            res.status(500).json({ error: err.message });
            return;
         };
          console.table(res);
       })
        //how to return to main screen?
        mainScreen();
      });
    });
}
//function to view all roles?
const viewRoles = () => {
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(results);
  });
  mainScreen();
};
//function to add a role
const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the role?",
        name: "roleName",
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "salaryTotal",
      },
      {
        type: "input",
        message: "What is the department id number?",
        name: "deptID",
      },
    ])
    .then(function (answer) {
      const sql =
        "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)";
      const final = `SELECT * FROM roles`

      db.query(sql, [answer.roleName, answer.salaryTotal, answer.deptID], function (err, res) {
          if (err) throw err;
          console.table(res);
          db.query(final, (err, res) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            };
            console.table(res);
          });
          mainScreen();
        }
      );
    });
};
//function to view all departments
const viewDepts = () => {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(results);
  });
  mainScreen();
};
//function add a department
const addDept = () => {
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the department?",
      name: "deptName",
    })
    .then(function (answer) {
      const sql = "INSERT INTO departments (name) VALUES (?)"
      const final = "SELECT * FROM departments"
      db.query(sql, [answer.deptName], function (err, res) {
          if (err) throw err;
          console.table(res);
        db.query(final, (err, res) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            };
            console.table(res);
          });
          mainScreen();
        }
      );
    });
};

//function to update employee
const updateEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the last name of the employee you would like to update?",
        name: "Update"
      },

      {
        type: "input",
        message: "What do you want to update to? (First Name)",
        name: "updateFirst"
      },
      {
        type: 'input',
        message: "What do you want to update to? (Last Name)",
        name:'updateLast'
      },
      {
        type: 'input',
        message: 'What is their new role_id?',
        name: 'updateRoleId'
      },
      {
        type: 'input',
        message: 'What is their new manager_id?',
        name: 'updateManager'
      }
    ])
    .then(function(answer) {
      const sql = "UPDATE employees SET first_name=?, last_name=?, role_id=?, manager_id=? WHERE last_name= ?"
      const final = "SELECT * FROM employees"
      db.query(sql ,[answer.updateFirst, answer.updateLast, answer.updateRoleId, answer.updateManager, answer.Update], function (err, res) {
        if (err) throw err;
        console.table(res);
        db.query(final, (err, results) => {
          if (err) {
            results.status(500).json({ error: err.message});
            return;
          };
          console.table(results);
        })
        mainScreen();
      });
    });
  }

const quit = () => {
  db.end();
  process.exit();
}


mainScreen();
module.exports = {
  viewDepts,
  viewRoles,
  viewEmployees,
  addDept,
  addRole,
  addEmployee,
  updateEmployee,
};

const mysql = require("mysql2");
const inquirer = require("inquirer");
const fs = require("fs");
const { mainScreen } = require("./index");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "company_db",
  },
  console.log(`Connected to the company_db.`),
);

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
  // mainScreen();
};
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the first name of the employee?",
        name: "eeFirstName"
      },
      {
        type: "input",
        message: "What's the last name of the employee?",
        name: "eeLastName"
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
      db.query(sql, [answer.eeFirstName, answer.eeLastName, answer.roleID, answer.managerID], function(err, res) {
        if (err) throw err;
        console.table(res);

        db.query(final, (err, res) => {
         if (err) {
            res.status(500).json({ error: err.message });
            return;
         };
          console.table(res);
       })
        //how to return to main screen?
        //how to display finished table?
        // mainScreen();
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
};
//function to view all departments?
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
          // mainScreen();
        }
      );
    });
};
const viewDepts = () => {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(results);
  });
  // mainScreen();
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
          // mainScreen()
        }
      );
    });
};

//function to update employee
const updateEmployee = () => {
  const sql = `
    UPDATE
    SET
    WHERE
    `;

  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log(results);
  });
};

module.exports = {
  viewDepts,
  viewRoles,
  viewEmployees,
  addDept,
  addRole,
  addEmployee,
  updateEmployee,
};

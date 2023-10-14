const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "company_db",
  },
  console.log(`Connected to the company_db.`)
);

//function to view all employees?
const viewEmployees = () => {
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log(results);
  });
};
//function to view all roles?
const viewRoles = () => {
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log(results);
  });
};
//function to view all departments?
const viewDepts = () => {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log(results);
  });
};
//function to add a role?
const addRole = () => {
  const sql = `
    INSERT INTO 
    VALUES
    `;

  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log(results);
  });
};
//function to add an employee
const addEmployee = () => {
  const sql = `
    INSERT INTO 
    VALUES
    `;

  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log(results);
  });
};
//function add a department
const addDept = () => {
  const sql = `
    INSERT INTO 
    VALUES
    `;

  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log(results);
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

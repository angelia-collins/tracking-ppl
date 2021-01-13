require('dotenv').config();

var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASS,
  database: "employeeDB"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  questions();
});

function questions() {
  inquirer
    .prompt({
      name: "start",
      type: "list",
      message: "What would you like to do?",
      choices: ['View Departments', 'View Employees', 'View Roles', 'Add Department', 'Add Employee', 'Add Role', 'Update Employee Roles'],
    })
    .then(function (answer) {
      switch (answer.start) {
        case 'View Departments':
          viewDept();
          break;

        case 'View Employees':
          viewEmployees();
          break;

        case 'View Roles':
          viewRoles();
          break;

        case 'Add Department':
          addDept();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Add Role':
          addRole();
          break;

        case 'Update Employee Roles':
          updateEmployeeRole();
          break;
      }
    });

}

function viewDept() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    questions();
  })
};

function viewEmployees() {
  var sql = "SELECT employee.first_name, employee.last_name, role.title FROM role INNER JOIN employee ON employee.role_id = role.id";
  connection.query(sql, function (err, res) {
    if (err) throw err;
    console.table(res);
    questions();
  })
};

function viewRoles() {
  connection.query("SELECT role.title, role.salary, department.name FROM department INNER JOIN role ON role.department_id = department.id;", function (err, res) {
    if (err) throw err;
    console.table(res);
    questions();
  })
};

function addDept() {
  inquirer
    .prompt({
      name: "start",
      type: "input",
      message: "What department would you like to add?",
    })
    .then(function (answer) {
      var sql = "INSERT INTO department SET ?";
      connection.query(sql, { name: answer.start }, function (err, res) {
        if (err) throw err;
        connection.query("SELECT * FROM department", function (err, res) {
          if (err) throw err;
          console.log("\n");
          console.table(res);
        })
        questions();
      })
    })
};


let roleTitle = [];

function getRole() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    // console.table(res);
    for (let i = 0; i < res.length; i++ ){
      roleTitle.push(res[i].id + ". " + res[i].title);
    }
    // console.log(res)
  });
  return roleTitle;
};

let manager = [];
function managerStatus() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++ ){
      manager.push(res[i].id + ". " + res[i].first_name + " " + res[i].last_name);
    }
  });
  return manager;
};

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first",
        type: "input",
        message: "Employee First Name?",
      },
      {
        name: "last",
        type: "input",
        message: "Employee Last Name?",
      },
      {
        name: "title",
        type: "list",
        message: "What is their job title?",
        choices: getRole()
      },
      {
        name: "managerStatus",
        type: "list",
        message: "Who is their manager?",
        choices: managerStatus()
      }
    ])
    .then(function (answer) {
      const roleId = (answer.title).split(".")[0];
      const managerId = (answer.managerStatus).split(".")[0];
      var sql = "INSERT INTO employee SET ?";
      connection.query(sql, { first_name: answer.first, last_name: answer.last, role_id: roleId, manager_id: managerId }, function (err, res) {
        if (err) throw err;
        connection.query("SELECT * FROM employee", function (err, res) {
          if (err) throw err;
          console.log("\n");
          console.table(res);
        })
        questions();
      })
    })
};




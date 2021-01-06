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

  connection.connect();

  function questions() {
    inquirer
      .prompt({
        name: "start",
        type: "list",
        message: "What would you like to do?",
        choices: ['View Departments', 'View Employees', 'View Roles', 'Add Department', 'Add Employee', 'Add Role', 'Update Employee Roles'],
      })
      .then(function(answer) {
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
   
    questions();

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
        connection.query("SELECT * FROM role", function (err, res) {
          if (err) throw err;
          console.table(res);
          questions();
        })
      };

      function addDept(){
          inquirer
            .prompt({
              name: "start",
              type: "input",
              message: "What department would you like to add?",
            })
            .then(function(answer) {
        var sql = "INSERT INTO department SET ?";
        connection.query(sql, {name: answer.start}, function (err, res) {
          if (err) throw err;
          connection.query("SELECT * FROM department", function (err, res) {
            if (err) throw err;
            console.table(res);  
          })
          questions();
        })
      })
    }
        

  // connection.end();

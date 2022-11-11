const inquirer = require("inquirer");
const { connection, updateEmployeeRole } = require("./db");
require("console.table");
const db = require("./db");

startPrompt();

function startPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Exit",
        ],
      },
    ])
    .then(function (responses) {
      switch (responses.action) {
        case "View All Departments":
          viewAllDepartments();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Exit":
          console.log("Thank you!");
          connection.end();
          break;
      }
    });
}

function viewAllDepartments() {
  db.getDepartments()
    .then(([depts]) => {
      console.log("------------------");
      console.log("Showing Departments");
      console.log("------------------");
      console.table(depts);
    })
    .then(() => startPrompt());
}

function viewAllRoles() {
  db.getRoles()
    .then(([roles]) => {
      console.log("------------------");
      console.log("Showing Roles");
      console.log("------------------");
      console.table(roles);
    })
    .then(() => startPrompt());
}

function viewAllEmployees() {
  db.getAllEmployee()
    .then(([allEmployees]) => {
      console.log("------------------");
      console.log("Showing Employees");
      console.log("------------------");
      console.table(allEmployees);
    })
    .then(() => startPrompt());
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What department would you like to add?",
      },
    ])
    .then(function (response) {
      db.createDepartment(response).then(() => startPrompt());
    });
}

function addRole() {
  db.getDepartments().then(([depts]) => {
    const departmentChoices = depts.map(({ id, name }) => ({
      name: name,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary?",
        },
        {
          type: "list",
          name: "department_id",
          message: "What department does this role belong to?",
          choices: departmentChoices,
        },
      ])
      .then(function (responses) {
        db.createRole(responses).then(() => startPrompt());
      });
  })
};

function addEmployee() {
  db.getRoles().then(([roles]) => {
    const selectRole = roles.map((({ id, title }) => ({
      name: title,
      value: id
    })));

    db.getAllEmployee().then(([emps]) => {
      const selectManager = emps.map(({ id, first_name, last_name }) => ({
        name: first_name + ' ' + last_name,
        value: id
      }));
      selectManager.unshift({
        name: "No Manager", value: null
      })
      inquirer.prompt([
        {
          type: 'input',
          name: 'first_name',
          message: "Please enter the employee's first name: "
        },
        {
          type: 'input',
          name: 'last_name',
          message: "Please enter the employee's last name: "
        },
        {
          type: 'list',
          name: 'role_id',
          message: "What is the employee's title?",
          choices: selectRole
        },
        {
          type: 'list',
          name: 'manager_id',
          message: "Who is the employee's manager?",
          choices: selectManager
        }
      ]).then(function (responses) {
        db.createEmployee(responses).then(() => startPrompt())
      })
    })
  })
}

function updateEmployeeRole() {
  db.getRoles().then(([roles]) => {
    const selectRole = roles.map((({ id, title }) => ({
      name: title,
      value: id
    })));
    db.getAllEmployee().then(([emps]) => {
      const selectEmployee = emps.map(({ id, first_name, last_name }) => ({
        name: first_name + ' ' + last_name,
        value: id
      }));

      inquirer.prompt([
        {
          type: 'list',
          name: 'empId',
          choices: selectEmployee,
          message: "Please choose an employee from the list?",
        },
        {
          type: 'list',
          name: 'roleId',
          message: "What is the employee's new role?",
          choices: selectRole
        },
      ]).then(function (responses) {
        const empId = responses.empId;
        const roleId = responses.roleId
        db.updateEmployeeRole(roleId, empId).then(() => startPrompt())
      })
    })
  })
}

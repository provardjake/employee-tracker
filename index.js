const inquirer = require("inquirer");
const mysql = require("mysql2");
require('dotenv').config()

// creates the connection to the sql database
const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// function to prompt the user for what they would like to do
function init(){
    console.log("Main Menu");

    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "mainMenuSelection",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Quit"
            ]
        }
    ])
    .then((res) =>{
        switch(res.mainMenuSelection){
            case "View all departments": 
                viewDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update an employee role":
                updateRole();
                break;
            case "Quit":
                process.exit();
            default:
                process.exit();
        }
    })
}

// views all the department table in the sql database
function viewDepartments(){
    db.query("SELECT * FROM department;", (err, res) =>{
        err ? console.log(err) : console.table(res), init();
    })
}

// views the roles table in the sql database
function viewRoles(){
    db.query("SELECT * FROM roles;", (err, res) =>{
        err ? console.log(err) : console.table(res), init();
    })
}

// views the employee table in the sql database
function viewEmployees(){
    db.query("SELECT * FROM employee;", (err, res) =>{
        err ? console.log(err) : console.table(res), init();
    })
}

// adds a new department to the department table from the user entered parameter
function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the name of the department: ",
            name: "newDepartment"
        }
    ])
    .then((res) =>{
        db.query(`INSERT INTO department (name) VALUES ("${res.newDepartment}");`, (err, res) =>{
            err ? console.log(err) : console.log("New department added!"), viewDepartments();
        });
    });
}

// adds a new role to the roles table from user entered parameters
function addRole(){
    const departmentId = [];
    const departmentName = [];
    // creates the list of departments from the existing table
    db.query("SELECT * FROM department;", (err, res) =>{
        if (err){
            console.log(err);
        }
        else{
            for(let i = 0; i < res.length; i++){
                departmentId.push(res[i].id);
                departmentName.push(res[i].name);
            }
        }
    })
    
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the title of the new role: ",
            name: "newRole"
        },
        {
            type: "input",
            message: "Enter the salary of the new role: ",
            name: "newSalary"
        },
        {
            type: "list",
            message: "Select the department the new role belongs to",
            name: "newDepartment",
            choices: departmentName
        }
    ])
    .then((res) =>{
        let newDepartmentId;
        // assigns the id of the department to the corresponding user selection
        for(let x = 0; x < departmentId.length; x++){
            if(res.newDepartment === departmentName[x]){
                newDepartmentId = departmentId[x];
                break;
            }
        }
        db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${res.newRole}", ${res.newSalary}, ${newDepartmentId});`, (err, res) =>{
            err ? console.log(err) : console.log("New Role Added!"), viewRoles();
        });
    });
}

init();
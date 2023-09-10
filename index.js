const inquirer = require("inquirer");
const mysql = require("mysql2");
require('dotenv').config()

const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

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

function viewDepartments(){
    db.query("SELECT * FROM department;", (err, res) =>{
        err ? console.log(err) : console.table(res), init();
    })
}

function viewRoles(){
    db.query("SELECT * FROM roles;", (err, res) =>{
        err ? console.log(err) : console.table(res), init();
    })
}

function viewEmployees(){
    db.query("SELECT * FROM employee;", (err, res) =>{
        err ? console.log(err) : console.table(res), init();
    })
}



init();
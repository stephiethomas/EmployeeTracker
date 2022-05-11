const inquirer = require("inquirer");
const mysql = require("mysql2");



function startProgram() {
  inquirer
    .prompt({
      type: "list",
      name: "actionChoice",
      message: "What would you like to do today?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add employee",
        "Add role",
        "Add department",
        "Update role",
      ],
    })

    .then((answer) => {
      switch (answer.actionChoice) {
        case "View all departments":
          viewAllDept();
          break;

        case "View all roles":
          viewAllRoles();
          break;

        case "View all employees":
          viewAllEmp();
          break;

        case "Add employee":
          addEmp();
          break;

        case "Add role":
          addRole();
          break;

        case "Add department":
          addDept();
          break;

        case "Update role":
          updateRole();
          break;
      }
    });
}

// View all departments
const viewDept = () => {
    db.query('SELECT dept_name FROM department ORDER BY id', function (err, results) {
        console.table(results)
    })
}

// View all roles
const viewRoles = () => {
    db.query('SELECT * FROM employee_role ORDER BY id', function (err, results) {
        console.table(results)
    })
}

// View all employees
const viewEmployees = () => {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results)
    })
}

// Add employee
addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the new employees first name?',
            validate: (newOption) => {
                if (newOption) {
                    return true;
                } else {
                    console.log('Please enter a valid response');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the new employees last name?',
            validate: (newOption) => {
                if (newOption) {
                    return true;
                } else {
                    console.log('Please enter a valid response');
                    return false;
                }
            },
        },
    ])
    .then((optionResponse) => {
        const parameters = [optionResponse.first_name, optionResponse.last_name];
        const newRoleSql = `SELECT employee_role.id, employee_role.title FROM employee_role`;

        db.query(newRoleSql, (err, res) => {
            if (err) throw err;
            const roles = res.map(({ id, title }) => ({
                name: title,
                value: id,
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name:'role',
                    message: 'What is this employees role?',
                    choices: roles,
                },
            ])
            .then((roleChoice) => {
                const role = roleChoice.role;
                parameters.push(role);

                const newManagerSql = `SELECT * FROM employee_role`;

                db.query(newManagerSql, (err, res) => {
                    if (err) throw err;
                    const newManager = res.map(({ id, first_name, last_name }) => ({
                        name: first_name + ' ' + last_name,
                        value: id,
                    }));

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'manager',
                            message: 'Who is the employees manager?',
                            choices: newManager,
                        },
                    ])
                    .then((managerChoice) => {
                        const manager = managerChoice.manager;
                        parameters.push(manager);

                        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                        db.query(sql, parameters, (err, result) => {
                            if (err) throw err;
                            console.log('The employee has been added.');
                            viewEmployees();
                        })
                    })
                })
            })
        })
    })
}


// Update role
updateRole = () => {
    const employeeUpdateSql = `SELECT * FROM employee`;

    db.query(employeeUpdateSql, (err, res) => {
        if (err) throw err;
        
        const employees = res.map(({ id, first_name, last_name}) => ({ name: first_name + ' ' + last_name, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Choose an employee to update.',
                choices: employees
            }
        ])
        .then (employeeChoice => {
            const employee = employeeChoice.name;
            const parameters = [];
            parameters.push(employee);

            const newRoleSql = `SELECT * FROM employee_role`;

            db.query(newRoleSql, (err, res) => {
                if (err) throw err;

                const roles = res.map(({ id, title}) => ({ name: title, value: id }));

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: 'New Role?',
                        choice: roles
                    }
                ])
                .then (roleChoice => {
                    const role = roleChoice.role;
                    parameters.push(role);

                    let newEmployeeRole = parameters[0]
                    parameters[0] = role
                    parameters[1] = employee

                    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

                    db.query(sql, parameters, (err, results) => {
                        if (err) throw err;
                        console.log('Updated!');

                        viewEmployees();
                    })
                }) 
            })
        })
    })
}
addDept = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDept',
            message: 'Name of department?',
            validate: (newOption) => {
                if (newOption) {
                    return true;
                } else {
                    console.log('Please enter a valid response');
                    return false;
                }
            }
        }
    ])
    .then((optionResponse) => {
        const sql = `INSERT INTO department (dept_name) VALUES (?)`;

        db.query(sql, optionResponse.newDept, (err, res) => {
            if (err) throw err;
            console.log("The " + optionResponse.newDept + " dept has been added");
            viewDept();
        })

    })
}

startProgram();
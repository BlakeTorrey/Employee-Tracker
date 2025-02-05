import inquirer from 'inquirer';

export const mainMenu = async () => {
    const choices = [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'View Department Budget',
      'Add a Department',
      'Add a Role',
      'Add an Employee',
      'Update an Employee Role',
      'Delete Department',
      'Delete Role',
      'Delete Employee',
      'Exit'
    ];
    
    const response = await inquirer.prompt([{
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices
    }]);
  
    return response.choice;
};

export const departmentPrompt = async (departments, isForBudget = false) => {
    if (isForBudget && departments) {
        return await inquirer.prompt([{
            type: 'list',
            name: 'departmentId',
            message: 'Which department budget would you like to view?',
            choices: departments.map(dept => ({
                name: dept.name,
                value: dept.id
            }))
        }]);
    }

    return await inquirer.prompt([{
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?',
    }]);
};

export const rolePrompt = async (departments) => {
  const departmentChoices = departments.map(dept => ({
    name: dept.name,
    value: dept.id
  }));

  const response = await inquirer.prompt([
    {
      type: 'input',
      name: 'roleTitle',
      message: 'What is the title of the role?',
    },
    {
      type: 'number',
      name: 'roleSalary',
      message: 'What is the salary of the role?',
      validate: input => !isNaN(input) ? true : 'Please enter a valid number'
    },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Which department does the role belong to?',
      choices: departmentChoices
    }
  ]);
  return response;
};

export const employeePrompt = async (roles, employees) => {
  const roleChoices = roles.map(role => ({
    name: role.title,
    value: role.id
  }));

  const managerChoices = [
    { name: 'None', value: null },
    ...employees.map(emp => ({
      name: `${emp.first_name} ${emp.last_name}`,
      value: emp.id
    }))
  ];

  const response = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "What is the employee's first name?",
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the employee's last name?",
    },
    {
      type: 'list',
      name: 'roleId',
      message: "What is the employee's role?",
      choices: roleChoices
    },
    {
      type: 'list',
      name: 'managerId',
      message: "Who is the employee's manager?",
      choices: managerChoices
    }
  ]);
  return response;
};

export const updateRolePrompt = async (employees, roles) => {
  const employeeChoices = employees.map(emp => ({
    name: `${emp.first_name} ${emp.last_name}`,
    value: emp.id
  }));

  const roleChoices = roles.map(role => ({
    name: role.title,
    value: role.id
  }));

  const response = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: "Which employee's role do you want to update?",
      choices: employeeChoices
    },
    {
      type: 'list',
      name: 'newRoleId',
      message: 'What is the new role for this employee?',
      choices: roleChoices
    }
  ]);
  return response;
};

export const managerPrompt = async (employees) => {
    const managerChoices = employees.map(emp => ({
        name: `${emp.first_name} ${emp.last_name}`,
        value: emp.id
    }));

    return await inquirer.prompt([{
        type: 'list',
        name: 'managerId',
        message: 'Select a manager to view their employees:',
        choices: managerChoices
    }]);
};

export const updateManagerPrompt = async (employees) => {
    const employeeChoices = employees.map(emp => ({
        name: `${emp.first_name} ${emp.last_name}`,
        value: emp.id
    }));

    return await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Which employee\'s manager do you want to update?',
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'managerId',
            message: 'Who is their new manager?',
            choices: [{name: 'None', value: null}, ...employeeChoices]
        }
    ]);
};

export const deletePrompt = async (items, type) => {
    return await inquirer.prompt([{
        type: 'list',
        name: 'id',
        message: `Which ${type} would you like to delete?`,
        choices: items
    }]);
};
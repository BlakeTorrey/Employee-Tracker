import { mainMenu, departmentPrompt, rolePrompt, employeePrompt, updateRolePrompt, managerPrompt, updateManagerPrompt, deletePrompt } from './prompts.js';
import { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole, getEmployeesByManager, getDepartmentBudget, updateEmployeeManager, deleteDepartment, deleteRole, deleteEmployee } from '../db/queries.js';
import inquirer from 'inquirer';


const employeeManage = async () => {
    let exit = false;
    while (!exit) {
        const action = await mainMenu();
        switch (action) {
            case 'View All Departments':
                console.table(await getDepartments());
                break;
            case 'View All Roles':
                console.table(await getRoles());
                break;
            case 'View All Employees':
                console.table(await getEmployees());
                break;
            case 'View Employees by Manager':
                const managers = (await getEmployees())
                    .filter(emp => emp.manager_id === null)
                    .map(m => ({
                        name: `${m.first_name} ${m.last_name}`,
                        value: m.id
                    }));
                
                const { managerId } = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'managerId',
                        message: 'Which manager\'s employees would you like to view?',
                        choices: managers
                    }
                ]);
                
                console.table(await getEmployeesByManager(managerId));
                break;
            case 'View Employees by Department':
                const { departmentId } = await departmentPrompt(await getDepartments());
                console.table(await getEmployeesByDepartment(departmentId));
                break;
            case 'Add a Department':
                const name = await departmentPrompt();
                await addDepartment(name);
                console.log('Department added successfully!');
                break;
            case 'Add a Role':
                await addRole(...Object.values(await rolePrompt(await getDepartments())));
                console.log('Role added successfully!');
                break;
            case 'Add an Employee':
                await addEmployee(...Object.values(await employeePrompt(await getRoles(), await getEmployees())));
                console.log('Employee added successfully!');
                break;
            case 'Update an Employee Role':
                await updateEmployeeRole(...Object.values(await updateRolePrompt(await getEmployees(), await getRoles())));
                console.log('Employee role updated successfully!');
                break;
            case 'Update Employee Manager':
                const { employeeId, newManagerId } = await updateManagerPrompt(await getEmployees());
                await updateEmployeeManager(employeeId, newManagerId);
                break;
            case 'View Department Budget':
                const departments = await getDepartments();
                const { departmentId: budgetDeptId } = await departmentPrompt(departments, true);
                const budget = await getDepartmentBudget(budgetDeptId);
                if (budget) {
                    console.log(`Total Budget for ${budget.name}: $${budget.total_budget.toLocaleString()}`);
                } else {
                    console.log('No employees found in this department.');
                }
                break;
            case 'Delete Department':
                const deptToDelete = await deletePrompt(
                    (await getDepartments()).map(d => ({name: d.name, value: d.id})),
                    'department'
                );
                await deleteDepartment(deptToDelete.id);
                console.log('Department deleted successfully!');
                break;
            case 'Delete Role':
                const roleToDelete = await deletePrompt(
                    (await getRoles()).map(r => ({name: r.title, value: r.id})),
                    'role'
                );
                await deleteRole(roleToDelete.id);
                console.log('Role deleted successfully!');
                break;
            case 'Delete Employee':
                const empToDelete = await deletePrompt(
                    (await getEmployees()).map(e => ({
                        name: `${e.first_name} ${e.last_name}`,
                        value: e.id
                    })),
                    'employee'
                );
                await deleteEmployee(empToDelete.id);
                console.log('Employee deleted successfully!');
                break;
            case 'Exit':
                exit = true;
                break;
            default:
                console.log("Invalid option. Please try again.");
        }
    }
};


employeeManage();
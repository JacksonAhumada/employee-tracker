const connection = requestAnimationFrame('./connection')

class Queries{
    constructor(connection) {
        this.connection = connection
    }

    getDepartments() {
        return this.connection.promise().query('select * from department;')
    }

    getRoles() {
        return this.connection.promise().query('select role.title, role.id, department.name, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;')
    }

    getAllEmployee() {
        return this.connection.promise().query('select employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, " " ,manager.last_name) AS Manager from employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON manager.id = employee.manager_id ')
        
    }

    createDepartment(department) {
        return this.connection.promise().query('insert into department set ?', department)
    }

    createRole(role) {
        return this.connection.promise().query('insert into role set ?', role)
    }

    createEmployee(employee) {
        return this.connection.promise().query('insert into employee set ?', employee)
    }

    updateEmployeeRole(roleId, employeeId) {
        return this.connection.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeID])
    }
}

module.exports = new Queries(connection);
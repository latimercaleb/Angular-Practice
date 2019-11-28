"use strict";
// Ready for classes
class Department {
    constructor(name, employees = [], id = '') {
        this.name = name;
        this.employees = employees;
        this.id = id;
    }
    describe() {
        console.log('Department: ' + this.id + ' ' + this.name);
    }
    addEmployee(emp) {
        this.employees.push(emp);
    }
    showEmployeeData() {
        console.log(`Total employees: ${this.employees.length} of ${this.employees}`);
    }
}
const accounting = new Department('Accounting', [], 'The Account Team');
accounting.describe();
accounting.addEmployee('Shibo');
accounting.addEmployee('Jin');
// accounting.employees[2] = 'Ron'; // Doesn't work on private
accounting.showEmployeeData();
console.log(accounting);

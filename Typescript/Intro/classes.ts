// Ready for classes
abstract class Department{
    constructor(public name: string, 
        protected readonly id: string = '',
        private employees: string[]=[]){}

    abstract describe(): void;

    addEmployee(emp: string){
        this.employees.push(emp);
    }

    static createEmployee(name: string){
        return{
            name: name
        }
    }

    static fiscalYear = 2020;

    showEmployeeData(){
        console.log(`Total employees: ${this.employees.length} of ${this.employees}`);
    }

}

class AccountingDepartment extends Department{
    private static instance: AccountingDepartment;
    private constructor(name: string, id: string, private reports: string[]=[]){
         super(name,id);
     }
    
    addReport(rep: string){
        this.reports.push(rep);
    }

    
    showReports(){
        console.log(this.reports);
    }
    
    describe(){
        console.log('Accounting Department')
    }

    static getInstance(){
        if(this.instance){
            return this.instance;
        }else{
            this.instance = new AccountingDepartment('Accounting','387');
            return this.instance;
        }
    }
}

class ITDepartment extends Department{
    private lastQuery: string;
    constructor(name: string, private admins: string[]){
        super(name);
        this.lastQuery = '';
    }

    addAdmin(name: string){
        this.admins.push(name);
    }
    
    listAdmins(){
        console.log(`Admins are: ${this.admins}`);
    }

    private newQuery(query: string){
        this.lastQuery = query;
    }

    get latestQuery(){
        return this.lastQuery ? this.lastQuery : 'No Query available';
    }

    set makeNewestQuery(str:string){
        // Could check val before passing to set
        this.newQuery(str);
    }

    describe(){
        console.log('IT Department: ' + this.id + ' '+ this.name)
    }

}



const accounting = AccountingDepartment.getInstance();
const it = new ITDepartment('GPU Labs',['Seya','Path','Wraith'])
accounting.describe();
accounting.addEmployee('Shibo');
accounting.addEmployee('Jin');

// accounting.employees[2] = 'Ron'; // Doesn't work on private
accounting.showEmployeeData();
accounting.addReport('New report');
accounting.showReports();

console.log(accounting);

it.listAdmins();
it.addAdmin('Jenny');
it.describe();

// Getters & Setters must be called like properties but implemented as methods
// console.log(it.lastQuery); // Private, doesn't work
console.log(it.latestQuery);
it.makeNewestQuery= 'Select ... From ...';
console.log(it.latestQuery);

// Static methods
const newGuy = Department.createEmployee('bar');
console.log(newGuy);
console.log(Department.fiscalYear);


// Intersection types
type Admin = {
    name: string;
    priviledges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};


// The same thing can be acheived with interfaces and elevated employee extending like 
// interface ElevatedEmployee extends Employee, Admin{...}
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Newbie',
    priviledges: ['push-code'],
    startDate: new Date()
};
// Intersection types can be used with any type

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric; // Gets numeric since it's an intersection

function add(a: Combinable, b:Combinable){
    if(typeof(a) === 'string' || typeof(b) === 'string' ){ // basic example of type guard
        return a.toString() + b.toString();
    }
    return a +b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee){
    console.log(`Name: ${emp.name}`);
    // The type guard above won't work need to leverage another way to check properties to define types
    if('priviledges' in emp){
        console.log(`Priviledges: ${emp.priviledges}`);
    }
    if('startDate' in emp){
        console.log(`Start Date: ${emp.startDate}`);
    }
}

printEmployeeInformation(e1);
printEmployeeInformation({name: 'Bad Employee', startDate: new Date()});

// Class type guards a re a bit more unique
class Car{
    drive(){
        console.log('Driving');
    }
}
class Truck{
    drive(){
        console.log('Truck is driving');
    }
    loadCargo(){
        console.log('Cargo loading');
    }
}

type Vehicle = Car | Truck;
const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle){
    vehicle.drive();
    if (vehicle instanceof Truck){
        vehicle.loadCargo();
    }
}

useVehicle(v1);
useVehicle(v2);

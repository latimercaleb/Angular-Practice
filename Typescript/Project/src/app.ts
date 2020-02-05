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

// Class type guards can use instanceof as a type guard, instanceof doesn't work inside of interfaces though since they don't compile into anything
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

// Discriminated Unions
interface Bird {
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal){
    // Pass in a type-literal property, then in the method swap on that
    let speed: number;
    switch(animal.type){
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log(`Moving with speed: ${speed}`);
}

moveAnimal({type: 'bird', flyingSpeed:25});

// Type Casting

const pTag = document.querySelector('p'); // Returns HTMLParagraphElement | null
const pTagById = document.getElementById('testId'); // Returns HTMLElement | null, TS can't infer what html element since I didn't fetch it
const input = document.getElementById('input')!; // Adding the exclamation point means not null
// input.value = 'Hello Error';  // Renders, but throws a TS err because TS doesn't recognize it as an input

// Method 1- Pre-cast: Include type for property in front with <>, ok for Angular, bad for React
const castedInput = <HTMLInputElement>document.getElementById('input')!; 
castedInput.value = 'Hello Success1'; 

// Method 2- Post-cast: Include type for property after with as keyword, good for either or
const secondCastedInput = document.getElementById('input')! as HTMLInputElement; 
castedInput.value = 'Hello Success2'; 

// Index Properties




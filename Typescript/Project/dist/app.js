"use strict";
const e1 = {
    name: 'Newbie',
    priviledges: ['push-code'],
    startDate: new Date()
};
function add(a, b) {
    if (typeof (a) === 'string' || typeof (b) === 'string') { // basic example of type guard
        return a.toString() + b.toString();
    }
    return a + b;
}
function printEmployeeInformation(emp) {
    console.log(`Name: ${emp.name}`);
    // The type guard above won't work need to leverage another way to check properties to define types
    if ('priviledges' in emp) {
        console.log(`Priviledges: ${emp.priviledges}`);
    }
    if ('startDate' in emp) {
        console.log(`Start Date: ${emp.startDate}`);
    }
}
printEmployeeInformation(e1);
printEmployeeInformation({ name: 'Bad Employee', startDate: new Date() });
// Class type guards can use instanceof as a type guard, instanceof doesn't work inside of interfaces though since they don't compile into anything
class Car {
    drive() {
        console.log('Driving');
    }
}
class Truck {
    drive() {
        console.log('Truck is driving');
    }
    loadCargo() {
        console.log('Cargo loading');
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo();
    }
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
    // Pass in a type-literal property, then in the method swap on that
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log(`Moving with speed: ${speed}`);
}
moveAnimal({ type: 'bird', flyingSpeed: 25 });

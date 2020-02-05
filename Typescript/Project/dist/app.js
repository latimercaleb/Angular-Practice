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
// Type Casting
const pTag = document.querySelector('p'); // Returns HTMLParagraphElement | null
const pTagById = document.getElementById('testId'); // Returns HTMLElement | null, TS can't infer what html element since I didn't fetch it
const input = document.getElementById('input'); // Adding the exclamation point means not null
// input.value = 'Hello Error';  // Renders, but throws a TS err because TS doesn't recognize it as an input
// Method 1- Pre-cast: Include type for property in front with <>, ok for Angular, bad for React
const castedInput = document.getElementById('input');
castedInput.value = 'Hello Success1';
// Method 2- Post-cast: Include type for property after with as keyword, good for either or
const secondCastedInput = document.getElementById('input');
castedInput.value = 'Hello Success2';

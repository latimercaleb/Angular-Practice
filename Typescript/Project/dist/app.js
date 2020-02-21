"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Decorators
function Logger(constructor) {
    console.log('Logging...');
    console.log(constructor);
}
let Person = class Person {
    constructor() {
        this.name = 'Sanic';
        console.log('Creating person obj...');
    }
};
Person = __decorate([
    Logger
], Person);
const per = new Person();
console.log(per);
// Decorator Factory, Factory format returns a function to use as a decorator, if you do this you have to return it
function AniLogger(logNote) {
    return function (constructor) {
        console.log(logNote);
        console.log(constructor);
    };
}
let Animal = class Animal {
    constructor() {
        this.name = 'Robotnik';
        console.log('Creating person obj...');
    }
};
Animal = __decorate([
    AniLogger('ANIMAL LOGGED!')
], Animal);
const ani = new Animal();
console.log(ani);

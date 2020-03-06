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
// Decorators with a template
function templateFactory(template, hookId) {
    return function (constructor) {
        const domHook = document.getElementById(hookId);
        const text = new constructor();
        if (domHook) {
            domHook.innerHTML = template;
            domHook.querySelector("h2").textContent = text.name;
        }
    };
}
// Apply template decorator
let TempPerson = class TempPerson {
    constructor() {
        this.name = 'Callat';
        console.log('Creating a templated person ...');
    }
};
TempPerson = __decorate([
    templateFactory('<h2>My person obj</h2>', 'templateDecorator')
], TempPerson);
/*
    Core goal of decorators is that you can use them like this for meta programming
    This is VERY frequent in Angular
*/
// Multiple decorators example, in terms of ordering, they are called top down but executed bottom-up
let NewPerson = class NewPerson {
    constructor() {
        this.name = 'Tise';
        console.log('Creating a new person');
    }
};
NewPerson = __decorate([
    templateFactory('<h2>My other person</h2>', 'otherPersonDecorator'),
    Logger
], NewPerson);
// Property decorators get two args, target and property name
// Target can be an object prototype (for instance property), or the constructor function (static property) 
// Property name can be a string or symbol, depending on what the class is doing
// Executes on class definition, not instantiation
function productLog(target, propertyName) {
    console.log('Property Decorator');
    console.log(target, propertyName);
}
function productSecondLog(target, name, descriptor) {
    console.log('Accessor Decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function thirdLog(target, name, descriptor) {
    console.log('Mehtod Decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
// Paramters work the same way just a different param
// Parameter, Property, Accessor & Method Decorators
class Product {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error('Price cannot be negative');
        }
    }
    getTaxPriceSum(tax) {
        return this.price * (1 + tax);
    }
}
__decorate([
    productLog
], Product.prototype, "title", void 0);
__decorate([
    productSecondLog
], Product.prototype, "price", null);
__decorate([
    thirdLog
], Product.prototype, "getTaxPriceSum", null);
// Some decorators can return a value, such as class functions can return a new constructor function
// return class extends constructor {} to retain functionality but return a new constructor 
// In other decorators like accessor, property decorators etc, you can change the descriptors in which will change the property
// Example: Autobind decorator
function Autobind(trgt, mthod, descriptor) {
    const firstMthod = descriptor.value;
    const newMthod = {
        configurable: true,
        enumerable: false,
        get() {
            const bound = firstMthod.bind(this);
            return bound;
        },
    };
    return newMthod;
}
class Printer {
    constructor() {
        this.message = 'Click fired';
    }
    showMessage() {
        alert(this.message);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const p = new Printer();
const btn = document.querySelector('#autoBind');
btn.addEventListener('click', p.showMessage);
const registeredValidators = {};
function Required(trgt, propName) {
    registeredValidators[trgt.constructor.name] = {
        [propName]: ['required']
    };
}
function PositiveNumber(trgt, propName) {
    registeredValidators[trgt.constructor.name] = {
        [propName]: ['positive']
    };
}
function validate(obj) {
    // Imposes validation rules
    const validatorConf = registeredValidators[obj.constructor.name];
    if (!validatorConf) {
        return true;
    }
    for (const prop in validatorConf) {
        for (const validator of validatorConf[prop]) {
            switch (validator) {
                case 'required':
                    return !!obj[prop];
                case 'positive':
                    return obj[prop] > 0;
            }
        }
    }
    return true;
}
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
    evt.preventDefault();
    const titleE = document.getElementById('title');
    const priceE = document.getElementById('price');
    const title = titleE.value;
    const price = +priceE.value;
    const createdCourse = new Course(title, price);
    console.log(createdCourse);
});

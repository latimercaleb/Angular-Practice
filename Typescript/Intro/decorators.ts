// Decorators
function Logger(constructor: Function){
    console.log('Logging...');
    console.log(constructor);
}
@Logger 
class Person{
    name = 'Sanic';
    constructor(){
        console.log('Creating person obj...');
    }
}

const per = new Person();
console.log(per);

// Decorator Factory, Factory format returns a function to use as a decorator, if you do this you have to return it
function AniLogger (logNote: string){
    return function (constructor: Function){
        console.log(logNote);
        console.log(constructor);
    }
}
@AniLogger('ANIMAL LOGGED!') 
class Animal{
    name = 'Robotnik';
    constructor(){
        console.log('Creating person obj...');
    }
}

const ani = new Animal();
console.log(ani);

// Decorators with a template
function templateFactory(template: string, hookId: string){
    return function (constructor: Function){
        const domHook = document.getElementById(hookId);
        const text = new constructor();
        if(domHook){
            domHook.innerHTML = template;
            domHook.querySelector("h2")!.textContent = text.name;
        }
    }
}

// Apply template decorator
@templateFactory('<h2>My person obj</h2>','templateDecorator')
class TempPerson{
    name = 'Callat';
    constructor(){
        console.log('Creating a templated person ...');
    }
}

/*
    Core goal of decorators is that you can use them like this for meta programming
    This is VERY frequent in Angular
*/

// Multiple decorators example, in terms of ordering, they are called top down but executed bottom-up
@templateFactory('<h2>My other person</h2>','otherPersonDecorator')
@Logger
class NewPerson{
    name ='Tise';
    constructor(){
        console.log('Creating a new person')
    }
}

// Property decorators get two args, target and property name
// Target can be an object prototype (for instance property), or the constructor function (static property) 
// Property name can be a string or symbol, depending on what the class is doing
// Executes on class definition, not instantiation
function productLog(target: any, propertyName: string){
    console.log('Property Decorator');
    console.log(target, propertyName);
}  

function productSecondLog(target: any, name:string, descriptor: PropertyDescriptor){
    console.log('Accessor Decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function thirdLog(target: any, name: string, descriptor: PropertyDescriptor){
    console.log('Mehtod Decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

// Paramters work the same way just a different param

// Parameter, Property, Accessor & Method Decorators
class Product{
    @productLog
    title: string;
    private _price: number;

    @productSecondLog
    set price (val: number){
        if (val > 0){
            this._price = val;
        }else{
            throw new Error('Price cannot be negative');
        }
    }

    constructor(t: string, p: number){
        this.title = t;
        this.price = p;
    }
    @thirdLog
    getTaxPriceSum(tax: number){
        return this.price * (1 + tax);
    }
}

// Some decorators can return a value, such as class functions can return a new constructor function
// return class extends constructor {} to retain functionality but return a new constructor 

// In other decorators like accessor, property decorators etc, you can change the descriptors in which will change the property

// Example: Autobind decorator
function Autobind(trgt: any, mthod:string, descriptor: PropertyDescriptor){
    const firstMthod = descriptor.value;
    const newMthod: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get(){
            const bound = firstMthod.bind(this);
            return bound;
        },
    };
    return newMthod;
}
class Printer{
    message = 'Click fired';
    @Autobind
    showMessage(){
        alert(this.message);
    }
}

const p = new Printer();
const btn = document.querySelector('#autoBind')!;
btn.addEventListener('click',p.showMessage);

// Example 2: Validation Decorator, there;s a package Typescript class validator that does this better, sample is basic
interface ValidatorSetup{
    [prop: string]:{
        [validatableProp: string] : string[]
    }
}

const registeredValidators: ValidatorSetup = {};

function Required(trgt: any, propName: string){
    registeredValidators[trgt.constructor.name] = {
        [propName] : ['required']
    };
}
function PositiveNumber(trgt: any, propName: string){
    registeredValidators[trgt.constructor.name] = {
        [propName] : ['positive']
    };
}
function validate(obj: any){
    // Imposes validation rules
    const validatorConf = registeredValidators[obj.constructor.name];
    if(!validatorConf){return true;}
    for(const prop in validatorConf){
        for(const validator of validatorConf[prop]){
            switch(validator){
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
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number){
        this.title =t;
        this.price = p;
    }
}

const form = document.querySelector('form')!;
form.addEventListener('submit', evt => {
    evt.preventDefault();
    const titleE = document.getElementById('title') as HTMLInputElement;
    const priceE = document.getElementById('price') as HTMLInputElement;

    const title = titleE.value;
    const price = +priceE.value;

    const createdCourse = new Course(title, price);
    console.log(createdCourse);
})
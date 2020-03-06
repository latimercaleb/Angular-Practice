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
class Printer{
    message = 'Click fired';
    showMessage(){
        alert(this.message);
    }
}

const p = new Printer();
const btn = document.querySelector('#autoBind')!;
btn.addEventListener('click',p.showMessage.bind(p));
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
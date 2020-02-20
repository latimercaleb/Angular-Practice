// Index Properties
// The below is nice for errors but what if you wanted it to cover undefined errors and only store errors when they are emitted
interface ErrContainer {
    email: 'Not a valid email';
    username: 'Must start with a valid character';
}

// Use an index type
interface ErrorContainer {
    // Don't know the property name, how many properties or what the value is
    // But I do know the type
    [prop: string]: string;
    // cid: number; // This will trigger error because this is an index type now
}

const errs: ErrorContainer = {
    email: 'Not a valid email',
    username: 'Must start with a valid character',
};

// function overloading- define multiple function sigs for one function
// If using more or less params make sure to take them as optional with ?: 
function add(n: number): number;
function add(a: number, b?: number): number;
function add(a: string, b?: string) { 
    // Code here
    return a + b;
}

// Optional Chaining: Say your getting a complex object from an api and you don't know if the prop name is contained
const fetchedData = {
    id: 'xG42',
    name: 'Korn',
    job: {
        // title: 'QA',
        description: 'I do stuff'
    }
};
console.log(fetchedData.job && fetchedData.job.title); // Old school way of checking if it exists
console.log(fetchedData?.job?.title); // Optional chaining, does the property exist? If so continue chain if not cancel the call

// Nullish Coalescing
const userInput = null;
const store = userInput || 'Some Default'; // Gets the default if falsy (null, NAN, 0, empty string, undefined)
const otherStore = userInput ?? 'Some Default' // accepts blanks as valid values and only works on null or undefined values 

// Generics: Enforce better type safety by getting additional type information

// Arrays are generics and it uses the params passed in to infer it's type
const names = ['alpha', 'beta'];
const otherStuff: Array<string> = []; // Declare type with <>

// Can say it will always return a string and typescript can support string methods on the prm 
const prm: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Completed!');
    }, 2000);
});

prm.then(data => data.split(' '));

// The generic function
function mergeObj(objA: object, objB: object){
    return Object.assign(objA, objB);
}

console.log(mergeObj({name: 'alpha'}, {age: 'beta'}));
const m = mergeObj({name: 'alpha'}, {age: 'beta'});
m.age; m.name; // This doesn't work since TS doesn't know type, could typecast, but this would be a good case for generics.

function mergeGeneric<T, U>(objA: T, objB: U){ // TS knows that this is the intersection type now
    // Could pass in concrete types above instead of using generics but it'd be redundant
    return Object.assign(objA, objB);
}

const gen = mergeGeneric({name: 'alpha'}, {age: 'beta'});
gen.age; gen.name;  // This works
console.log (`${gen.age} of ${gen.name}`);

// Even generics require some sort of type limitation to be effective, these are called type constraints
function mergeConstrained<T extends object, U extends object>(objA: T, objB: U){ // TS knows that this is the intersection type now
    // Could pass in concrete types above instead of using generics but it'd be redundant
    return Object.assign(objA, objB);
}

const unassignable = mergeConstrained({name: 'foo', age: 21}, 50); // 50 will throw type error as it should this helps avoid errors
console.log(unassignable);
interface hasLength {
    length: number;
}

function countNPrint<T extends hasLength>(elm:T): [T, string]{
    let text = 'none';
    elm.length > 0 ? text = `Length is ${elm.length}` : ''; // Use constraint to enforce that param does indeed have a length property
    return [elm, text];
}

console.log(countNPrint(5));
"use strict";
var _a, _b;
const errs = {
    email: 'Not a valid email',
    username: 'Must start with a valid character',
};
function add(a, b) {
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
console.log((_b = (_a = fetchedData) === null || _a === void 0 ? void 0 : _a.job) === null || _b === void 0 ? void 0 : _b.title); // Optional chaining, does the property exist? If so continue chain if not cancel the call
// Nullish Coalescing
const userInput = null;
const store = userInput || 'Some Default'; // Gets the default if falsy (null, NAN, 0, empty string, undefined)
const otherStore = (userInput !== null && userInput !== void 0 ? userInput : 'Some Default'); // accepts blanks as valid values and only works on null or undefined values 
// Generics: Enforce better type safety by getting additional type information
// Arrays are generics and it uses the params passed in to infer it's type
const names = ['alpha', 'beta'];
const otherStuff = []; // Declare type with <>
// Can say it will always return a string and typescript can support string methods on the prm 
const prm = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Completed!');
    }, 2000);
});
prm.then(data => data.split(' '));
// The generic function
function mergeObj(objA, objB) {
    return Object.assign(objA, objB);
}
console.log(mergeObj({ name: 'alpha' }, { age: 'beta' }));
const m = mergeObj({ name: 'alpha' }, { age: 'beta' });
m.age;
m.name; // This doesn't work since TS doesn't know type, could typecast, but this would be a good case for generics.
function mergeGeneric(objA, objB) {
    // Could pass in concrete types above instead of using generics but it'd be redundant
    return Object.assign(objA, objB);
}
const gen = mergeGeneric({ name: 'alpha' }, { age: 'beta' });
gen.age;
gen.name; // This works
console.log(`${gen.age} of ${gen.name}`);
// Generic Type Contraints
// Even generics require some sort of type limitation to be effective, these are called type constraints
function mergeConstrained(objA, objB) {
    // Could pass in concrete types above instead of using generics but it'd be redundant
    return Object.assign(objA, objB);
}
const unassignable = mergeConstrained({ name: 'foo', age: 21 }, 50); // 50 will throw type error as it should this helps avoid errors
console.log(unassignable);
function countNPrint(elm) {
    let text = 'none';
    elm.length > 0 ? text = `Length is ${elm.length}` : ''; // Use constraint to enforce that param does indeed have a length property
    return [elm, text];
}
console.log(countNPrint(5)); // Errors because 5 does not have a propert of .length
// Keyof Constraint
function extractAndExplain(obj, key) {
    return obj[key];
}
console.log(extractAndExplain({ name: 'test' }, 'name')); // works because the object is defined to have a key with that name
// console.log(extractAndExplain({name: 'test'}, 'age')); // fails
//Generic classes
class StorageData {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        this.data.splice(this.data.indexOf(item), 1); // Won't work on objects
    }
    getItems() {
        return [...this.data];
    }
}
const textData = new StorageData();
textData.addItem('Try');
console.log(textData.getItems());
const numData = new StorageData(); // Can be flexible with types

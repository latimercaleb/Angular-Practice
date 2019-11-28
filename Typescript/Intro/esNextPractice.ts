// NextGen JS that typescript supports

// Arrow functions
const add = (a: number,b:number) => a+b;

const printOutput = (out: string | number) => {
    console.log('2 args');
    console.log(out);
}

const noArg = () => console.log('No args');

console.log(add(2,3));

console.log(printOutput('test'));
noArg();

// Default params  
const addDefaulted = (a: number,b:number = 1) => a+b;
console.log(addDefaulted(2,3));
console.log(addDefaulted(2));
console.log(addDefaulted(0));

// Spread operator
const skills = ['JS','TS','CSS','JSX'];
const newSkils = ['Design'];
newSkils.push(... skills);
console.log(newSkils);

const set = {
    name: 'name',
    age: 2
}

const copied = set; // copies address
console.log(copied)

const realCopy = {...set}
console.log(realCopy);

// Rest params 
const addREST = (...nums: number[]) => {
    return nums.reduce((total,val) =>{
        return total + val;
    },0)
};

const addedNums = addREST(2,3,4,5,6);
const otherNumes = addREST(1,2,1);
console.log(addedNums);
console.log(otherNumes);

// Destructuring 
const skill1 = skills[1];
const skill2 = newSkils[0];

const [skill3,skill4] = skills;
const [... anythingElse] = newSkils;
console.log(skill1);
console.log(skill2);
console.log(skill3);
console.log(skill4);
console.log(anythingElse);
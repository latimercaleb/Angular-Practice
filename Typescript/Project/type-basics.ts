function add (first: number, second: number){
    return first + second;
}

const num1 = 5;
const num2 = 2.8;

console.log(`Result of add: ${add(num1,num2)}`);

// Objects, arrays, tuples, enums
enum Role {JEDI,SITH,ROGUE};
const person= {
    name: 'callat',
    age: 26,
    skills: ['JS', 'TS'],
    role: [1, 'Aeromancer'],
    signature: Role.SITH
}

person.skills.push('PHP');
person.role.push('Admin')

console.log(person.name);

for (const tech of person.skills){
    console.log(tech);
}

console.log(person.role);

if(person.signature == 1){
    console.log('It\'s a sith lord! ');
}
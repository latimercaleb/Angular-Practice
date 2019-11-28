function add(first, second) {
    return first + second;
}
var num1 = 5;
var num2 = 2.8;
console.log("Result of add: " + add(num1, num2));
// Objects, arrays, tuples, enums
var Role;
(function (Role) {
    Role[Role["JEDI"] = 0] = "JEDI";
    Role[Role["SITH"] = 1] = "SITH";
    Role[Role["ROGUE"] = 2] = "ROGUE";
})(Role || (Role = {}));
;
var person = {
    name: 'callat',
    age: 26,
    skills: ['JS', 'TS'],
    role: [1, 'Aeromancer'],
    signature: Role.SITH
};
person.skills.push('PHP');
person.role.push('Admin');
console.log(person.name);
for (var _i = 0, _a = person.skills; _i < _a.length; _i++) {
    var tech = _a[_i];
    console.log(tech);
}
console.log(person.role);
if (person.signature == 2) {
    console.log('It\'s a sith lord! ');
}

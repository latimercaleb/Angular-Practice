"use strict";
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet(phrase) {
        console.log(`${phrase} pleased to meet you, ${this.name}`);
    }
}
let me = new Person('callat', 4);
me.greet('herro');

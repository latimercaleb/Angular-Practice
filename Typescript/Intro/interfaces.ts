interface addFun{
    (a: number, b:number): number;
}

interface Named{
    readonly name: string;
    lastname ?: string; // optional param
}

interface Greetable extends Named {
    greet(phrase: string) : void;
}

class Person implements Greetable {
    constructor(public name: string, public age: number){}
    greet(phrase: string){
        console.log(`${phrase} pleased to meet you, ${this.name}`);
    }
}

let me =  new Person('callat', 4);
me.greet('herro');
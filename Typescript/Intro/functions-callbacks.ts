function add (n1: number, n2: number){
    return n1+ n2;
}

function printRes(res: number){
    console.log('Result: ' + res);
}

function addAndManip(num1: number, num2: number, cb: (num: number) => void){
    let rez = num1 + num2;
    cb(rez);
}

printRes(add(1,1));

let combineVals: (a: number, b:number) => number;
combineVals = add;
printRes(combineVals(6,4))

addAndManip(20,30,printRes);
addAndManip(20,30,(r) => {
    console.log(r);
});
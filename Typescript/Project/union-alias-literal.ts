type combineTypes = number | string;
type resultType = 'isNum' | 'isWord';
function combine (first: combineTypes, second: combineTypes, resultType: resultType){
    if (typeof(first) === 'number' && typeof(second) === 'number' || resultType === 'isNum'){
        return +first + +second;
    }else{
        return first.toString() + second.toString();
    }
    
} 

console.log(combine(10,5,'isNum'));
console.log(combine('apple','pie','isWord'));

console.log(combine(10,5, 'isWord'));
console.log(combine('apple','pie', 'isNum'));


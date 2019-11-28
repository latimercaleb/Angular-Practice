let ui: unknown;
let ux: string;
ui = 5;
ui = true;
ui = 'phrase';
ux = <string>ui; // This isn't alllowed with unknown without being casted


// unknown works like any but it's not assignable to other values

function generateFlaw(message: string, code:number):never {
    throw{message:message, errorCode:code};
}

generateFlaw('an error!', 3349);
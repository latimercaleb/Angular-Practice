var ui;
var ux;
ui = 5;
ui = true;
ui = 'phrase';
ux = ui; // This isn't alllowed with unknown without being casted
// unknown works like any but it's not assignable to other values
function generateFlaw(message, code) {
    throw { message: message, errorCode: code };
}
generateFlaw('an error!', 3349);

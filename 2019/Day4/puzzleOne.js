const data = require('./data').split('-');

const passwordLength = 6;
const lowerLimit = data[0];
const upperLimit = data[1];

function findValidPasswordsInRange( low, high ) {
    let validPasswords = [];
    for ( let i = low; i <= high; i++ ) {
        if ( isValidPassword(i) ) { validPasswords.push(i) }
    }
    return validPasswords;
} 

// A valid password as defined by this challenge has the following
// 6 digits long
// Contains 2 consecutive digits
// Cannot contain any decreases in digits
// Is within the limit specified
function isValidPassword(password){

    password = password.toString();

    return password.length === passwordLength && hasDouble(password) && 
           noDecrease(password) && withinLimit(password, lowerLimit, upperLimit);
}

function hasDouble(password) {
    let prevChar = password[0];

    for ( let i = 1; i < password.length; i++ ) {
        if ( password[i] === prevChar ) { return true; }
        prevChar = password[i];
    }
    return false;
}

function noDecrease(password) {
    let prevNumber = parseInt(password[0]);

    for ( let i = 1; i < password.length; i++ ) {
        if ( parseInt(password[i]) < prevNumber ) { return false; }
        prevNumber = parseInt(password[i]);
    }
    return true;
}

function withinLimit(password, low, high) {
    return parseInt(password) <= parseInt(high) && parseInt(password) >= parseInt(low);
}

console.log(findValidPasswordsInRange(lowerLimit, upperLimit).length);
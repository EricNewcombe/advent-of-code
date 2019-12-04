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


// The change in part 2 is that the string can only contain a max of 2 consecutive numbers 
// but also must contain at least one pair of numbers
function hasDouble(password) {

    let prevChar = password[0];
    let consecutiveCharacterArray = [];
    let consecutiveCharacterCount = 1;

    for ( let i = 1; i < password.length; i++ ) {
        if ( password[i] === prevChar ) { 
            consecutiveCharacterCount++;
        } else {
            consecutiveCharacterArray.push(consecutiveCharacterCount);
            consecutiveCharacterCount = 1;
        }
        prevChar = password[i];
    }

    consecutiveCharacterArray.push(consecutiveCharacterCount);
    return consecutiveCharacterArray.includes(2);

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
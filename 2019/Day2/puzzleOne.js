let data = require('./data');

function intCodeProgram ( intCodes, noun, verb ) {
    // Ensure we are working with a local copy of stuff instead of the shallow copy provided by the function
    intCodes = [...intCodes];

    // Set the noun and the verb
    intCodes[1] = noun;
    intCodes[2] = verb;

    // Loop through instructions
    for ( let i = 0; i < intCodes.length; i++ ) {
        let currentCode = intCodes[i];
        // End of program
        if ( currentCode === 99 ) {
            break; 
        }
        // If the current code is 1 add, if it is 2 multiply
        // The integers stored 1 and 2 indexes after the instruction code represent the indexes of where the
        // data will be used in the equation come from. The integer stored in 3 indexes after the instruction code
        // represents the index in which the result should be stored
        if ( currentCode === 1 || currentCode === 2 ){
            let first = intCodes[i + 1];
            let second = intCodes[i + 2];
            let position = intCodes[i + 3];
            intCodes[position] = currentCode === 1 ? intCodes[first] + intCodes[second] : intCodes[first] * intCodes[second];
            i += 3;
        }
    }

    return intCodes;
}

console.log(intCodeProgram(data, 12, 2)[0]);
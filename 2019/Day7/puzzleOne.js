let data = require('./data');

function intCodeProgram ( intCodes, phaseSetting, input ) {
    intCodes = [...intCodes];

    inputs = [phaseSetting, input];
    inputIndex = 0;

    // Loop through instructions
    for ( let pointer = 0; pointer < intCodes.length; pointer++ ) {
        let currentInstruction = decodeInstruction(intCodes[pointer]);
        let paramOne = currentInstruction.modes[2] === 0 ? intCodes[ intCodes[pointer + 1] ] : intCodes[pointer + 1];
        let paramTwo = currentInstruction.modes[1] === 0 ? intCodes[ intCodes[pointer + 2] ] : intCodes[pointer + 2];

        switch ( currentInstruction.opCode ) {
            case 1:
                storagePosition = intCodes[pointer + 3];
                intCodes[storagePosition] = paramOne + paramTwo;
                pointer += 3;
                break;
            case 2:
                storagePosition = intCodes[pointer + 3];
                intCodes[storagePosition] = paramOne * paramTwo;
                pointer += 3;
                break;
            case 3:
                storagePosition = intCodes[pointer + 1];
                if ( inputIndex >= inputs.length ) { return new Error("Index out of range"); }
                intCodes[storagePosition] = inputs[inputIndex++];
                pointer++;
                break;
            case 4:
                return paramOne;
                pointer++;
                break;
            case 5:
                if ( paramOne !== 0 ) { pointer = paramTwo - 1; }
                else { pointer += 2; }
                break;
            case 6:
                if ( paramOne === 0 ) { pointer = paramTwo - 1; }
                else { pointer += 2; }
                break;
            case 7:
                storagePosition = intCodes[pointer + 3];
                intCodes[storagePosition] = paramOne < paramTwo ? 1 : 0;
                pointer += 3;
                break;
            case 8:
                storagePosition = intCodes[pointer + 3];
                intCodes[storagePosition] = paramOne === paramTwo ? 1 : 0;
                pointer += 3;
                break;
            case 99: return;
        }
        
    }

    return false;
}

function decodeInstruction(code) {
    code = code.toString()
    let opCode = parseInt(code.substring(code.length - 2, code.length));
    let modes = code.substring(0,code.length - 2);

    for ( let i = 0, length = modes.length; i < 3 - length; i++ ) {
        modes = '0' + modes;
    }

    return {opCode, modes: modes.split('').map( x => parseInt(x))}
}

function getAllArrayPermutations(arr) {
    let results = [];

    if ( arr.length === 1 ) { 
        results.push([arr[0]]); 
        return results; 
    }
    
    for ( let i = 0; i < arr.length; i++ ) {
        let firstElement = arr[i];
        let elementsLeft = [ ...arr.slice(0, i), ...arr.slice(i+1) ];
        let innerPermutations = getAllArrayPermutations(elementsLeft);
        for ( let j = 0; j < innerPermutations.length; j++ ) {
            results.push( [firstElement, ...innerPermutations[j]] );
        }
    }

    return results;
}

let amps = [0,1,2,3,4]
let settingsPermutations = getAllArrayPermutations(amps).map(x => { if ( x.length === amps.length ) { return x } });

let highestScore = 0;
let highestSetting = null;
settingsPermutations.forEach( permutation => {
    let result = 0;

    for( let i = 0; i < permutation.length; i++ ) {
        result = intCodeProgram(data, permutation[i], result)
    }

    if ( result > highestScore ) {
        highestSetting = permutation;
        highestScore = result;
    }
})

console.log(highestScore, highestSetting);
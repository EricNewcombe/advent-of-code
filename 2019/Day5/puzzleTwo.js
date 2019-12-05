let data = require('./data');

function intCodeProgram ( intCodes, input ) {
    intCodes = [...intCodes];

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
                intCodes[storagePosition] = input;
                pointer++;
                break;
            case 4:
                console.log(paramOne);
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
intCodeProgram(data, 5);
// console.log(decodeInstruction(11102));
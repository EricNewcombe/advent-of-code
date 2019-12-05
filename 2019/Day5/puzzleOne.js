let data = require('./data');

function intCodeProgram ( intCodes ) {
    intCodes = [...intCodes];

    let input = 1;

    // Loop through instructions
    for ( let pointer = 0; pointer < intCodes.length; pointer++ ) {
        let currentInstruction = decodeInstruction(intCodes[pointer]);
        let paramOne = currentInstruction.modes[2] === 0 ? intCodes[ intCodes[pointer + 1] ] : intCodes[pointer + 1];
        let paramTwo = currentInstruction.modes[1] === 0 ? intCodes[ intCodes[pointer + 2] ] : intCodes[pointer + 2];

        switch ( currentInstruction.opCode ) {
            case 1:
                position = intCodes[pointer + 3];
                intCodes[position] = paramOne + paramTwo;
                pointer += 3;
                break;
            case 2:
                position = intCodes[pointer + 3];
                intCodes[position] = paramOne * paramTwo;
                pointer += 3;
                break;
            case 3:
                position = intCodes[pointer + 1];
                intCodes[position] = input;
                pointer++;
                break;
            case 4:
                console.log(paramOne);
                pointer++;
                break;
            case 99:
                return;
            default:
                break;
        }
        
    }

    return intCodes;
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
intCodeProgram(data);
// console.log(decodeInstruction(11102));
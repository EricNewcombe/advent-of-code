let moduleMasses = require('./moduleMasses');

function calculateFuel(moduleMasses) {
    let fuelNeeded = 0;
    
    moduleMasses.forEach( moduleMass => {
        fuelNeeded += Math.floor( moduleMass / 3 ) - 2;
    });

    return fuelNeeded;
}

console.log(calculateFuel(moduleMasses));
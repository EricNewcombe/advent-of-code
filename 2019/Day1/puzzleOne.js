let moduleMasses = require('./moduleMasses');

// Here we have to calculate the fuel needed for each module following the formula
// divide the mass by three, round down and then subtract two
function calculateFuel(moduleMasses) {
    let fuelNeeded = 0;
    
    moduleMasses.forEach( moduleMass => {
        fuelNeeded += Math.floor( moduleMass / 3 ) - 2;
    });

    return fuelNeeded;
}

console.log(calculateFuel(moduleMasses));
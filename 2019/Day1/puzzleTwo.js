let moduleMasses = require('./moduleMasses');

function calculateFuelForModules(moduleMasses) {
    let fuelNeeded = 0;
    
    moduleMasses.forEach( moduleMass => {
        let moduleFuelMass = calculateFuelForMass(moduleMass);
        let fuelNeededForFuel = calculateAdditionalFuelForFuel(moduleFuelMass);
        fuelNeeded += moduleFuelMass + fuelNeededForFuel
    });

    return fuelNeeded;
}

function calculateFuelForMass( mass ) {
    return Math.floor( mass / 3 ) - 2;
}

function calculateAdditionalFuelForFuel( fuelMass ) {
    let totalFuel = 0;
    let fuelMassRemaining = fuelMass;

    while ( calculateFuelForMass( fuelMassRemaining ) > 0 ) {
        let additionalFuel = calculateFuelForMass( fuelMassRemaining );
        totalFuel += additionalFuel;
        fuelMassRemaining = additionalFuel;
    }

    return totalFuel;
}


console.log(calculateFuelForModules(moduleMasses));
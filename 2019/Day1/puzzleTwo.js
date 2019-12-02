let moduleMasses = require('./moduleMasses');

// Function to encompass calculating the total fuel needed for the rocket including the
// additional fuel required for the fuel mass.
function calculateTotalFuelForModules(moduleMasses) {
    let fuelNeeded = 0;
    
    moduleMasses.forEach( moduleMass => {
        let moduleFuelMass = calculateFuelForMass(moduleMass);
        let fuelNeededForFuel = calculateAdditionalFuelForFuel(moduleFuelMass);
        fuelNeeded += moduleFuelMass + fuelNeededForFuel
    });

    return fuelNeeded;
}

// Function to calculate the fuel needed for a given mass using the formula
// divide the mass by 3, round down and then subtract two
function calculateFuelForMass( mass ) {
    return Math.floor( mass / 3 ) - 2;
}

// Function to calculate the additional fuel needed to account for the fuel.
// The funciton will loop calculating the fuel needed for each additional fuel
// added until the result of calculating how much fuel is needed for the mass is
// below or equal to 0.
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


console.log(calculateTotalFuelForModules(moduleMasses));
let fs = require('fs');
let data = fs.readFileSync("./data.txt").toString().split('\n');

let wireOne = data[6].split(',');
let wireTwo = data[7].split(',');


function getWirePoints(wireMovements) {
    let wirePoints = new Map();
    let x = 0,
        y = 0,
        distance = 0;

    wireMovements.forEach(movement => {
        let direction = movement.substring(0,1);
        let spaces = parseInt(movement.substring(1, movement.length));

        for ( let i = 0; i < spaces; i++ ) {
            switch (direction) {
                case 'U': y--; break;
                case 'D': y++; break;
                case 'L': x--; break;
                case 'R': x++; break;
            }
            if ( !wirePoints.has(`${x},${y}`) ) {
                wirePoints.set(`${x},${y}`, ++distance);
            }
        }
    });
    
    return wirePoints;
}

function getCrossOverPoints(wireAPoints, wireBPoints) {

    let crossOverPoints = [];

    wireAPoints.forEach( (value, key) => {
        if ( wireBPoints.has(key) ) { crossOverPoints.push(key) }
    })
    
    return crossOverPoints;

}

function findMinimumTotalDistanceTravelled( crossOverLocations, wireOne, wireTwo ) {
    
    let minKey = crossOverLocations[0]
    let minimumTravelDistance = wireOne.get(minKey) + wireTwo.get(minKey);

    crossOverLocations.forEach( key => {
        console.log(key, wireOne.get(key), wireTwo.get(key))
        let totalDistance = wireOne.get(key) + wireTwo.get(key);

        if ( totalDistance < minimumTravelDistance ) {
            minimumTravelDistance = totalDistance;
            minKey = key;
        }

    });

    return {minimumTravelDistance, minKey};
}

function findManhattanDistanceToStart(location) {
    // parse the location string to numbers
    let x = parseInt(location.split(',')[0])
    let y = parseInt(location.split(',')[1])
    return Math.abs(x) + Math.abs(y);
}

let w1 = getWirePoints(wireOne);
let w2 = getWirePoints(wireTwo);


console.log(findMinimumTotalDistanceTravelled(getCrossOverPoints(w1,w2), w1, w2));
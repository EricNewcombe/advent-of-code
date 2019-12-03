let fs = require('fs');
let data = fs.readFileSync("./data.txt").toString().split('\n');

let wireOne = data[9].split(',');
let wireTwo = data[10].split(',');


function getWirePoints(wireMovements) {
    let wirePoints = {};
    let x = 0,
        y = 0,
        steps = 0;
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
            steps++;
            // Due to how objects work in JS, objects in sets are compared based off their pointers, not
            // the values they contain. In this case you would not be able to store an object {x,y}
            // in the set due to this reason. Storing strings does work though and can be parsed after
            if ( wirePoints[`${x},${y}`] === undefined ) {
                wirePoints[`${x},${y}`] = steps;
            }
        }
    });
    
    return wirePoints;
}

function getCrossOverPoints(wireAPoints, wireBPoints) {
    let crossOverLocations = [];

    console.log("asdf")

    Object.keys(wireAPoints).forEach( key => {
        if ( Object.keys(wireBPoints).indexOf(key) !== -1 ) { crossOverLocations.push(key) }
    })
    console.log("fsda")
    
    return crossOverLocations;
}

function findMinimumDistance( crossOverLocations ) {
    let minimumDistance = findManhattanDistanceToStart(crossOverLocations.keys[0]);

    Object.keys(crossOverLocations).forEach( location => {
        let curDistance = findManhattanDistanceToStart(location);
        if ( curDistance < minimumDistance ) {
            minimumDistance = curDistance;
        }
    });

    return minimumDistance;
}

function findManhattanDistanceToStart(location) {
    // parse the location string to numbers
    let x = parseInt(location.split(',')[0])
    let y = parseInt(location.split(',')[1])
    return Math.abs(x) + Math.abs(y);
}

let w1 = getWirePoints(wireOne);
let w2 = getWirePoints(wireTwo);


console.log(findMinimumDistance(getCrossOverPoints(w1,w2)));
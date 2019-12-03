let fs = require('fs');
let data = fs.readFileSync("./data.txt").toString().split('\n');

let wireOne = data[9].split(',');
let wireTwo = data[10].split(',');

class Point{

    constructor(x, y, distance) {
        this.x = x;
        this.y = y;
        this.distance = distance;
    }

    equals(p) {
        return this.x === p.x && this.y === p.y;
    }

}


function getWirePoints(wireMovements) {
    let wirePoints = [];
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
            wirePoints.push(new Point(x, y, ++distance));
        }
    });
    
    return wirePoints;
}

function getCrossOverPoints(wireAPoints, wireBPoints) {

    list1.filter(
        (set => a => isUnion === set.has(a.userId)) (new Set(list2.map(b => b.userId)))
    );
    wireAPoints.filter( pointA => {
        wireBPoints.some( pointB => pointA.equals(pointB) );
    })
    
    return wireAPoints;

}

function findMinimumDistance( crossOverLocations ) {
    let minimumDistance = findManhattanDistanceToStart(crossOverLocations[0]);

    crossOverLocations.forEach( location => {
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
let fs = require('fs');

let data = fs.readFileSync('./data.txt').toString().split('\n').map( x => { 
    let parts = x.split(')');
    return {orbitted: parts[0], orbitor: parts[1]}
})

let orbits = new Map();

data.forEach(orbitInfo => {
    if ( !orbits.has(orbitInfo.orbitor) ) { orbits.set(orbitInfo.orbitor, [orbitInfo.orbitted]) }
    else { orbits.get(orbitInfo.orbitor).push(orbitInfo.orbitted); }
})

function findOrbitChain(orbitKey) {
    let keys = [orbitKey];

    if ( orbits.has(orbitKey) ) {
        orbits.get(orbitKey).forEach( key => {
            keys = [...keys, ...findOrbitChain(key)];
        })
    }

    return keys;
}

// Function to find the first intersecting orbit key going from left to right
function findFirstIntersectingOrbit(arr1, arr2) {
    let intersectingKey = '';
    
    for ( let i = 0; i < arr1.length; i++ ) {
        if ( arr2.indexOf(arr1[i]) !== -1 ) { return arr1[i]; }
    }

    return null;
}

let myOrbitPath = findOrbitChain('YOU');
let santaOrbitPath = findOrbitChain('SAN')
let intersectingKey = findFirstIntersectingOrbit( myOrbitPath, santaOrbitPath );



console.log(myOrbitPath.indexOf(intersectingKey) - 1 + santaOrbitPath.indexOf(intersectingKey) - 1)
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

let totalOrbits = 0;
orbits.forEach( (value, key) =>  {
    value.forEach( orbittingKey => {
        totalOrbits += findOrbitChain(orbittingKey).length;
    })
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

console.log(totalOrbits);
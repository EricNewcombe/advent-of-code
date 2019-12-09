const fs = require('fs');
let data = fs.readFileSync('./data.txt').toString().split('');

const pictureHeight = 6;
const pictureWidth = 25;

function convertImageDataToArray(data) {
    let dataCopy = [...data];
    let layers = [];

    while (dataCopy.length > 0) {
        let layerData = [];
        for ( let i = 0; i < pictureHeight; i++ ) {
            let line = [];
            for ( let j = 0; j < pictureWidth; j++ ) {
                line.push(dataCopy.shift());
            }
            layerData.push(line);
        }
        layers.push(layerData);
    }

    return layers;
}

function findVisiblePixels(layers){
    let visiblePixels = [];
    for ( let i = 0; i < pictureHeight; i++ ) {
        visiblePixels.push([]);
        for ( let j = 0; j < pictureWidth; j++ ) {
            visiblePixels[i].push(-1);
        }
    }

    layers.forEach( layer => {
        for ( let i = 0; i < layer.length; i++ ) {
            for ( let j = 0; j < layer[i].length; j++ ) {
                if ( visiblePixels[i][j] === -1 || visiblePixels[i][j] === '2' ) {
                    visiblePixels[i][j] = layer[i][j];
                }
            }
        }
    })

    return visiblePixels;

}


function printLine(line) {
    line.forEach(colour => {
        if (colour === '0') process.stdout.write('-');
        else if (colour === '1') process.stdout.write('8');
        else if (colour === '2') process.stdout.write(' ');
    });
    console.log();     
};

let imageLayers = convertImageDataToArray(data);
findVisiblePixels(imageLayers).forEach( line => { printLine(line) });


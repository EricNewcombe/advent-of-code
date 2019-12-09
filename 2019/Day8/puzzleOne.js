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
                line.push(dataCopy.pop());
            }
            layerData.push(line);
        }
        layers.push(layerData);
    }

    return layers;
}

function analyzeLayer(layer) {
    counts = {};

    layer.forEach(line => {
        line.forEach(c => {
            if ( counts[c] !== undefined ) { counts[c]++; }
            else { counts[c] = 1; }
        });
    })

    return counts;
}

function findLowestZeroLayer(layers) {
    let lowestZeroCount = analyzeLayer(imageLayers[0])[0]
    let lowestZeroLayer = imageLayers[0]
    for ( let i = 0; i < imageLayers.length; i++ ) {

        let layerData = analyzeLayer(imageLayers[i])
        if ( layerData[0] < lowestZeroCount ) {
            lowestZeroCount = layerData[0];
            lowestZeroLayer = layerData;
        }

    }

    return { lowestZeroLayer, result: lowestZeroLayer[1] * lowestZeroLayer[2] }
}


let imageLayers = convertImageDataToArray(data);
console.log(findLowestZeroLayer(imageLayers));


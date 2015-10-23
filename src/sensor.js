'use strict'

const weighted = require('weighted');

function choose(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}

function galaxyGenerator() {
    const galaxyName = () => {
        const classificationName = () => {
            let name = '';
            do {
                name += Math.random().toString(36).substr(0,1);
            } while (Math.random() < 0.25);

            return name;
        };
        const standardName = () => {
            return choose(['Andromeda', 'Big Daddy', 'Tencent', 'Fubar', 'Johnny', 'Sixty-O', 'Dfjsktisd', 'Lemonade']);
        }
        
        return choose([classificationName, standardName])()
    };

    const galaxyId = () => {
        var name = galaxyName();
        var type = choose(['huge', 'giant', 'colossal', 'average', 'medium', 'small', 'tiny', 'miniscule']) + ' ' + 
            choose(['grey', 'blue', 'green', 'rainbow', 'puke-colored', 'magenta', 'black as night']) + ' ' +
            choose(['elliptical', 'spherical', 'spiral', 'S0', 'irregular']);
        return `The ${name} galaxy is a ${type} galaxy.`;
    }

    const galaxyCharacteristic = () => {
        return choose(
            ['Its nearest neighbor is ' + choose([galaxyName() + ' galaxy', 'a black hole', 'a dark matter reactor', 'the pocket universe ' + galaxyName()]),
            'Its prominent feature is ' + choose(['a black hole', 'a dyson sphere', 'intelligent life', 'a historic event']),
            'It has ' + Math.random() + choose([' stars', ' planets', ' fast food joints'])
            ]);
    }
    return choose(
        [
            galaxyId,
            galaxyCharacteristic
        ]
    )();
}

export class RandomSensor {
    retrieveData() {
        return galaxyGenerator();
    }
}

export class StaticSensor {
    retrieveData() {
        return 'Earth is roughly a sphere.'
    }
};

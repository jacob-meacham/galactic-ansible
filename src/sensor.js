'use strict'

const weighted = require('weighted');

// TODO: Make a class, move
/* node = {
    characteristics: [],
    type: string,
    parent: node
    children: []
    max-children: Number,
    description: string
 }*/

function choose(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}

function generateGalaxyDescription() {
    const galaxyName = () => {
        const classificationName = () => {
            let name = '';
            do {
                name += Math.random().toString(36).substr(0,5);
            } while (Math.random() > 0.25);

            return name;
        };
        const standardName = () => {
            return choose(['Andromeda', 'Big Daddy', 'Tencent', 'Fubar', 'Johnny', 'Sixty-O', 'Dfjsktisd', 'Lemonade']);
        }
        
        return choose([classificationName, standardName])()
    };

    return galaxyName();
}

function generateBlackHoleDescription() {
    return 'Black Hole ' + Math.floor(Math.random() * 1000);
}

function generateSolarSystemDescription() {
    return 'Solar System ' + Math.floor(Math.random() * 1000);
}

function galaxyCharacteristicGenerator() {
    const galaxyId = () => {
        var type = choose(['huge', 'giant', 'colossal', 'average', 'medium', 'small', 'tiny', 'miniscule']) + ' ' + 
            choose(['grey', 'blue', 'green', 'rainbow', 'puke-colored', 'magenta', 'black as night']) + ' ' +
            choose(['elliptical', 'spherical', 'spiral', 'S0', 'irregular']);
        return `It is a ${type} galaxy.`;
    }

    const galaxyCharacteristic = () => {
        return choose(
            ['Its nearest neighbor is ' + choose([generateGalaxyDescription() + ' galaxy', 'a black hole', 'a dark matter reactor', 'the pocket universe ' + generateGalaxyDescription()]),
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

function blackHoleCharacteristicGenerator() {
    return 'Black holes are really something, huh?';
}

function solarSystemCharacteristicGenerator() {
    return 'Solar systems are really something, huh?';
}

export class RandomSensor {
    constructor() {
        this.currentNode = null;
    }
    
    retrieveData() {
        if (!this.currentNode) {
            // Let's start a node!
            this.currentNode = this.generateGalaxy();
            return 'Let\'s talk about ' + this.currentNode.description;
        }

        const newNode = this.walk();
        if (this.currentNode != newNode) {
            this.currentNode = newNode;
            return 'Let\'s talk about ' + newNode.description;
        }

        // We now have a current node. Decide if we want to print a characteristic about this node, or make a new child.
        if (Math.random() < 0.25 && this.currentNode.children < this.currentNode.maxChildren) {
            // Make a new child:
            const childNode = this.generateNode(this.currentNode.type);
            childNode.parent = this.currentNode;
            this.currentNode.children.push(childNode);
            this.currentNode = childNode;
            return 'It has a child ' + childNode.description;
        } else if (Math.random() < 0.2) {
            return 'We\'re talking about ' + newNode.description;
        } else {
            const characteristic = this.generateCharacteristic(this.currentNode.type);
            this.currentNode.characteristics.push(characteristic);
            return characteristic;
        }
    }

    walk() {
        let newNode = this.currentNode;
        const numSteps = Math.floor(Math.random()*5) + 1;
        let i = 0;
        for (i = 0; i < numSteps; i++) {
            if (this.currentNode.parent && Math.random() < 0.25) {
                newNode = this.currentNode.parent;
            } else if (this.currentNode.children.length > 0 && Math.random() < 0.25) {
                newNode = choose(this.currentNode.children);
            }
        }

        return newNode;
    }

    generateCharacteristic(nodeType) {
        if (nodeType === 'galaxy') {
            return galaxyCharacteristicGenerator();
        } else if (nodeType === 'black-hole') {
            return blackHoleCharacteristicGenerator();
        } else if (nodeType == 'solar-system') {
            return solarSystemCharacteristicGenerator();
        }
    }

    generateGalaxy() {
        return {
            parent: null,
            children: [],
            characteristics: [],
            description: generateGalaxyDescription(),
            maxChildren: 100,
            type: 'galaxy'
        };
    }

    generateBlackHole() {
        return {
            parent: null,
            children: [],
            characteristics: [],
            description: generateBlackHoleDescription(),
            maxChildren: 0,
            type: 'black-hole'
        }
    }

    generateSolarSystem() {
        return {
            parent: null,
            children: [],
            characteristics: [],
            description: generateSolarSystemDescription(),
            maxChildren: 0,
            type: 'solar-system'
        }
    }

    generateNode(nodeType) {
        let types = null;
        if (nodeType === 'galaxy') {
            types = [this.generateSolarSystem, this.generateBlackHole];
        } else {
            types = [this.generateGalaxy, this.generateBlackHole, this.generateSolarSystem];
        }
        return choose(types)();
    }
}

export class StaticSensor {
    retrieveData() {
        return 'Earth is roughly a sphere.'
    }
};

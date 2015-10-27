'use strict'
// TODO: Make a class, move
/* node = {
    characteristics: [],
    type: string,
    parent: node
    children: []
    max-children: Number,
    description: string
 }*/

 // TODO: Description and allowed under-type generators should be saved in the object itself
 // TODO: Characteristics also need a type, so that we don't end up redefining it.

// TODO: Characteristic types:
// Neighbor
// thing (number of)
// Most prominent feature (link to a child?)

function choose(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}

function generateClassificationName() {
  let name = '';
  do {
    name += Math.random().toString(36).substr(0, 5);
  } while (Math.random() > 0.25);
  
  return name;
}

class AnsibleAtom {
  constructor() {
    this.parent = null;
    this.children = [];
    this.maxChildren = 0;
    this.name = '';
    this.description = '';
    this.characteristics = [];
  }

  _generateCharacteristic() {
    return '';
  }

  _generateNewChild() {
    return null;
  }

  discoverNewChild() {
    const child = this._generateNewChild();
    if (!child) {
        return null;
    }

    child.parent = this;
    this.children.push(child);
    return child;
  }

  discoverNewCharacteristic() {
    const characteristic = this._generateCharacteristic();
    this.characteristics.push(characteristic);
    return characteristic;
  }
}

class BlackHole extends AnsibleAtom {
  constructor() {
    super();
    this.maxChildren = 10000;
    this.name = generateClassificationName();
    const years = Math.random() * 1000;
    const size = Math.random() * 1000;
    this.description = `This black hole will last for ${years} years, and is ${size} km large.`;
  }

  _generateCharacteristic() {
    return choose(['A', 'B', 'C', 'D']) + ' ' + choose(['1', '2', '3', '4']);
  }
}

class SolarSystem extends AnsibleAtom {
  constructor() {
    super();
    this.maxChildren = 10000;
    this.name = generateClassificationName();
    const years = Math.random() * 1000;
    const size = Math.random() * 1000;
    this.description = 'This solar system is \'uge!';
  }

  _generateCharacteristic() {
    return choose(['A', 'B', 'C', 'D']) + ' ' + choose(['1', '2', '3', '4']);
  }
}

class Galaxy extends AnsibleAtom {
  constructor() {
    super();
    this.maxChildren = 10000;
    this.name = Galaxy._generateName();
    this.description = Galaxy._generateDescription();
  }

  _generateCharacteristic() {
    return choose(['Its nearest neighbor is ' + choose([Galaxy._generateName() + ' galaxy', 'a black hole', 'a dark matter reactor', 'the pocket universe ' + Galaxy._generateName()]), 'Its prominent feature is ' + choose(['a black hole', 'a dyson sphere', 'intelligent life', 'a historic event']), 'It has ' + Math.random() + choose([' stars', ' planets', ' fast food joints'])]);
  }

  _generateNewChild() {
    const childType = choose([BlackHole, SolarSystem]);
    return new childType();
  }

  static _generateName() {
    const standardName = function() {
      return choose(['Andromeda', 'Big Daddy', 'Tencent', 'Fubar', 'Johnny', 'Sixty-O', 'Dfjsktisd', 'Lemonade']);
    };

    return choose([generateClassificationName, standardName])();
  }

  static _generateDescription() {
    const type = choose(['huge', 'giant', 'colossal', 'average', 'medium', 'small', 'tiny', 'miniscule']) + ' ' + choose(['grey', 'blue', 'green', 'rainbow', 'puke-colored', 'magenta', 'black as night']) + ' ' + choose(['elliptical', 'spherical', 'spiral', 'S0', 'irregular']);
    return (`It is a ${type} galaxy.`);
  }
}

export class RandomSensor {
    constructor() {
        this.currentNode = null;
    }
    
    retrieveData() {
        if (!this.currentNode) {
            // Let's start a node!
            this.currentNode = new Galaxy();
            return `Lets talk about ${this.currentNode.name}. ${this.currentNode.description}`;
        }

        const newNode = this.walk();
        if (this.currentNode != newNode) {
            this.currentNode = newNode;
            return `Lets talk about ${newNode.name}. ${newNode.description}`;
        }

        // We now have a current node. Decide if we want to print a characteristic about this node, or make a new child.
        if (Math.random() < 0.25 && this.currentNode.children < this.currentNode.maxChildren) {
            // Make a new child:
            const childNode = this.currentNode.discoverNewChild();
            this.currentNode = childNode;
            return `It has a child ${childNode.name}. ${childNode.description}`;
        } else if (Math.random() < 0.2) {
            return `We are talking about ${newNode.name}`;
        } else {
            return this.currentNode.discoverNewCharacteristic();
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
}

export class StaticSensor {
    retrieveData() {
        return 'Earth is roughly a sphere.'
    }
};

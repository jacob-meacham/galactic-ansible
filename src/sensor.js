'use strict'
/* node = {
    characteristics: [],
    type: string,
    parent: node
    children: []
    max-children: Number,
    description: string
 }*/

 // TODO: Characteristics also need a type, so that we don't end up redefining it.

// TODO: Characteristic types:
// Neighbor
// thing (number of)
// Most prominent feature (link to a child?)

// TODO: Make walk more sticky, or make it go down more often.
// TODO: Can specify what type and how many of each child you have.
// TODO: Similarly, can specify what type and how many of each characteristic you have
// TODO: Specify siblings?

function randomLetter() {
  return choose(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']);
}

function dateGenerator() {
  let newDate = randRange(1, 30000) + ' ' + randomLetter().toUpperCase() + randomLetter().toUpperCase();

  if (Math.random() < 0.25) {
    newDate += randomLetter().toUpperCase();
  }

  return newDate;
}

function choose(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}

function randRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateClassificationName(len) {
  len = len || randRange(2, 8);
  let name = '';
  while (name.length < len)
  {
    const add = Math.random().toString(36).slice(2);
    name += add.slice(0, Math.min(add.length, (len - name.length)));
  }
  return name.toUpperCase();
}

class AnsibleAtom {
  constructor() {
    this.parent = null;
    this.children = [];
    this.maxChildren = 0;
    this.maxCharacteristics = 0;
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

  isTerminal() {
    return this.maxChildren === 0 && this.maxCharacteristics === 0;
  }
}

class BlackHole extends AnsibleAtom {
  constructor() {
    super();
    this.maxChildren = 0;
    this.maxCharacteristics = 10000;
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
    this.maxChildren = 0;
    this.maxCharacteristics = 10000;
    this.name = generateClassificationName();
    const years = Math.random() * 1000;
    const size = Math.random() * 1000;
    this.description = 'This solar system is \'uge!';
  }

  _generateCharacteristic() {
    return choose(['A', 'B', 'C', 'D']) + ' ' + choose(['1', '2', '3', '4']);
  }
}

// TODO: How should this relate to, eg creators of the monument? Should it be done this way
// or should it be done differently? How do characteristics work?
class Monument extends AnsibleAtom {
  constructor() {
    super();
    this.name = Monument._generateName();
    this.maxCharacteristics = 0;
    this.maxChildren = 0;
    this.description = Monument._generateDescription();
  }

  static _generateName() {
    return choose(['Grafla', 'Dkejifs', 'dsafje', 'Gef a ', 'The Space Needle', 'SDjkle', 'SDFe']);
  }

  static _generateDescription() {
    // TODO: don't do a choose, need to pick 2 from the range.
    var physical = () => {
      return choose(['ancient', 'old', 'crumbling', 'historic', 'royal', 'imperial', 'sunken', 'twisted', 'lucky', 'magnificient', 'glorious', 'shining', 'tall', 'cracked', 'great', 'big', 'huge', 'giant', 'grand', 'gigantic', 'colossal', 'tremendous', 'gargantuan', 'moss-covered', 'haloed', 'gleaming']);
    }

    let description = 'This monument is a ';
    const numPhysical = randRange(1, 2);
    for (var i = 0; i < numPhysical; i++) {
      description += physical();
      if (i < numPhysical-1) {
        description += ', ';
      }
    }

    description += ' ';
    if (Math.random() < 0.9) {
      description += choose(['stone', 'gold', 'copper', 'bronze', 'silver', 'white', 'black', 'green', 'gray', 'obsidian', 'wooden']);
      description += ' ';
    }

    // TODO: Fix, as these are not unique.
    description += choose(['tower', choose('', 'smiling', 'proud', 'wise', 'crying', 'singing', 'laughing') + choose('statue', 'statues', 'colossus'), 'bridge', 'towers', 'spire', 'spires', 'cathedral', 'church', 'masoleum', 'maze', 'castle', 'fort', 'keep']);

    return description;
  }
}

class Galaxy extends AnsibleAtom {
  constructor() {
    super();
    this.maxChildren = 10000;
    this.maxCharacteristics = 10000;
    this.name = Galaxy._generateName();
    this.description = Galaxy._generateDescription();
  }

  _generateCharacteristic() {
    return choose(['Its nearest neighbor is ' + choose([Galaxy._generateName() + ' galaxy', 'a black hole', 'a dark matter reactor', 'the pocket universe ' + Galaxy._generateName()]), 'Its prominent feature is ' + choose(['a black hole', 'a dyson sphere', 'intelligent life', 'a historic event']), 'It has ' + Math.random() * 1000 + choose([' stars', ' planets', ' fast food joints'])]);
  }

  _generateNewChild() {
    const childType = choose([BlackHole, SolarSystem, Monument]);
    return childType();
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
            if (!childNode.isTerminal()) {
              this.currentNode = childNode;
            }
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

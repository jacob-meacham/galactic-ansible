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
// TODO: Specify the number and types of characteristics and number and types of children allowed.
//    - Neighbors can be siblings, so it needs to be possible to create siblings for yourself (if allowed). Maybe
//      neighbors aren't characteristics, but are part of the parent.

import * as rand from './random';
import {MarkovWordGenerator} from './markov';

// function dateGenerator() {
//   let newDate = randRange(1, 30000) + ' ' + randomLetter().toUpperCase() + randomLetter().toUpperCase();

//   if (Math.random() < 0.25) {
//     newDate += randomLetter().toUpperCase();
//   }

//   return newDate;
// }

function addIf(nodule, chance) {
  if (Math.random() <= chance) {
    return nodule;
  }

  return '';
}

function generateAtmosphere() {
  const atmosphereAdjective = () => {
    return rand.choose(['wispy', 'noxious', 'fumey', 'sparse', 'heavy', 'dense', 'light', 'overbearing']);
  };

  const atmopshereElement = () => {
    return rand.choose(['ammonia', 'oxygen', 'nitrogen', 'helium', 'hydrogen', 'dark matter']);
  };

  const description = addIf(rand.choose(['purple', 'grey', 'white', 'blue', 'yellow', 'orange', 'tan', 'pink']) + ', ', 0.5) + atmosphereAdjective() + addIf(', and ' + atmosphereAdjective(), 0.25);
  if (Math.random() < 0.25) {
    return 'There is no atmopshere to speak of';
  }

  return rand.choose(['The atmopshere is one of ' + atmopshereElement() + ' and is ' + description, 'The atmoshpere is full of ' + description + ' clouds, made of ' + atmopshereElement()]);
}

// TODO: Short name, with something like
// "X is a galaxy, known only as The Yll"
const nameGenerator = new MarkovWordGenerator('Sun Mercury Venus Earth Mars Jupiter Saturn Uranus Neptune Pluto Ceres Pallas Vesta Hygiea Interamnia Europa Davida Sylvia Cybele Eunomia Juno Euphrosyne Hektor Thisbe Bamberga Patientia Herculina Doris Ursula Camilla Eugenia Iris Amphitrite Mercury Venus Earth Mars Asteroid Belt Jupiter Saturn Neptune Pluto Moon Terra Luna \
Adrastea Ganymede Callisto Europa Himalia Amalthea Thebe Elara Metis Pasiphae Carme \
Sinope Lysithea Ananke Leda Themisto Callirrhoe Praxidike Megaclite Locaste Taygete \
Kalyke Autonoe Harpalyke Titan Rhea Iapetus Dione Tethys Enceladus Mimas Hyperion \
Phoebe Janus Epimetheus Prometheus Pandora Titania Oberon Umbriel Ariel Miranda \
Sycorax Puck Portia Juliet Caliban Belinda Cressida Triton Proteus Nereid Larissa \
Galatea Despina Thalassa Charon', 2);

function generateName() {
  let name = '';
  while (name.length < 4) {
    name = nameGenerator.fill(rand.randRange(5, 10));
  }

  return name[0].toUpperCase() + name.slice(1);
}

function generateClassificationName() {
  return generateName();
  /*
  len = len || randRange(2, 8);
  let name = '';
  while (name.length < len)
  {
    const add = Math.random().toString(36).slice(2);
    name += add.slice(0, Math.min(add.length, (len - name.length)));
  }
  return name.toUpperCase();
  */
}

/*
  childrenDescription: [{
    "type": foo,
    range: { min: 0, max: 5 }
    chance: 1
  }

  // lazyChild - just need type?

  children: {
    "type": []
  }

  characteristics: []
  characteristic:

  constraint:
  {
    type: 'anything'
    number: 2000
    unfilled: 1000 // If necessary
    constraint: no, lt, gt, eq
    description: foo
  }

  example constraints:
  age,
  # of {fast food joints}|{alien species}|{monuments}|{solar systems}|{...}

  // When generating characteristics, children ask their parent if it is a constraint. If it is, then we'll know how big the constraint needs to be. The parent will need to query other children to determine if the constraint has been filled.
  // When creating children, the first step is to generate them, and the second step is to do constraint solving with the children. This means, for all characteristics that are constraints that need to be filled, ask every child if they can fill that constraint.
  // If they can, then the constraints are solved via the children. This means that all constraint characteristics have to flow down hierarchically (ie they can't skip, but they can defer those constraints lower).
  // Children should be lightweight until they're visited. Visiting them is what creates their children underneath.
  // We don't want to generate children when we go in, because there should be billions of them...instead, we'll need to use a descriptor to decide what types of children to generate, in what way. We'll still need constraints, for things like age or # of things,
  // but as long as it's in the correct direction, and we do a reasonable job of scaling it amongst possible children, we should be ok.

  characteristicStems = Map({stem: foo, frequency: 0.3})

  // TODO: How to put multiple characteristics together, to maximally fill up a tweet?
  // Sort by length of description, make sure that descriptions don't have initial stems - those should be separate

  characteristicDescription: {
    "type": number allowed, frequency
  }

  characteristics: {
    "type": []
  }
*/

// TODO: A lazy map instead, where we insert children and characteristics in at instantiation time, but only generate them when needed.
class AnsibleAtom {
  constructor(childrenDescriptor, characteristicsDescriptor) {
    this.parent = null;
    this.availableChildren = _generateChildren(childrenDescriptor);

    this.characteristicsDescriptor = characteristicsDescriptor;
    this.characteristics = {};
    this.name = '';
    this.description = '';
  }

  _generateChildren(childrenDescriptor) {
    for
  }

  _generateCharacteristic() {
    return '';
  }

  _generateNewChild() {
    return null;
  }

  discoverNewChild() {
    const [key, node] = rand.chooseByFrequency(this.childrenDescriptor);

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

  isExhausted() {

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
    return choose([generateName(), generateAtmosphere()]);
  }
}

class SolarSystem extends AnsibleAtom {
  constructor() {
    super();
    this.maxChildren = 0;
    this.maxCharacteristics = 10000;
    this.name = generateClassificationName();
    this.description = 'This solar system is \'uge!';
  }

  _generateCharacteristic() {
    return choose([generateName(), generateAtmosphere()]);
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
    return generateName();
  }

  static _generateDescription() {
    // TODO: don't do a choose, need to pick 2 from the range.
    const physical = () => {
      return choose(['ancient', 'old', 'crumbling', 'historic', 'royal', 'imperial', 'sunken', 'twisted', 'lucky', 'magnificient', 'glorious', 'shining', 'tall', 'cracked', 'great', 'big', 'huge', 'giant', 'grand', 'gigantic', 'colossal', 'tremendous', 'gargantuan', 'moss-covered', 'haloed', 'gleaming']);
    };

    let description = 'This monument is a ';
    const numPhysical = randRange(1, 2);
    for (let i = 0; i < numPhysical; i++) {
      description += physical();
      if (i < numPhysical - 1) {
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
    return choose(['Its nearest neighbor is ' + choose([Galaxy._generateName() + ' galaxy', 'a black hole', 'a dark matter reactor', 'the pocket universe ' + Galaxy._generateName()]), 'Its prominent feature is ' + choose(['a black hole', 'a dyson sphere', 'intelligent life', 'a historic event']), 'It has ' + randRange(1, 100) * 100000 + choose([' stars', ' planets', ' fast food joints'])]);
  }

  _generateNewChild() {
    const ChildType = choose([BlackHole, SolarSystem, Monument]);
    return new ChildType();
  }

  static _generateName() {
    const standardName = () => {
      return generateName();
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
    if (this.currentNode !== newNode) {
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
    }

    return this.currentNode.discoverNewCharacteristic();
  }

  walk() {
    let newNode = this.currentNode;
    const numSteps = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < numSteps; i++) {
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
    return 'Earth is roughly a sphere.';
  }
}

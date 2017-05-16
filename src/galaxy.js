import AnsibleAtom from './atom';
import BlackHole from './blackHole';
import Monument from './monument';
import SolarSystem from './solarSystem';
import * as rand from './random';
import { generateName, generateClassificationName } from './spaceNameGenerator';

export default class Galaxy extends AnsibleAtom {
  constructor() {
    super();
    this.maxChildren = 10000;
    this.maxCharacteristics = 10000;
    this.name = Galaxy._generateName();
    this.description = Galaxy._generateDescription();
  }

  _generateCharacteristic() {
    return rand.choose([`Its nearest neighbor is ${rand.choose([`${Galaxy._generateName()} galaxy`, 'a black hole', 'a dark matter reactor', `the pocket universe ${Galaxy._generateName()}`])}`, `Its prominent feature is ${rand.choose(['a black hole', 'a dyson sphere', 'intelligent life', 'a historic event'])}`, `It has ${rand.randRange(1, 100) * 100000}${rand.choose([' stars', ' planets', ' fast food joints'])}`]);
  }

  _generateNewChild() {
    const ChildType = rand.choose([BlackHole, SolarSystem, Monument]);
    return new ChildType();
  }

  static _generateName() {
    const standardName = () => generateName();

    return rand.choose([generateClassificationName, standardName])();
  }

  static _generateDescription() {
    const type = `${rand.choose(['huge', 'giant', 'colossal', 'average', 'medium', 'small', 'tiny', 'miniscule'])} ${rand.choose(['grey', 'blue', 'green', 'rainbow', 'puke-colored', 'magenta', 'black as night'])} ${rand.choose(['elliptical', 'spherical', 'spiral', 'S0', 'irregular'])}`;
    return (`It is a ${type} galaxy.`);
  }
}

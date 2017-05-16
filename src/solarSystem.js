import AnsibleAtom from './atom';
import BlackHole from './blackHole';
import Monument from './monument';
import * as rand from './random';
import { generateName, generateClassificationName } from './spaceNameGenerator';

function generateAtmosphere() {
  const atmosphereAdjective = () => rand.choose(['wispy', 'noxious', 'fumey', 'sparse', 'heavy', 'dense', 'light', 'overbearing']);

  const atmopshereElement = () => rand.choose(['ammonia', 'oxygen', 'nitrogen', 'helium', 'hydrogen', 'dark matter']);

  const description = rand.addIf(`${rand.choose(['purple', 'grey', 'white', 'blue', 'yellow', 'orange', 'tan', 'pink'])}, `, 0.5) + atmosphereAdjective() + rand.addIf(`, and ${atmosphereAdjective()}`, 0.25);
  if (Math.random() < 0.25) {
    return 'There is no atmopshere to speak of';
  }

  return rand.choose([`The atmopshere is one of ${atmopshereElement()} and is ${description}`,
    `The atmoshpere is full of ${description} clouds, made of ${atmopshereElement()}`]);
}

export default class SolarSystem extends AnsibleAtom {
  constructor() {
    super();
    this.maxChildren = 5;
    this.maxCharacteristics = 10;
    this.name = generateClassificationName();
    this.description = 'This solar system is \'uge!';
  }

  _generateCharacteristic() {
    return rand.choose([generateName(), generateAtmosphere()]);
  }

  _generateNewChild() {
    const ChildType = rand.choose([BlackHole, Monument]);
    return new ChildType();
  }
}

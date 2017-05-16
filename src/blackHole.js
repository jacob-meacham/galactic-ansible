import AnsibleAtom from './atom';
import { generateName, generateClassificationName } from './spaceNameGenerator';

export default class BlackHole extends AnsibleAtom {
  constructor() {
    super();
    this.maxChildren = 0;
    this.maxCharacteristics = 2;
    this.name = generateClassificationName();
    const years = Math.random() * 1000;
    const size = Math.random() * 1000;
    this.description = `This black hole will last for ${years} years, and is ${size} km large.`;
  }

  _generateCharacteristic() {
    return generateName();
  }
}

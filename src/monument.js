import AnsibleAtom from './atom';
import * as rand from './random';
import {generateName} from './spaceNameGenerator';

// TODO: How should this relate to, eg creators of the monument? Should it be done this way
// or should it be done differently? How do characteristics work?
export default class Monument extends AnsibleAtom {
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
      return rand.choose(['ancient', 'old', 'crumbling', 'historic', 'royal', 'imperial', 'sunken', 'twisted', 'lucky', 'magnificient', 'glorious', 'shining', 'tall', 'cracked', 'great', 'big', 'huge', 'giant', 'grand', 'gigantic', 'colossal', 'tremendous', 'gargantuan', 'moss-covered', 'haloed', 'gleaming']);
    };

    let description = 'This monument is a ';
    const numPhysical = rand.randRange(1, 2);
    for (let i = 0; i < numPhysical; i++) {
      description += physical();
      if (i < numPhysical - 1) {
        description += ', ';
      }
    }

    description += ' ';
    if (Math.random() < 0.9) {
      description += rand.choose(['stone', 'gold', 'copper', 'bronze', 'silver', 'white', 'black', 'green', 'gray', 'obsidian', 'wooden']);
      description += ' ';
    }

    // TODO: Fix, as these are not unique.
    description += rand.choose(['tower', rand.choose('', 'smiling', 'proud', 'wise', 'crying', 'singing', 'laughing') + rand.choose('statue', 'statues', 'colossus'), 'bridge', 'towers', 'spire', 'spires', 'cathedral', 'church', 'masoleum', 'maze', 'castle', 'fort', 'keep']);

    return description;
  }
}

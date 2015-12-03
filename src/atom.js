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

// TODO: Can specify what type and how many of each child you have.
// TODO: Similarly, can specify what type and how many of each characteristic you have
// TODO: Specify siblings?
// TODO: Specify the number and types of characteristics and number and types of children allowed.
//    - Neighbors can be siblings, so it needs to be possible to create siblings for yourself (if allowed). Maybe
//      neighbors aren't characteristics, but are part of the parent.

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
export default class AnsibleAtom {
  constructor() {
    this.parent = null;

    this.children = [];
    this.characteristics = [];
    this.name = '';
    this.description = '';
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

  canHaveChildren() {
    return this.children.length < this.maxChildren;
  }

  hasMoreCharacteristics() {
    return this.characteristics.length < this.maxCharacteristics;
  }
}

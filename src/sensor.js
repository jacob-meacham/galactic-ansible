import * as rand from './random'
import Galaxy from './galaxy'
const CBuffer = require('CBuffer')

export class RandomSensor {
  constructor() {
    this.currentNode = null
    this.root = new Galaxy()
    this.lastVisited = new CBuffer(5)
    this.stepsAtCurrent = 0

    this.debugVisits = new Map()
  }

  retrieveData() {
    if (!this.currentNode) {
      this.currentNode = this.root
      return `Lets talk about ${this.currentNode.name}. ${this.currentNode.description}`
    }

    // Decide if we're done at this node:
    // Probability from .1-.9 for 0-4 characteristics.
    if ((Math.random() < 0.1 + 0.8 * (4 - this.stepsAtCurrent)) && this.currentNode.hasMoreCharacteristics()) {
      this.stepsAtCurrent++
      return this.currentNode.discoverNewCharacteristic()
    }

    // It's time to move on!
    this.stepsAtCurrent = 0
    this.lastVisited.push(this.currentNode)
    const newNode = this.walk()
    this.currentNode = newNode
    return `Lets talk about ${newNode.name}. ${newNode.description}`
  }

  // TODO: Sometimes jump to a totally random node.
  walk() {
    let newNode = this.currentNode
    for (let step = 0; step < 20; step++) {
      // Choose from making a new child, the parent, or a current child.
      // Heavily weight those that haven't been seen recently.

      // TODO: Weight this.
      const choices = []
      if (newNode.canHaveChildren()) {
        choices.push('__new_child__')
      }

      for (const child of newNode.children) {
        if (this.lastVisited.indexOf(child) === -1) {
          choices.push(child)
        }
      }

      if (newNode.parent !== null) {
        choices.push(newNode.parent)
      }

      let candidateNode = rand.choose(choices)
      if (candidateNode === '__new_child__') {
        // Generate a new child:
        candidateNode = newNode.discoverNewChild()
      }

      newNode = candidateNode
      if (this.lastVisited.indexOf(newNode) === -1) {
        // Discovered a node we haven't seen recently.
        break
      }
    }

    this._debugRecordVisit(newNode)
    return newNode
  }

  _debugRecordVisit(node) {
    if (!this.debugVisits.has(node)) {
      this.debugVisits.set(node, {
        visits: 1
      })
    }

    const record = this.debugVisits.get(node)
    record.visits++
  }

  debugOutput() {
    RandomSensor._debugOutputTree(this.root, this.debugVisits, 0)
  }

  static _debugOutputTree(node, visits, indentLevel) {
    const indentString = Array(indentLevel + 1).join('  ')
    const numVisits = visits.get(node).visits
    console.log(`${indentString}${node.name} (${node.constructor.name}) - vs: ${numVisits}, \
χ: ${node.children.length}, cha: ${node.characteristics.length}`)
    for (const child of node.children) {
      RandomSensor._debugOutputTree(child, visits, indentLevel + 1)
    }
  }
}

export class StaticSensor {
  retrieveData() {
    return 'Earth is roughly a sphere.'
  }

  debugOutput() {
    return null
  }
}

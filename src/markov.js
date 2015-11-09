import {chooseByFrequency} from './random';

function generateNgrams(corpus, order) {
  function generateNgram(word, n) {
    if (n === 0 || n > word.length) {
      return [];
    }

    const ret = [];
    for (let i = 0; i < word.length - n; i++) {
      ret.push(word.slice(i, i + n));
    }
    return ret;
  }

  return corpus.reduce((acc, cur) => acc.concat(generateNgram(cur, order + 1)), []);
}

// Markov chain generator that generates per character, rather than per word.
export class MarkovWordGenerator {
  constructor(corpus, order) {
    this.db = new Map();
    this.generateDb(corpus.toLowerCase().split(' '), order);
  }

  generateDb(corpus, order) {
    let totalCount = 0;
    const ngrams = generateNgrams(corpus, order);
    for (const ngram of ngrams) {
      const state = ngram.slice(0, order);
      const nextState = ngram.slice(order);

      totalCount++;
      // TODO: Weird that the top level nodes are different? Could homogenize the tree and make it deeper?
      if (!this.db.has(state)) {
        this.db.set(state, {
          count: 0,
          frequency: 1,
          states: new Map()
        });
      }

      const record = this.db.get(state);
      record.count++;

      if (record.states.has(nextState)) {
        record.states.get(nextState).count++;
      } else {
        record.states.set(nextState, {
          count: 1,
          frequency: 1
        });
      }
    }

    // Normalize the frequency
    for (const [, node] of this.db) {
      node.frequency = node.count / totalCount;
      for (const [, child] of node.states) {
        child.frequency = child.count / node.count;
      }
    }
  }

  fill(limit) {
    // TODO: Return array instead of string?
    let val = '';
    let [key, cur] = chooseByFrequency(this.db); // eslint-disable-line prefer-const

    val += key;
    let nextState = key;
    while (val.length < limit) {
      if (!cur) {
        return val;
      }

      const [nextLetter, _] = chooseByFrequency(cur.states);
      if (!nextLetter) {
        return val;
      }

      val += nextLetter;
      nextState = nextState.slice(1) + nextLetter;

      cur = this.db.get(nextState);
    }

    return val;
  }
}

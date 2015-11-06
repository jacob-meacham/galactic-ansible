'use strict'

import {choose} from './random'

// Markov chain generator that generates per character, rather than per word.
export class MarkovWordGenerator {
    constructor(corpus, order) {
        // TODO: Change to Map
        this.db = { }
        this.generateDb(corpus.split(' '), order);
    }

    generateDb(corpus, order) {
        // TODO: build n-grams as a separate step instead
        let totalCount = 0;
        for (let j = 0; j < corpus.length; j++) {
            const word = corpus[j].toLowerCase();
            // Slice each word into order pieces
            for (let i = 0; i < word.length; i++) {
                let nthong = word.slice(i, i+order);
                if (nthong.length < order) {
                    break;
                }
                totalCount++;
                // TODO: Weird that the top level nodes are different? Could homogenize the tree and make it deeper?
                let record = this.db[nthong];
                if (!record) {
                    this.db[nthong] = {
                        count: 0,
                        frequency: 1,
                        next: {},
                        letters: nthong
                    }

                    record = this.db[nthong];
                }
                record.count++;

                let next = '';
                if (i + order < word.length) {
                    next = word[i+order]
                } else {
                    continue;
                }

                if (record.next[next]) {
                    record.next[next].count++;
                } else {
                    record.next[next] = {
                        count: 1,
                        frequency: 1,
                        letter: next // TODO: Don't need
                    }
                }
            }
        }

        // Normalize the frequency
        for (let key of Object.keys(this.db)) {
            let node = this.db[key];
            node.frequency = node.count / totalCount;
            for (let childKey of Object.keys(node.next)) {
                let child = node.next[childKey];
                child.frequency = child.count / node.count;
            }
        }
    }

    fill(limit) {
        const chooseByFrequency = function(map) {
            const target = Math.random();
            let sum = 0;
            for (let key of Object.keys(map)) {
                const node = map[key];
                sum += node.frequency;
                if (sum >= target) {
                    return node;
                }
            }

            return null;
        }
        let val = '';
        // TODO: Use a picker library.
        let cur = chooseByFrequency(this.db);

        val += cur.letters;
        let next = cur.letters;
        while (val.length < limit) {
            const nextState = chooseByFrequency(cur.next);
            if (!nextState) {
                return val;
            }
            //console.log(nextLetter);
            const nextLetter = nextState.letter;
            val += nextLetter;
            next = next.substring(1) + nextLetter;
            //console.log(val);
            if (!this.db[next]) {
                return val;
            }

            cur = this.db[next];
        }

        return val;
    }
}

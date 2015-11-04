'use strict'

import {choose} from './random'

// Markov chain generator that generates per character, rather than per word.
export class MarkovWordGenerator {
    constructor(corpus, order) {
        this.db = { }
        this.generateDb(corpus.split(' '), order);
    }

    generateDb(corpus, order) {
        for (let j = 0; j < corpus.length; j++) {
            const word = corpus[j].toLowerCase();
            // Slice each word into order pieces
            for (let i = 0; i < word.length; i++) {
                let nthong = word.slice(i, i+order);
                let record = this.db[nthong];
                if (record) {
                    record.count++;

                    let next = '';
                    if (i + order + 1 < word.length) {
                        next = word[i+order+1]
                    } else {
                        continue;
                    }
                    if (record.next[next]) {
                        record.next[next].count++;
                    } else {
                        record.next[next] = {
                            count: 1,
                            letter: next // TODO: Don't need
                        }
                    }
                } else {
                    this.db[nthong] = {
                        count: 1,
                        next: {},
                        letters: nthong // TODO: Don't need
                    }
                }
            }
        }
    }

    fill(limit) {
        let val = '';
        let cur = this.db[choose(Object.keys(this.db))];
        val += cur.letters;
        let next = cur.letters;
        while (val.length < limit) {
            //console.log(cur.next.length);
            if (Object.keys(cur.next).length === 0) {
                return val;
            }
            //console.log(Object.keys(cur.next));
            let nextLetter = choose(Object.keys(cur.next));
            //console.log(nextLetter);
            val += nextLetter;
            next = next.substring(1) + nextLetter;
            console.log(val);
            if (!this.db[next]) {
                return val;
            }

            cur = this.db[next];
        }

        return val;
    }
}

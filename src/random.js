'use strict'

export function randomLetter() {
  return choose(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']);
}

export function choose(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}

export function randRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

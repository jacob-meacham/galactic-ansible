export function choose(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function chooseByFrequency(map) {
  const target = Math.random();
  let sum = 0;
  for (const [key, node] of map) {
    sum += node.frequency;
    if (sum >= target) {
      return [key, node];
    }
  }
  return null;
}

export function randomLetter() {
  return choose(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']);
}

export function randRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function addIf(nodule, chance) {
  if (Math.random() <= chance) {
    return nodule;
  }

  return '';
}

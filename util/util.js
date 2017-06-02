export const KEYS_TO_FREQUENCIES = {
  '1': 130.81,
  '2': 138.59,
  '3': 146.83,
  '4': 155.56,
  '5': 164.81,
  '6': 174.61,
  '7': 185.00,
  '8': 196.00,
  '9': 207.65,
  '0': 220.00,
  'q': 233.08,
  'w': 246.94,
  'e': 261.63,
  'r': 277.18,
  't': 293.66,
  'y': 311.13,
  'u': 329.63,
  'i': 349.23,
  'o': 369.99,
  'p': 392.00,
  'a': 415.30,
  's': 440.00,
  'd': 466.16,
  'f': 493.88,
  'g': 523.25,
  'h': 554.37,
  'j': 587.33,
  'k': 622.25,
  'l': 659.26,
  'z': 698.46,
  'x': 739.99,
  'c': 783.99,
  'v': 830.61,
  'b': 880.00,
  'n': 932.33,
  'm': 987.77
};

const mapKeyToIndex = key => Object.keys(KEYS_TO_FREQUENCIES).indexOf(key);

export const mapKeyToLocation = (key, width, height) => {
  const i = mapKeyToIndex(key);

  if (i === -1) {
    return null;
  } else {
    const x = ((i % 6) + 1) * width / 6;
    const y = (Math.floor(i / 6) + 1) * height / 5;

    return [x, y];
  }
};

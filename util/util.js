export const KEYS_TO_FREQUENCIES = {
  'q': 261.63,
  '2': 277.18,
  'w': 293.66,
  '3': 311.13,
  'e': 329.63,
  'r': 349.23,
  '5': 369.99,
  't': 392.00,
  '6': 415.30,
  'y': 440.00,
  '7': 466.16,
  'u': 493.88,
  'i': 523.25,
  'a': 554.37,
  'z': 587.33,
  's': 622.25,
  'x': 659.26,
  'c': 698.46,
  'f': 739.99,
  'v': 783.99,
  'g': 830.61,
  'b': 880.00,
  'h': 932.33,
  'n': 987.77,
  'm': 1046.50
};

export const KEYS_TO_NOTES = {
  'q': 'C',
  '2': 'C♯',
  'w': 'D',
  '3': 'E♭',
  'e': 'E',
  'r': 'F',
  '5': 'F♯',
  't': 'G',
  '6': 'A♭',
  'y': 'A',
  '7': 'B♭',
  'u': 'B',
  'i': 'C',
  'a': 'C♯',
  'z': 'D',
  's': 'E♭',
  'x': 'E',
  'c': 'F',
  'f': 'F♯',
  'v': 'G',
  'g': 'A♭',
  'b': 'A',
  'h': 'B♭',
  'n': 'B',
  'm': 'C'
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

import { KEYS_TO_FREQUENCIES } from '../util/frequencies';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const oscillators = {};

const on = e => {
  e.preventDefault();
  const keyName = e.key;
  // console.log(e.key);

  if (oscillators[keyName] === undefined && KEYS_TO_FREQUENCIES[keyName]) {
    const oscillator = audioCtx.createOscillator();

    // console.log(keyName);
    oscillator.frequency.value = KEYS_TO_FREQUENCIES[keyName];
    oscillator.start(audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillators[keyName] = oscillator;
  }
};

const off = e => {
  e.preventDefault();
  const keyName = e.key;
  if (KEYS_TO_FREQUENCIES[keyName]) {
    const oscillator = oscillators[keyName];

    oscillator.stop(audioCtx.currentTime);
    delete oscillators[keyName];
  }
};

const addListeners = () => {
  document.addEventListener('keydown', on);
  document.addEventListener('keyup', off);
};

export default addListeners;

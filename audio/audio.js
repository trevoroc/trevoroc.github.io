import { KEYS_TO_FREQUENCIES } from '../util/frequencies';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const oscillators = {};

const on = e => {
  const keyName = e.key;
  const oscillator = audioCtx.createOscillator();

  oscillator.frequency.value = KEYS_TO_FREQUENCIES[keyName];
  oscillator.start(audioCtx.currentTime);
  oscillator.connect(audioCtx.destination);
  oscillators[keyName] = oscillator;
};

const off = e => {
  const keyName = e.key;
  const oscillator = oscillators[keyName];

  oscillator.stop(audioCtx.currentTime);
};

const addListeners = () => {
  document.addEventListener('keydown', on);
  document.addEventListener('keyup', off);
};

export default addListeners;

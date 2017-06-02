import { KEYS_TO_FREQUENCIES } from '../util/util';
import HoldEnvelope from './hold_envelope';
import ReleaseEnvelope from './release_envelope';
import { buildOscillator } from './node_builders';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const oscillators = {};

const on = e => {
  const keyName = e.key;
  console.log(`keydown: ${e.key}`);

  if (oscillators[keyName] === undefined && KEYS_TO_FREQUENCIES[keyName]) {
    const oscillator = buildOscillator(KEYS_TO_FREQUENCIES[keyName], audioCtx);
    const gainNode = audioCtx.createGain();
    const envelope = new HoldEnvelope(gainNode.gain, audioCtx);

    oscillator.start(audioCtx.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    console.log(`On trigger: ${audioCtx.currentTime}`);
    envelope.trigger(stopTime => setTimeout(stopOscillator(oscillator, keyName),
                                            stopTime * 1000));

    // console.log(keyName);
    const release = new ReleaseEnvelope(gainNode.gain, audioCtx);
    oscillators[keyName] = {
      oscillator,
      gainNode,
      release
    };

    // console.log('on');
    // clearOscillators();
  }

  console.log(oscillators);
};

const off = e => {
  const keyName = e.key;
  console.log(`keyup: ${e.key}`);

  if (KEYS_TO_FREQUENCIES[keyName]) {
    const oscillatorObj = oscillators[keyName];

    oscillatorObj.release.trigger();
    console.log(`Release trigger: ${audioCtx.currentTime}`);

    let releaseTime = oscillatorObj.release.releaseTime;
    setTimeout(stopOscillator(oscillatorObj.oscillator, keyName),
               releaseTime * 1000);
  }

  // console.log('off');
  // clearOscillators();
};

const stopOscillator = (oscillator, key) => () => {
  console.log(`stopOscillator: ${audioCtx.currentTime}`);
  oscillator.stop(audioCtx.currentTime);
  delete oscillators[key];
};

// const clearOscillators = (param) => {
//   console.log('clearing');
//   const activeKeys = Object.keys(oscillators);
//
//   activeKeys.map(key => {
//     const entry = oscillators[key];
//
//     if (entry.gainNode.gain.value === 0) {
//       console.log(key);
//       entry.oscillator.stop(audioCtx.currentTime);
//       delete oscillators[key];
//     }
//   });
// };

const addListeners = () => {
  document.addEventListener('keydown', on);
  document.addEventListener('keyup', off);
};

export default addListeners;

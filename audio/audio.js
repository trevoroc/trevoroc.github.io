import { KEYS_TO_FREQUENCIES } from '../util/frequencies';
import HoldEnvelope from './hold_envelope';
import ReleaseEnvelope from './release_envelope';
import { buildOscillator } from './node_builders';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const oscillators = {};

const on = e => {
  const keyName = e.key;
  // console.log(e.key);

  if (oscillators[keyName] === undefined && KEYS_TO_FREQUENCIES[keyName]) {
    const oscillator = buildOscillator(KEYS_TO_FREQUENCIES[keyName], audioCtx);
    const gainNode = audioCtx.createGain();
    const envelope = new HoldEnvelope(gainNode.gain, audioCtx);

    oscillator.start(audioCtx.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    envelope.trigger(stopTime => setTimeout(stopOscillator(oscillator, keyName),
                                            stopTime));

    // console.log(keyName);
    oscillators[keyName] = {
      oscillator,
      gainNode,
      release: new ReleaseEnvelope(gainNode.gain, audioCtx)
    };

    // console.log('on');
    // clearOscillators();
  }

  console.log(oscillators);
};

const off = e => {
  const keyName = e.key;
  if (KEYS_TO_FREQUENCIES[keyName]) {
    const oscillatorObj = oscillators[keyName];

    oscillatorObj.release.trigger();

    let releaseTime = oscillatorObj.release.releaseTime;
    setTimeout(stopOscillator(oscillatorObj.oscillator, keyName),
               releaseTime);
  }

  console.log('off');
  // clearOscillators();
};

const stopOscillator = (oscillator, key) => () => {
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

/*
 * Outline:
 *
 * Set up page animations
 * Set up listeners for key strokes
 */

const soundA440 = e => {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();

  oscillator.frequency.value = 440;
  // oscillator.start(0);
  // oscillator.stop(1);
  oscillator.connect(audioCtx.destination);
};

document.addEventListener('DOMContentLoaded', soundA440);

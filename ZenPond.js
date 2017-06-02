import addListeners from './audio/audio';
import { setUpCanvas } from './visual/ripples';

document.addEventListener('DOMContentLoaded', addListeners);
document.addEventListener('DOMContentLoaded', e => {
  setUpCanvas();
});

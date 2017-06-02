import addListeners from './audio/audio';
import { setUpRipples } from './visual/ripples';

document.addEventListener('DOMContentLoaded', addListeners);
document.addEventListener('DOMContentLoaded', e => {
  setUpRipples();
});

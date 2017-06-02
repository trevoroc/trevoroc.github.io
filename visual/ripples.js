import { mapKeyToLocation } from '../util/util';

export const setUpCanvas = () => {
  const canvas = document.getElementById('canvas');
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  const ctx = canvas.getContext('2d');

  const width = canvas.width;
  const halfWidth = width >> 1;
  const height = canvas.height;
  const halfHeight = height >> 1;
  const size = width * (height + 2) * 2;
  const rippleMap = [];
  const prevMap = [];
  const rippleRadius = 50;
  const lineWidth = 20;
  const step = lineWidth * 2;
  const count = height / lineWidth;

  let prevIndex = width;
  let newIndex = width * (height + 3);

  const palette = [
    '#ddecff',
    '#c4ddff',
    '#b4d9ff',
    '#a4c6f2',
    '#93c2ff',
    '#84baff',
    '#6bacff',
    '#56a0ff',
    '#4999ff',
    '#2d82ef'
  ];

  let startHeight, endHeight;
  for (let i = 0; i < 10; i++) {
    ctx.fillStyle = palette[i];
    startHeight = Math.floor(i * canvas.height / 10);
    endHeight = Math.floor((i + 1) * canvas.height / 10);
    ctx.fillRect(0, startHeight, canvas.width, endHeight);
  }

  const texture = ctx.getImageData(0, 0, width, height);
  const ripple = ctx.getImageData(0, 0, width, height);

  for (let i = 0; i < size; i++) {
    prevMap[i] = rippleMap[i] = 0;
  }

  // Main loop
  const run = (timestamp) => {
    newFrame();
    ctx.putImageData(ripple, 0, 0);
    window.requestAnimationFrame(run);
  };

  // const randomRadius = () => Math.floor(Math.random * 17) + 3;

  // Disturb water at (x, y)
  const disturb = (x, y) => {
    x <<= 0;
    y <<= 0;

    for (let j = y - rippleRadius; j < y + rippleRadius; j++) {
      for (let i = x - rippleRadius; i < x + rippleRadius; i++) {
        rippleMap[prevIndex + (j * width) + i] += 128;
      }
    }
  };

  const newFrame = () => {
    let xOffset, yOffset, data, currentPixel, newPixel, prevData;

    let temp = prevIndex;
    prevIndex = newIndex;
    newIndex = temp;
    let i = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let _newIndex = newIndex + i;
        let _prevIndex = prevIndex + i;

        data = ( rippleMap[_prevIndex - width] +
                 rippleMap[_prevIndex + width] +
                 rippleMap[_prevIndex - 1] +
                 rippleMap[_prevIndex + 1]) >> 1;
        data -= rippleMap[_newIndex];
        data -= data >> 5;

        rippleMap[_newIndex] = data;

        // If the data is 0 then the water is still, otherwise there are waves
        data = 1024 - data;

        prevData = prevMap[i];
        prevMap[i] = data;

        if (prevData !== data) {
          xOffset = (((x - halfWidth) * data / 1024) << 0) + halfWidth;
          yOffset = (((y - halfHeight) * data / 1024) << 0) + halfHeight;

          if (xOffset >= width) { xOffset = width - 1; }
          if (xOffset < 0) { xOffset = 0; }
          if (yOffset >= height) { yOffset = height - 1; }
          if (yOffset < 0) { yOffset = 0; }

          newPixel = (xOffset + (yOffset * width)) * 4;
          currentPixel = i * 4;

          ripple.data[currentPixel] = texture.data[newPixel];
          ripple.data[currentPixel + 1] = texture.data[newPixel + 1];
          ripple.data[currentPixel + 2] = texture.data[currentPixel + 2];
        }

        i++;
      }
    }
  };

  const startRipple = (e) => {
    const key = e.key;
    const location = mapKeyToLocation(key, width, height);

    if (location) {
      disturb(...location);
      showNote(key, ...location);
    }
  };

  const showNote = (key, x, y) => {
    const note = document.getElementsByClassName(key)[0];

    const noteX = x - 47;
    const noteY = y - 47;

    note.style.left = noteX.toString() + 'px';
    note.style.top = noteY.toString() + 'px';

    note.classList.toggle('hidden');
    setTimeout(() => (note.classList.toggle('hidden')), 200);
  };

  window.requestAnimationFrame(run);

  // set up listeners
  document.addEventListener('keydown', startRipple);
};

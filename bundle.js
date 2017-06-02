/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var KEYS_TO_FREQUENCIES = exports.KEYS_TO_FREQUENCIES = {
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

var KEYS_TO_NOTES = exports.KEYS_TO_NOTES = {
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

var mapKeyToIndex = function mapKeyToIndex(key) {
  return Object.keys(KEYS_TO_FREQUENCIES).indexOf(key);
};

var mapKeyToLocation = exports.mapKeyToLocation = function mapKeyToLocation(key, width, height) {
  var i = mapKeyToIndex(key);

  if (i === -1) {
    return null;
  } else {
    var x = (i % 6 + 1) * width / 6;
    var y = (Math.floor(i / 6) + 1) * height / 5;

    return [x, y];
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var _hold_envelope = __webpack_require__(4);

var _hold_envelope2 = _interopRequireDefault(_hold_envelope);

var _release_envelope = __webpack_require__(6);

var _release_envelope2 = _interopRequireDefault(_release_envelope);

var _node_builders = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var oscillators = {};

var on = function on(e) {
  var keyName = e.key;
  console.log('keydown: ' + e.key);

  if (oscillators[keyName] === undefined && _util.KEYS_TO_FREQUENCIES[keyName]) {
    var oscillator = (0, _node_builders.buildOscillator)(_util.KEYS_TO_FREQUENCIES[keyName], audioCtx);
    var gainNode = audioCtx.createGain();
    var envelope = new _hold_envelope2.default(gainNode.gain, audioCtx);

    oscillator.start(audioCtx.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    console.log('On trigger: ' + audioCtx.currentTime);
    envelope.trigger(function (stopTime) {
      return setTimeout(stopOscillator(oscillator, keyName), stopTime * 1000);
    });

    // console.log(keyName);
    var release = new _release_envelope2.default(gainNode.gain, audioCtx);
    oscillators[keyName] = {
      oscillator: oscillator,
      gainNode: gainNode,
      release: release
    };

    // console.log('on');
    // clearOscillators();
  }

  console.log(oscillators);
};

var off = function off(e) {
  var keyName = e.key;
  console.log('keyup: ' + e.key);

  if (_util.KEYS_TO_FREQUENCIES[keyName]) {
    var oscillatorObj = oscillators[keyName];

    oscillatorObj.release.trigger();
    console.log('Release trigger: ' + audioCtx.currentTime);

    var releaseTime = oscillatorObj.release.releaseTime;
    setTimeout(stopOscillator(oscillatorObj.oscillator, keyName), releaseTime * 1000);
  }

  // console.log('off');
  // clearOscillators();
};

var stopOscillator = function stopOscillator(oscillator, key) {
  return function () {
    console.log('stopOscillator: ' + audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime);
    delete oscillators[key];
  };
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

var addListeners = function addListeners() {
  document.addEventListener('keydown', on);
  document.addEventListener('keyup', off);
};

exports.default = addListeners;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUpCanvas = undefined;

var _util = __webpack_require__(0);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var setUpCanvas = exports.setUpCanvas = function setUpCanvas() {
  var canvas = document.getElementById('canvas');
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  var ctx = canvas.getContext('2d');

  var width = canvas.width;
  var halfWidth = width >> 1;
  var height = canvas.height;
  var halfHeight = height >> 1;
  var size = width * (height + 2) * 2;
  var rippleMap = [];
  var prevMap = [];
  var rippleRadius = 50;
  var lineWidth = 20;
  var step = lineWidth * 2;
  var count = height / lineWidth;

  var prevIndex = width;
  var newIndex = width * (height + 3);

  var palette = ['#ddecff', '#c4ddff', '#b4d9ff', '#a4c6f2', '#93c2ff', '#84baff', '#6bacff', '#56a0ff', '#4999ff', '#2d82ef'];

  var startHeight = void 0,
      endHeight = void 0;
  for (var i = 0; i < 10; i++) {
    ctx.fillStyle = palette[i];
    startHeight = Math.floor(i * canvas.height / 10);
    endHeight = Math.floor((i + 1) * canvas.height / 10);
    ctx.fillRect(0, startHeight, canvas.width, endHeight);
  }

  var texture = ctx.getImageData(0, 0, width, height);
  var ripple = ctx.getImageData(0, 0, width, height);

  for (var _i = 0; _i < size; _i++) {
    prevMap[_i] = rippleMap[_i] = 0;
  }

  // Main loop
  var run = function run(timestamp) {
    newFrame();
    ctx.putImageData(ripple, 0, 0);
    window.requestAnimationFrame(run);
  };

  // const randomRadius = () => Math.floor(Math.random * 17) + 3;

  // Disturb water at (x, y)
  var disturb = function disturb(x, y) {
    x <<= 0;
    y <<= 0;

    for (var j = y - rippleRadius; j < y + rippleRadius; j++) {
      for (var _i2 = x - rippleRadius; _i2 < x + rippleRadius; _i2++) {
        rippleMap[prevIndex + j * width + _i2] += 128;
      }
    }
  };

  var newFrame = function newFrame() {
    var xOffset = void 0,
        yOffset = void 0,
        data = void 0,
        currentPixel = void 0,
        newPixel = void 0,
        prevData = void 0;

    var temp = prevIndex;
    prevIndex = newIndex;
    newIndex = temp;
    var i = 0;

    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        var _newIndex = newIndex + i;
        var _prevIndex = prevIndex + i;

        data = rippleMap[_prevIndex - width] + rippleMap[_prevIndex + width] + rippleMap[_prevIndex - 1] + rippleMap[_prevIndex + 1] >> 1;
        data -= rippleMap[_newIndex];
        data -= data >> 5;

        rippleMap[_newIndex] = data;

        // If the data is 0 then the water is still, otherwise there are waves
        data = 1024 - data;

        prevData = prevMap[i];
        prevMap[i] = data;

        if (prevData !== data) {
          xOffset = ((x - halfWidth) * data / 1024 << 0) + halfWidth;
          yOffset = ((y - halfHeight) * data / 1024 << 0) + halfHeight;

          if (xOffset >= width) {
            xOffset = width - 1;
          }
          if (xOffset < 0) {
            xOffset = 0;
          }
          if (yOffset >= height) {
            yOffset = height - 1;
          }
          if (yOffset < 0) {
            yOffset = 0;
          }

          newPixel = (xOffset + yOffset * width) * 4;
          currentPixel = i * 4;

          ripple.data[currentPixel] = texture.data[newPixel];
          ripple.data[currentPixel + 1] = texture.data[newPixel + 1];
          ripple.data[currentPixel + 2] = texture.data[currentPixel + 2];
        }

        i++;
      }
    }
  };

  var startRipple = function startRipple(e) {
    var key = e.key;
    var location = (0, _util.mapKeyToLocation)(key, width, height);

    if (location) {
      disturb.apply(undefined, _toConsumableArray(location));
      showNote.apply(undefined, [key].concat(_toConsumableArray(location)));
    }
  };

  var showNote = function showNote(key, x, y) {
    var note = document.getElementsByClassName(key)[0];

    var noteX = x - 47;
    var noteY = y - 47;

    note.style.left = noteX.toString() + 'px';
    note.style.top = noteY.toString() + 'px';

    note.classList.toggle('hidden');
    setTimeout(function () {
      return note.classList.toggle('hidden');
    }, 200);
  };

  window.requestAnimationFrame(run);

  // set up listeners
  document.addEventListener('keydown', startRipple);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _audio = __webpack_require__(1);

var _audio2 = _interopRequireDefault(_audio);

var _ripples = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', _audio2.default);
document.addEventListener('DOMContentLoaded', function (e) {
  (0, _ripples.setUpCanvas)();
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// NB: The node parameter MUST implement the AudioParam interface from the Web
// Audio API
var HoldEnvelope = function () {
  function HoldEnvelope(param, ctx) {
    _classCallCheck(this, HoldEnvelope);

    this.param = param;
    this.ctx = ctx;

    this.attackTime = 0.1;
    this.decayTime = 0.1;
    this.sustainTime = 5;
  }

  _createClass(HoldEnvelope, [{
    key: "totalAttackTime",
    value: function totalAttackTime() {
      return this.attackTime;
    }
  }, {
    key: "totalDecayTime",
    value: function totalDecayTime() {
      return this.attackTime + this.decayTime;
    }
  }, {
    key: "totalSustainTime",
    value: function totalSustainTime() {
      return this.attackTime + this.decayTime + this.sustainTime;
    }
  }, {
    key: "trigger",
    value: function trigger(stopCallback) {
      var now = this.ctx.currentTime;

      this.param.cancelScheduledValues(now);
      this.param.setValueAtTime(0, now);

      // console.log('attack');
      // debugger;
      // Set attack
      this.param.linearRampToValueAtTime(1, now + this.totalAttackTime());

      // Set decay
      this.param.linearRampToValueAtTime(.6, now + this.totalDecayTime());

      // Set sustain
      this.param.linearRampToValueAtTime(0, now + this.totalSustainTime());
      stopCallback(this.totalSustainTime());
    }
  }]);

  return HoldEnvelope;
}();

exports.default = HoldEnvelope;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var buildOscillator = exports.buildOscillator = function buildOscillator(frequency, ctx) {
  var oscillator = ctx.createOscillator();
  oscillator.frequency.value = frequency;
  return oscillator;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReleaseEnvelope = function () {
  function ReleaseEnvelope(param, ctx) {
    _classCallCheck(this, ReleaseEnvelope);

    this.param = param;
    this.ctx = ctx;

    this.releaseTime = 0.25;
  }

  _createClass(ReleaseEnvelope, [{
    key: "totalReleaseTime",
    value: function totalReleaseTime() {
      return this.releaseTime;
    }
  }, {
    key: "trigger",
    value: function trigger() {
      var now = this.ctx.currentTime;

      this.param.cancelScheduledValues(now);

      // Set release
      this.param.linearRampToValueAtTime(0, now + this.totalReleaseTime());
    }
  }]);

  return ReleaseEnvelope;
}();

exports.default = ReleaseEnvelope;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
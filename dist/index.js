'use strict';

var KEYMAP = {
  'Up': 'ArrowUp',
  'Down': 'ArrowDown',
  'Left': 'ArrowLeft',
  'Right': 'ArrowRight',
  'Del': 'Delete',
  'Crsel': 'CrSel',
  'Exsel': 'ExSel',
  'Esc': 'Escape',
  'Apps': 'ContextMenu',
  'OS': 'Meta',
  'Win': 'Meta',
  'Scroll': 'ScrollLock',
  'Spacebar': ' ',
  'Nonconvert': 'NonConvert',
  'Decimal': '.' || ',',
  'Separator': ',' || '.',
  'Multiply': '*',
  'Add': '+',
  'Divide': '/',
  'Subtract': '-',
  'MediaNextTrack': 'MediaTrackNext',
  'MediaPreviousTrack': 'MediaTrackPrevious',
  'MediaFastForward': 'FastFwd',
  'Live': 'TV',
  'Zoom': 'ZoomToggle',
  'SelectMedia': 'LaunchMediaPlayer',
  'MediaSelect': 'LaunchMediaPlayer',
  'VolumeUp': 'AudioVolumeUp',
  'VolumeDown': 'AudioVolumeDown',
  'VolumeMute': 'AudioVolumeMute'
};

// Keys that indicate that the standard is followed
var VERIFIED_KEYS = {
  'ArrowUp': true,
  'ArrowDown': true,
  'ArrowLeft': true,
  'ArrowRight': true,
  'Delete': true,
  'Escape': true,
  'ContextMenu': true,
  'Meta': true,
  'MediaTrackNext': true,
  'MediaTrackPrevious': true,
  'LaunchMediaPlayer': true,
  'AudioVolumeUp': true,
  'AudioVolumeDown': true,
  'AudioVolumeMute': true
};

function insertKeyShim() {
  if (!window.KeyboardEvent) {
    return;
  }
  var proto = KeyboardEvent.prototype;
  var nativeKey = Object.getOwnPropertyDescriptor(proto, 'key');

  // Ensure that we are not overwriting a polyfill or ourselves.
  if (!nativeKey || !/\{\s*\[native code\]\s*\}/.test('' + nativeKey.get)) {
    return;
  }

  // Define our own event.key getters & setters
  delete proto.key;
  Object.defineProperty(proto, 'key', {
    configurable: true,
    enumerable: true,
    get: function get() {
      var key = nativeKey.get.call(this);

      // Unload the shim and restore native key getter if we already get correct keys
      if (VERIFIED_KEYS[key]) {
        delete proto.key;
        Object.defineProperty(proto, 'key', nativeKey);
      }
      // Cache the key so that we don't need to call the getter again.
      // Not using a setter, since IE 11 confuses `this` (the event) and event.__proto__ and ends up in a loop.
      // IE still doesn't cache the key like this, but at least it doesn't loop.
      key = KEYMAP[key] || key;
      Object.defineProperty(this, 'key', { value: key, enumerable: true, writable: false });
      return key;
    }
  });
}

insertKeyShim();

var shimExports = {
  KEYMAP: KEYMAP,
  VERIFIED_KEYS: VERIFIED_KEYS
};

if (typeof define === 'function' && define.amd) {
  define('keyboardevent-key-standardiser-shim', shimExports);
} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
  module.exports = shimExports;
} else if (window) {
  window.keyboardeventKeyStandardiserShim = shimExports;
}
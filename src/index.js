'use strict';

export const KEYMAP = {
  'Up':         'ArrowUp',
  'Down':       'ArrowDown',
  'Left':       'ArrowLeft',
  'Right':      'ArrowRight',
  'Del':        'Delete',
  'Crsel':      'CrSel',
  'Exsel':      'ExSel',
  'Esc':        'Escape',
  'Apps':       'ContextMenu',
  'OS':         'Meta',
  'Scroll':     'ScrollLock',
  'Spacebar':   ' ',
  'Nonconvert': 'NonConvert',
  'Decimal':    '.' || ',',
  'Separator':  ',' || '.',
  'Multiply':   '*',
  'Add':        '+',
  'Divide':     '/',
  'Subtract':   '-',
  'MediaNextTrack':     'MediaTrackNext',
  'MediaPreviousTrack': 'MediaTrackPrevious',
  'MediaFastForward':   'FastFwd',
  'Live':               'TV',
  'Zoom':               'ZoomToggle',
  'SelectMedia':        'LaunchMediaPlayer',
};

// Keys that indicate that the standard is followed
// XXX: Verify what values Edge gives for 'Delete' etc.
export const VERIFIED_KEYS = {
  'ArrowUp': true,
  'ArrowDown': true,
  'ArrowLeft': true,
  'ArrowRight': true,
  // 'Delete': true,
  // 'Escape': true,
  // ' ': true,
};

function insertKeyShim() {
  if (!window.KeyboardEvent) {
    return;
  }
  const proto = KeyboardEvent.prototype;
  const nativeKey = Object.getOwnPropertyDescriptor(proto, 'key');

  // Ensure that we are not overwriting a polyfill or ourselves.
  if (!nativeKey || !(/\{\s*\[native code\]\s*\}/).test('' + nativeKey.get)) {
    return;
  }

  // Define our own event.key getters & setters
  delete proto.key;
  Object.defineProperty(proto, 'key', {
    configurable: true,
    enumerable: true,
    get() {
      const key = nativeKey.get.call(this);

      // Unload the shim and restore native key getter if we already get correct keys
      if (VERIFIED_KEYS[key]) {
        delete proto.key;
        Object.defineProperty(proto, 'key', nativeKey);
        return key;
      }
      // Cache the key so that we don't need to call the getter again.
      return this.key = KEYMAP[key] || key;
    },
    set(value) {
      Object.defineProperty(this, 'key', { value, enumerable: true, writable: false });
      return value;
    },
  });
}

insertKeyShim();

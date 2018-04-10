# KeyboardEvent key standardiser shim

Current Internet Explorer and Microsoft Edge, as well as Firefox 36 and older (mainly), suffer from non-standard `event.key` values. This shim fixes most (or at least the most common) of those. It does not polyfill `event.key` unless it exist natively, but it plays well with polyfills that do, such as [~~keyboardevent-key-polyfill~~](https://github.com/cvan/keyboardevent-key-polyfill). (Edit: Turns out the polyfill does not play well with us and forcefully overwrites the IE & Edge native `event.key` [#20](https://github.com/cvan/keyboardevent-key-polyfill/issues/20))

## Installation

```bash
npm install --save keyboardevent-key-standardiser-shim
```

## Usage

The shim self-executes. Simply import it or require it.

```js
import 'keyboardevent-key-standardiser-shim';
```

## Keymap

| Input              | Standard key       | IE      | Edge    | Firefox |
| ------------------ | ------------------ | ------- | ------- | ------- |
| Up                 | ArrowUp            | current | current | 36      |
| Down               | ArrowDown          | current | current | 36      |
| Left               | ArrowLeft          | current | current | 36      |
| Right              | ArrowRight         | current | current | 36      |
| Del                | Delete             | current | current | 36      |
| Crsel              | CrSel              | 11?     | ?       | 36      |
| Exsel              | ExSel              | 11?     | ?       | 36      |
| Esc                | Escape             | current | current | 36      |
| Apps               | ContextMenu        | current | current | 36      |
| OS                 | Meta               | -       | -       | current |
| Win <sup>1         | Meta               | current | current | -       |
| Scroll             | ScrollLock         | current | current | -       |
| Spacebar           | ' '                | current | ?       | 36      |
| Nonconvert         | Nonconvert         | 11?     | ?       | 36      |
| Decimal <sup>2     | . or , (regional)  | current | current | 28      |
| Separator <sup>2   | , or . (regional)  | current | current | 28      |
| Multiply           | *                  | current | current | 28      |
| Add                | +                  | current | current | 28      |
| Divide             | /                  | current | current | 28      |
| Subtract           | -                  | current | current | 28      |
| MediaNextTrack     | MediaTrackNext     | current | current | 36      |
| MediaPreviousTrack | MediaTrackPrevious | current | current | 36      |
| MediaFastForward   | FastFwd            | ?       | ?       | 36      |
| Live               | TV                 | ?       | ?       | 36      |
| Zoom               | ZoomToggle         | 11?     | ?       | 36      |
| SelectMedia        | LaunchMediaPlayer  | current | current | 36      |
| MediaSelect <sup>3 | LaunchMediaPlayer  | -       | -       | 37 - 48 |
| VolumeUp <sup>3    | AudioVolumeUp      | current | current | 48      |
| VolumeDown <sup>3  | AudioVolumeDown    | current | current | 48      |
| VolumeMute <sup>3  | AudioVolumeMute    | current | current | 48      |

<sup>1</sup> Note that `event.metaKey` is normally set to `false` on windows, even when `Meta` (`Win`) is pressed.

<sup>2</sup> It should be possible to use `event.locale` to dynamically map `Decimal` and `Separator` to the regionally correct keys.

<sup>3</sup> Firefox 37+ will be considered by the shim as standard complient, so if you need this key on FF 37-48, considering checking for it specifically.

_If you have the possibility to test complience of keys marked with a question mark, or if you find other browsers returning non-standard keys, then please report your findings (e.g. by opening an issue)._

So far the shim and standard compatibility has been tested on:
 * IE 11 (current)
 * Edge 14, 16 (current)
 * Firefox 23, 29, 36, 37, 55, 59 (current)
 * Chrome 65 (current)

#### Notes:

 * Firefox 23 - 28 returns "mozPrintableKey" for any printable key.

## Implementation details

It does not seem possible to directly determine whether `KeyboardEvent.prototype.key` follows the latest standard, without listening to physical keyboard events. This shim therefore replaces the native getter and returns a standard-complient key. Furthermore, if it notices a verified good key (keys that in practice only standard complient browsers return), it unloads itself and restores fully native `event.key` handling.

The shim exports the `KEYMAP` as well as the `VERIFIED_KEYS`, in case you need to configure either.

This does not fix all `event.key` issues and bugs with older browser. E.g. Internet Explorer reports "Unidentified" for multiple non-latin modifier keys. Also, some browsers may in rare cases return the wrong `key` value, such as Firefox returning "AltGraph" instead of "ModeChange".

## Further reading:

 * [MDN list of key values and exceptions](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
 * [Edge bug report](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8860571)

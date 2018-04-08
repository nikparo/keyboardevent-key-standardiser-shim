# KeyboardEvent key standardiser shim

**_This project is in an alpha state, and needs testing. Use in a production environment is not recommended._**

Internet Explorer, Edge, and Firefox 36 and older (Firefox up to 48 in case of some media keys) suffer from non-standard `event.key` values. This shim fixes most (or at least the most common) of those. It doesn't polyfill `event.key` if it doesn't exist natively, but it plays well polyfills that do, such as [https://github.com/cvan/keyboardevent-key-polyfill](keyboardevent-key-polyfill).

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
| Up                 | ArrowUp            | latest  | latest  | 36      |
| Down               | ArrowDown          | latest  | latest  | 36      |
| Left               | ArrowLeft          | latest  | latest  | 36      |
| Right              | ArrowRight         | latest  | latest  | 36      |
| Del                | Delete             | 9+?     | ?       | 36      |
| Crsel              | CrSel              | 9+?     | ?       | 36      |
| Exsel              | ExSel              | 9+?     | ?       | 36      |
| Esc                | Escape             | 9+?     | ?       | 36      |
| Apps               | ContextMenu        | 9+?     | ?       | 36      |
| OS                 | Meta               | 9+?     | ?       | latest  |
| Scroll             | ScrollLock         | 9+?     | ?       | -       |
| Spacebar           | ' '                | latest  | ?       | 36      |
| Nonconvert         | Nonconvert         | 9+?     | ?       | 36      |
| Decimal            | . or , (regional)  | ?       | ?       | ?       |
| Separator          | , or . (regional)  | ?       | ?       | ?       |
| Multiply           | *                  | ?       | ?       | ?       |
| Add                | +                  | ?       | ?       | ?       |
| Divide             | /                  | ?       | ?       | ?       |
| Subtract           | -                  | ?       | ?       | ?       |
| MediaNextTrack     | MediaTrackNext     | 9+?     | ?       | 36      |
| MediaPreviousTrack | MediaTrackPrevious | 9+?     | ?       | 36      |
| MediaFastForward   | FastFwd            | -       | -       | 36      |
| Live               | TV                 | -       | -       | 36      |
| Zoom               | ZoomToggle         | 9+?     | ?       | 36      |
| SelectMedia        | LaunchMediaPlayer  | 9+?     | ?       | 36      |

Firefox 37-48 returned non-standard `event.key` values for the media keys below. If you need support for these, you will need to configure the shim accordingly.

| Input              | Standard key       | IE      | Edge    | Firefox |
| ------------------ | ------------------ | ------- | ------- | ------- |
| MediaSelect        | LaunchMediaPlayer  | -       | -       | 37 - 48 |
| VolumeUp           | AudioVolumeUp      | -       | -       | 37 - 48 |
| VolumeDown         | AudioVolumeDown    | -       | -       | 37 - 48 |
| VolumeMute         | AudioVolumeMute    | -       | -       | 37 - 48 |

## Configuration

The `KEYMAP` is exported in case you want to customise the shim. The main scenario for doing so would be to switch the numpad `Decimal` and `Separator` keys to use `,` and `.` instead of the other way around.

```js
import { KEYMAP } from 'keyboardevent-key-standardiser-shim';

// Modern browsers return either ',' or '.' for the numpad "Decimal", depending on region.
KEYMAP.Decimal = ',';
KEYMAP.Separator = '.';
```

## Implementation details

It is not possible, or at least not straightforward, to directly detect whether `KeyboardEvent.prototype.key` follows the latest standard. This shim instead replaces the native getter and returns a standard-complient key. Furthermore, if it notices a verified good key, it unloads itself and reverts to fully native `event.key` handling.

This does not fix all `event.key` issues and bugs with older browser. E.g. Internet Explorer reports "Unidentified" for multiple non-latin modifier keys. Also, some browsers may return the wrong `key` value, such as Firefox returning "AltGraph" instead of "ModeChange".

## Further reading:

 * [MDN list of key values and exceptions](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
 * [Edge bug report](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8860571)

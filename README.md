# KeyboardEvent key standardiser shim

**_This project is in an alpha state, and needs testing. Use in a production environment is not recommended._**

Internet Explorer, Edge, and Firefox 36 and older (Firefox up to 48 in case of some media keys) suffer from non-standard `event.key` values. This shim fixes most (or at least the most common) of those. It doesn't polyfill `event.key` if it doesn't exist natively, but it plays well polyfills that do, such as [https://github.com/cvan/keyboardevent-key-polyfill](keyboardevent-key-polyfill).

## Usage

The shim self-executes. Simply import it or require it.

```js
import 'keyboardevent-key-standardiser-shim';
```

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

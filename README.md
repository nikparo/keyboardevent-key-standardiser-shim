# KeyboardEvent key standardiser shim

Internet Explorer, Edge, and Firefox 36 and older (Firefox up to 48 in case of some media keys) suffer from non-standard `event.key` values. This is a shim that fixes most (or at least the most common) non-standard event.key values. It doesn't polyfill event.key if it doesn't exist natively, but it does play well with `event.key` polyfills such as [https://github.com/cvan/keyboardevent-key-polyfill](keyboardevent-key-polyfill).

## Usage

The shim self-executes. Simply import it or require it.

```js
import 'keyboardevent-key-standardiser-shim';
```

The `KEYMAP` is exported in case you want to customise the shim. The main scenario for doing so would be to switch the numpad `Decimal` and `Separator` keys to use `,` and `.` instead of the other way around.

```js
import { KEYMAP } from 'keyboardevent-key-standardiser-shim';

KEYMAP.Decimal = '.';
KEYMAP.Separator = ',';
```

## Implementation details

It does not seem possible, or at least not straightforward, to directly detect whether event.key values follow the latest standard. This shim instead replaces the native `event.key` getter and returns a standard key. Furthermore, if it notices a verified good key, it unloads itself and reverts to fully native `event.key` handling.

This does not fix all `event.key` issues and bugs with older browser. E.g. Internet Explorer reports "Unidentified" for multiple non-latin modifier keys. Also, some browsers may return the wrong `key` value, such as Firefox returning "AltGraph" instead of "ModeChange".

## Further reading:

 * [MDN list of key values and exceptions](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
 * [Edge bug report](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8860571)
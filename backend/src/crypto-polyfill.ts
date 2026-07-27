import { webcrypto } from 'node:crypto';

// Node 18 does not expose the Web Crypto API on globalThis without the
// --experimental-global-webcrypto flag, but @nestjs/typeorm calls
// crypto.randomUUID() from the global scope during module initialization.
// Node's webcrypto and the DOM Crypto type are structurally close but not
// identical, hence the cast.
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto as unknown as Crypto;
}

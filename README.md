# puppeteer-extra-plugin-session

<img src="https://www.vkf-renzel.com/out/pictures/generated/product/1/650_650_75/r12044336-01/general-warning-sign-10836-1.jpg" width="100" height="100" alt="warning sign"/>

## ⚠️ This is a WIP: this works but you should probably not use it ⚠️

## Introduction

Dump and restore session data from your puppeteer pages.

This plugin supports:

- cookies
- localStorage
- sessionStorage
- IndexedDB *(you'll need to specify the `securityOrigin` of the databases to dump)*

## Installation

```bash
yarn add puppeteer-extra-plugin-session
# or
npm install puppeteer-extra-plugin-session
```

## Usage

First of all, you have to register the plugin with `puppeteer-extra`.

JavaScript:

```js
puppeteer.use(require('puppeteer-extra-plugin-session')())
```

TypeScript:

```ts
import SessionPlugin from 'puppeteer-extra-plugin-session';
puppeteer.use(SessionPlugin())
```

Then, you'll have access to session data helpers:

```ts
const securityOrigin = "https://github.com"; // security origin of the target IndexedDB
const sessionData = await page.sessionManager.dump(); // or page.sessionManager.dumpString()

// [...]

await page.sessionManager.restore(sessionData); // or page.sessionManager.restoreString(sessionData)
```

## Testing

Tests are defined in `*.spec.ts` files.

You can run the tests watcher using `yarn test` or `npm run test`

## Debugging

You can see the package's logs by setting the `DEBUG=puppeteer-extra-plugin:session` env variable.

Example: `DEBUG=puppeteer-extra-plugin:session npm test`

### Base Puppeteer-Extra Plugin System

See the core Puppeteer-Extra Plugin docs for additional information:
<https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin>

## Contributing

We appreciate all contributions.

See [TODO.md](/TODO.md)

## License

MIT

## Resources

- [Puppeteer documentation](https://pptr.dev)
- [Puppeteer-Extra plugin documentation](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin)
- [CDP documentation](https://chromedevtools.github.io/devtools-protocol/)

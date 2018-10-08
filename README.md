# as-networks

[![](https://img.shields.io/npm/v/as-networks.svg?style=flat)](https://www.npmjs.org/package/as-networks) [![](https://img.shields.io/npm/dm/as-networks.svg)](https://www.npmjs.org/package/as-networks) [![](https://api.travis-ci.org/silverwind/as-networks.svg?style=flat)](https://travis-ci.org/silverwind/as-networks)

> Get all networks contained in an autonomous system

## Install

```
$ npm i as-networks
```

## Usage

```js
const asNetworks = require('as-networks');

const networks = await asNetworks('AS237');
// => Array of networks in origin object AS237

const networks = await asNetworks('MAINT-AS237');
// => Array of networks maintained by object MAINT-AS237
```

## API

### asNetworks(name, [options])

Returns a promise that will resolve to an Array of networks found for `name`. If none are found, a empty array is returned. Will reject on network errors.

#### options

 - `server`: The WHOIS server to use. Default: `'whois.radb.net'`.
 - `port`: The port to use. Default: `43`.

## License

© [silverwind](https://github.com/silverwind), distributed under BSD licence

# Font Awesome Icon Character List
[![license](https://img.shields.io/github/license/gluons/Font-Awesome-Icon-Chars.svg?style=flat-square)](./LICENSE)
[![npm](https://img.shields.io/npm/v/font-awesome-icon-chars.svg?style=flat-square)](https://www.npmjs.com/package/font-awesome-icon-chars)
[![npm](https://img.shields.io/npm/dt/font-awesome-icon-chars.svg?style=flat-square)](https://www.npmjs.com/package/font-awesome-icon-chars)
[![Known Vulnerabilities](https://snyk.io/test/github/gluons/font-awesome-icon-chars/badge.svg?style=flat-square)](https://snyk.io/test/github/gluons/font-awesome-icon-chars)
[![Travis](https://img.shields.io/travis/gluons/Font-Awesome-Icon-Chars.svg?style=flat-square)](https://travis-ci.org/gluons/Font-Awesome-Icon-Chars)
[![TSLint](https://img.shields.io/badge/TSLint-gluons-15757B.svg?style=flat-square)](https://github.com/gluons/tslint-config-gluons)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg?style=flat-square)](https://renovateapp.com/)

The list of [Font Awesome](https://fontawesome.com/) icon **unicode characters** in several file format.


## Installation

**Via [NPM](https://www.npmjs.com/):**

[![NPM](https://nodei.co/npm/font-awesome-icon-chars.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/font-awesome-icon-chars)

```
npm install font-awesome-icon-chars
```

**Via [Yarn](https://yarnpkg.com/):**

```
yarn add font-awesome-icon-chars
```

## Usage

### Assets

You can use characters list file in [character-list](./character-list) directory.  
All characters list files will be placed in this directory.

### Node.js

You can also get list of icon from this module.

```javascript
const faIconChars = require('font-awesome-icon-chars');
const { solid, regular, brands } = faIconChars;

// Solid icons
for (let icon of solid) {
	console.log(`Icon ID: ${icon.name}, Icon Unicode: ${icon.unicode}`);
}
// Regular icons
for (let icon of regular) {
	console.log(`Icon ID: ${icon.name}, Icon Unicode: ${icon.unicode}`);
}
// Brands icons
for (let icon of brands) {
	console.log(`Icon ID: ${icon.name}, Icon Unicode: ${icon.unicode}`);
}
```

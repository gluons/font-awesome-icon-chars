# Font Awesome Icon Character List
[![license](https://img.shields.io/github/license/gluons/Font-Awesome-Icon-Chars.svg?style=flat-square)](./LICENSE)
[![npm](https://img.shields.io/npm/v/font-awesome-icon-chars.svg?style=flat-square)](https://www.npmjs.com/package/font-awesome-icon-chars)
[![npm](https://img.shields.io/npm/dt/font-awesome-icon-chars.svg?style=flat-square)](https://www.npmjs.com/package/font-awesome-icon-chars)
[![Bower](https://img.shields.io/bower/v/font-awesome-icon-chars.svg?style=flat-square)](https://github.com/gluons/Font-Awesome-Icon-Chars)
[![Gemnasium](https://img.shields.io/gemnasium/gluons/Font-Awesome-Icon-Chars.svg?style=flat-square)](https://gemnasium.com/github.com/gluons/Font-Awesome-Icon-Chars)
[![Known Vulnerabilities](https://snyk.io/test/github/gluons/font-awesome-icon-chars/badge.svg?style=flat-square)](https://snyk.io/test/github/gluons/font-awesome-icon-chars)
[![Travis](https://img.shields.io/travis/gluons/Font-Awesome-Icon-Chars.svg?style=flat-square)](https://travis-ci.org/gluons/Font-Awesome-Icon-Chars)
[![ESLint Gluons](https://img.shields.io/badge/code%20style-gluons-9C27B0.svg?style=flat-square)](https://github.com/gluons/eslint-config-gluons)
[![Greenkeeper badge](https://badges.greenkeeper.io/gluons/Font-Awesome-Icon-Chars.svg?style=flat-square)](https://greenkeeper.io/)

The list of [Font Awesome](http://fontawesome.io/) icon unicode characters in several file format.


## Installation

**Via [Bower](https://bower.io/):**

```
bower install font-awesome-icon-chars
```
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

You can use characters list file in [character-list](./character-list) directory. All characters list files will be placed in this directory.

### Node.js

You will get array of icon from this module.
```javascript
const faIconChars = require('font-awesome-icon-chars');
for (let icon of faIconChars) {
	console.log(`Icon ID: ${icon.id}, Icon Unicode: ${icon.unicode}`);
}
```

## Development

- Build all file.
  ```
  gulp build
  ```
  Or use default gulp task.
  ```
  gulp
  ```

- Build **[CSON](https://github.com/bevry/cson)** file.
  ```
  gulp build:cson
  ```

- Build **[JSON](http://www.json.org/)** file.
  ```
  gulp build:json
  ```

- Build **[TOML](https://github.com/toml-lang/toml)** file.
  ```
  gulp build:toml
  ```

- Build **[XML](https://www.w3.org/XML/)** file.
  ```
  gulp build:xml
  ```

- Build **[YAML](http://yaml.org/)** file.
  ```
  gulp build:yaml
  ```

#### Want ID start with `fa-`?
Use `--fa` argument in gulp command.
```
gulp --fa
gulp build --fa
gulp build:cson --fa
gulp build:json --fa
gulp build:toml --fa
gulp build:xml --fa
gulp build:yaml --fa
```

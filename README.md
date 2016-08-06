# Font Awesome Icon Character List
![GitHub license](https://img.shields.io/github/license/gluons/Font-Awesome-Icon-Chars.svg?style=flat-square)
[![npm](https://img.shields.io/npm/v/font-awesome-icon-chars.svg?style=flat-square)](https://www.npmjs.com/package/font-awesome-icon-chars)
[![npm](https://img.shields.io/npm/dt/font-awesome-icon-chars.svg?style=flat-square)](https://www.npmjs.com/package/font-awesome-icon-chars)
[![Bower](https://img.shields.io/bower/v/font-awesome-icon-chars.svg?style=flat-square)](https://github.com/gluons/Font-Awesome-Icon-Chars)
[![Travis](https://img.shields.io/travis/gluons/Font-Awesome-Icon-Chars.svg?style=flat-square)](https://travis-ci.org/gluons/Font-Awesome-Icon-Chars)

The list of [Font Awesome](http://fontawesome.io/) icon unicode characters in several file format.

## Icon Source
Using icon source from [icons.yml](https://github.com/FortAwesome/Font-Awesome/blob/master/src/icons.yml).

## Installation
#### Bower
```
bower install font-awesome-icon-chars
```
#### NPM
[![NPM](https://nodei.co/npm/font-awesome-icon-chars.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/font-awesome-icon-chars)
```
npm install font-awesome-icon-chars
```

## Usage
You can use characters list file in [character-list](./character-list) directory. All files that has been built will place in this directory.

## Build
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

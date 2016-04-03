# Font Awesome Icon Character List
![GitHub license](https://img.shields.io/github/license/gluons/Font-Awesome-Icon-Chars.svg?style=flat-square)
[![npm](https://img.shields.io/npm/v/font-awesome-icon-chars.svg?style=flat-square)](https://www.npmjs.com/package/font-awesome-icon-chars)
[![npm](https://img.shields.io/npm/dt/font-awesome-icon-chars.svg?style=flat-square)](https://www.npmjs.com/package/font-awesome-icon-chars)
[![Bower](https://img.shields.io/bower/v/font-awesome-icon-chars.svg?style=flat-square)](https://github.com/gluons/Font-Awesome-Icon-Chars)

The list of [Font Awesome](http://fontawesome.io/) icon unicode characters in several file format.

## Icon Source
Using icon source from [icons.yml](https://github.com/FortAwesome/Font-Awesome/blob/master/src/icons.yml).

## Installation
#### Bower
```
bower install font-awesome-icon-chars
```
#### NPM
[![NPM](https://nodei.co/npm/font-awesome-icon-chars.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/font-awesome-icon-chars/)
```
npm install font-awesome-icon-chars
```

## Usage
You can use characters list file in [character-list](https://github.com/gluons/Font-Awesome-Icon-Chars/tree/master/character-list) directory. All files that has been built will place in this directory.

## Build
- Build all file.
  ```
  gulp make
  ```
  Or use default gulp task.
  ```
  gulp
  ```

- Build **JSON** file.
  ```
  gulp make:json
  ```

- Build **XML** file.
  ```
  gulp make:xml
  ```

- Build **CSON** file.
  ```
  gulp make:cson
  ```

#### Want ID start with `fa-`?
Use `--fa` argument in gulp command.
```
gulp --fa
gulp make --fa
gulp make:json --fa
gulp make:xml --fa
gulp make:cson --fa
```

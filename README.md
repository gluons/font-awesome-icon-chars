# Font Awesome Icon Character List
The list of [Font Awesome](http://fontawesome.io/) icon unicode characters in several file format.
## Icon Source
I use icon source from [icons.yml](https://github.com/FortAwesome/Font-Awesome/blob/master/src/icons.yml)
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
- Convert `icons.yml` source file to JSON source file.
  ```
  gulp convert-src
  ```
- Build **JSON** file.
  ```
  gulp make:json
  ```
- Build **XML** file.
  ```
  gulp make:xml
  ```
### Want ID start with `fa-`?
Use `--fa` argument in gulp command.
```
gulp --fa
gulp make --fa
gulp make:json --fa
gulp make:xml --fa
```

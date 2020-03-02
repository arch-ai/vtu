# VTU
 [![NPM Version](https://img.shields.io/npm/v/vtu.svg?style=flat-square)](https://www.npmjs.com/package/vtu)[![Known Vulnerabilities](https://snyk.io/test/github/nenzark/vtu/badge.svg?targetFile=package.json)](https://snyk.io/test/github/nenzark/vtu?targetFile=package.json)[![Maintainability](https://api.codeclimate.com/v1/badges/f1f6cb0560b7e2f000af/maintainability)](https://codeclimate.com/github/nenzark/vtu/maintainability)
### CLI - Vue Translation Utils 

### Introduction

This package provides a simple CLI interface to manage your Vue I18n translations. 

It helps with extracting I18n strings and converting them to different file formats.

The flow of translating a vue application with Vue I18n would be:
```
vue application 
    -> extract strings (VTU CLI)   
        -> translate (translation services or by hand)  
             -> convert to vue I18n app format (VTU CLI)
```

### Installation
Local in your project
```
npm i vtu --save-dev
```
Global
```
npm i vtu -g
```
### Running from the command line:
#### Extract command
extract \<dir> [type] [location]
```
vtu extract <dir> [type] [location]  extract translation strings and save as output to file
                                                                  [aliases: e]

dir       starting dir                     [string] [required] [default: "./"]
location  File relative location                        [string] [default: ""]
type      Output type                               [string] [default: "json"]
```
##### Examples
Generate en_US, de_DE locale in csv format. This will extract all strings from methods, directives or components and save it in a csv format.

The extract command supports .json and .csv output file types.

```
npx vtu extract ./ csv ./locale/en_US
npx vtu extract ./ csv ./locale/de_DE
```
```
Output saved to ./locale/en_US.csv
Output saved to ./locale/de_DE.csv
```
#### Convert command
convert \<source> \<target> 

Source and target are files that need to be converted (./locale/en_US.csv -> ./locale/en_US.json)

Support for now is:
- csv -> json
- json -> csv
```
vtu convert <source> <target>        convert source file format to target file format
                                                                   [aliases: c]

source  Source File (relative location)                     [string] [required]
target  Target File (relative location)                     [string] [required]
```
##### Examples
Convert csv to json file format
```
npx vtu convert ./locale/en_US.csv ./locale/en_US.json 
```
```
Output saved to ./locale/en_US.json
```




```
npx vtu extract ./ csv ./locale/en_US
npx vtu extract ./ json ./locale/en_US
npx vtu convert ./locale/en_US.json ./locale/en_US.csv
npx vtu convert ./locale/en_US.csv ./locale/en_US.json
```
### Issues
Please report any [issues here](https://github.com/nenzark/vtu/issues) 

### License 
[GPL v3.0](https://github.com/nenzark/vtu/blob/master/LICENSE)


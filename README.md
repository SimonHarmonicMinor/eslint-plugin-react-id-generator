# eslint-plugin-react-id-generator

Auto generated id values for jsx-expression.
This plugin is very useful for writing auto-tests.

## Table of contents
* [Quick start](#quick-start)
* [Status](#status)
* [Usage](#usage)

## Quick start
```shell script
npm install eslint --save-dev
./node-modules/.bin/eslint --init
npm install eslint-plugin-react-id-generator --save-dev
```

## Status
![npm](https://img.shields.io/npm/v/eslint-plugin-react-id-generator)
[![Build Status](https://travis-ci.com/SimonHarmonicMinor/eslint-plugin-react-id-generator.svg?branch=master)](https://travis-ci.com/SimonHarmonicMinor/eslint-plugin-react-id-generator)

## Usage
Basic configuration of `.eslintrc` looks like this 
```json
{
  "plugins": {
    "react-id-generator"
  },
  "rules": {
    "react-id-generator/jsx-id": "error"
  }
}
```

Now all you have to do is add `qa-id` attribute to required
jsx-expression without filling it.

```jsx harmony
<MyComponent numVal={1} strVal="Michael" qa-id />
```

Now run `./node_modules/.bin/eslint --fix 'file_or_folder'` and you'll get

```jsx harmony
<MyComponent numVal={1} strVal="Michael" qa-id="qa-id_f5d485d2995609cee081753ec9372b0e" />
```

The output hash value depends on tag name, attributes names and values and the type of the tag
itself (whether it's self-closing or not).

Rule might be customized.

```json
{
  "rules": {
    "jsx-id": [
        "error", 
        {
          "attribute": "my-id",
          "prefix": "pf",
          "divider": "@@@",
          "hashMaxLength": 7
        }
    ]
  }
}
```

The fix with such configuration will be different.

```jsx harmony
<MyComponent numVal={1} strVal="Michael" my-id />
```

After fix.

```jsx harmony
<MyComponent numVal={1} strVal="Michael" my-id="pf@@@d791bee" />
```

All of listed parameters can be omitted.
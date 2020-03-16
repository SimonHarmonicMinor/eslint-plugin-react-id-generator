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
(put badges here)

## Usage
Basic configuration of `.eslintrc` looks like this 
```json
{
  "plugins": {
    "react-id-generator"
  },
  "rules": {
    "jsx-id": "error"
  }
}
```

Now all you have to do is add `qa-id` attribute to required
jsx-expression without filling it.

```jsx harmony

```
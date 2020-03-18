# jsx-id

Auto fill QA id attributes by running `eslint --fix`.

## Rule Details

This rule aims to auto fill id attributes which is helpful to determine
elements in auto tests.

Examples of **incorrect** code for this rule:

```jsx harmony
<MyComponent numVal={1} strVal="Michael" qa-id />
```

Examples of **correct** code for this rule:

```jsx harmony
<MyComponent numVal={1} strVal="Michael" qa-id="qa-id_f5d485d2995609cee081753ec9372b0e" />
```

Rule automatically puts value to empty `qa-id` attribute which
depends on tag name, attributes names and values and the type of the tag
itself (whether it's self-closing or not). 
Just run `eslint --fix`

### Options

Rule has might be customized.
* **attribute** - the name of the attribute that will be checked as unfilled (`qa-id` by default).
* **prefix** - the output id value prefix (`qa-id` by default).
* **divider** - the string that's supposed to be put between prefix and calculated hash (`_` by default).
* **hashMaxLength** - the maximum length of the output hash, cannot be less than `1`. 
(no restrictions by default)

The example
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

## When Not To Use It

This rule should not be used if you don't need to determine specific page elements in DOM, due to
fact that it might produce lots of useless attribute values.
"use strict";

const RuleTester = require('eslint').RuleTester;
const md5 = require('blueimp-md5');
const rule = require("../../../lib/rules/jsx-id");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  }
});

const ruleTester = new RuleTester();

ruleTester.run("jsx-id", rule, {

  valid: [
    //'<MyComponent val="" isDisabled otherVal={222} />'
  ],

  invalid: [
    {
      code: '<Row val1="dsad" val2={23123} qa-id>SomeValue</Row>',
      errors: [{
        line: 1,
        column: 31
      }],
      output: `<Row val1="dsad" val2={23123} qa-id="qa-id_${md5(
          'Row_val1_"dsad",val2_23123,qa-id_null_false'
      )}">SomeValue</Row>`,
    },
    {
      code: '<Row val1="dsad" val2={23123} qa-id>SomeValue</Row>',
      options: [{prefix: 'prefix'}],
      errors: [{
        line: 1,
        column: 31
      }],
      output: `<Row val1="dsad" val2={23123} qa-id="prefix_${md5(
          'Row_val1_"dsad",val2_23123,qa-id_null_false'
      )}">SomeValue</Row>`,
    }
  ]
});

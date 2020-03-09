"use strict";

const test = require('ava');
const RuleTester = require('eslint-ava-rule-tester');
const md5 = require('blueimp-md5');
const rule = require("../../../lib/rules/jsx-id");
//const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester(test, {
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  }
});
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
          'Row_val1_dsad,val2_23123,qa-id_null'
      )}" >SomeValue</Row>`,
    }
  ]
});

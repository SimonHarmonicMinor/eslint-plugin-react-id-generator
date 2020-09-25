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
    {
      code: '<SomeBody val="" not-qa-id hehehe="juu" />',
    },
    {
      code: '<Once qa-id val="" isDisabled otherVal={222} />',
      options: [{attribute: 'some-id'}]
    },
    {
      code: '<Told some-id val="" strawberry={0.001} />',
      options: [{attribute: 'qa-id'}]
    },
    {
      code: '<Me qa-id val="" isDisabled otherVal={222} />',
      options: [{attribute: 'text-id'}]
    },
    {
      code: '<MyComp {...props} />'
    },
    {
      code: '<MyAnotherComp {...props} qa-id="asdasd" />'
    },
    {
      code: '<MyAnotherComp2 {...props} qa-id="asdasd" />',
      options: [{attribute: 'data-test-id'}]
    }
  ],

  invalid: [
    {
      code: '<TheWorld val1="dsad" val2={23123} qa-id>No Value</TheWorld>',
      errors: [{
        line: 1,
        column: 36
      }],
      output: `<TheWorld val1="dsad" val2={23123} qa-id="qa-id_${md5(
          'TheWorld_val1_"dsad",val2_23123,qa-id_null_false'
      )}">No Value</TheWorld>`,
    },
    {
      code: '<IsGonna tt={[1, 2, 3, identifier, [0, 1], {a: 1}]} nn={14} qa-id>SomeValue</IsGonna>',
      options: [{prefix: 'prefix', hashMaxLength: 6}],
      errors: [{
        line: 1,
        column: 61
      }],
      output: `<IsGonna tt={[1, 2, 3, identifier, [0, 1], {a: 1}]} nn={14} qa-id="prefix_${
          md5(
              'IsGonna_tt_[1, 2, 3, identifier, [0, 1], OBJECT_EXPRESSION_VALUE],nn_14,qa-id_null_false'
          ).substring(0, 6)
      }">SomeValue</IsGonna>`,
    },
    {
      code: '<Roll ut="good" my-id />',
      options: [{prefix: 'my-id', attribute: 'my-id', divider: '@', hashMaxLength: 12}],
      errors: [{
        line: 1,
        column: 17
      }],
      output: `<Roll ut="good" my-id="my-id@${
          md5(
              'Roll_ut_"good",my-id_null_true'
          ).substring(0, 12)
      }" />`,
    },
    {
      code: '<Me textVal="yo man" numVal={69.96} qa-id>Yellow bus</Me>',
      errors: [{
        line: 1,
        column: 37
      }],
      options: [{hashMaxLength: 18}],
      output: `<Me textVal="yo man" numVal={69.96} qa-id="qa-id_${
          md5(
              'Me_textVal_"yo man",numVal_69.96,qa-id_null_false'
          ).substring(0, 18)
      }">Yellow bus</Me>`,
    }
  ]
});

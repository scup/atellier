import React from 'react';
import TestUtils from 'react-addons-test-utils';
import FieldType from '../lib/FieldType.jsx';

describe('FieldType', () => {

  let handleChange = () => {
    return null;
  };

  let renderFieldType = ({ name, type, defaultValue='', onChange=handleChange }) => {
    return TestUtils.renderIntoDocument(
      <FieldType name={name} type={type} defaultValue={defaultValue} onChange={onChange}/>
    );
  };

  it('should render string input', () => {

    let FieldType = renderFieldType({
      name: 'string',
      type: 'string'
    });

    var textarea = TestUtils.findRenderedDOMComponentWithTag(
      FieldType, 'textarea'
    );

    expect(textarea).toBeTruthy();
  });

  it('should render number input', () => {

    let FieldType = renderFieldType({
      name: 'number',
      type: 'number'
    });

    var input = TestUtils.findRenderedDOMComponentWithTag(
      FieldType, 'input'
    );

    expect(input).toBeTruthy();
  });

  it('should render bool input', () => {

    let FieldType = renderFieldType({
      name: 'bool',
      type: 'bool',
      defaultValue: false
    });

    var toggle = TestUtils.findRenderedDOMComponentWithClass(
      FieldType, 'attelier-toggle'
    );

    expect(toggle).toBeTruthy();
  });

  it('should render array input', () => {

    let FieldType = renderFieldType({
      name: 'array',
      type: 'array'
    });

    var div = TestUtils.findRenderedDOMComponentWithClass(
      FieldType, 'properties-field'
    );

    expect(TestUtils.isElement(FieldType)).toBeFalsy();
  });

  it('should render object input', () => {

    let FieldType = renderFieldType({
      name: 'object',
      type: 'object'
    });

    var div = TestUtils.findRenderedDOMComponentWithClass(
      FieldType, 'properties-field'
    );

    expect(TestUtils.isElement(FieldType)).toBeFalsy();
  });

  it('should handle input change', () => {

    let FieldType = renderFieldType({
      name: 'string',
      type: 'string'
    });

    var textarea = TestUtils.findRenderedDOMComponentWithTag(
      FieldType, 'textarea'
    );

    TestUtils.Simulate.change(textarea);
});

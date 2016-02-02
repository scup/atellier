import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Toggle from '../lib/Toggle.jsx';

describe('Toggle', function () {

  const renderToggle = function({ defaultValue, name, handleChange }) {
    return ReactDOM.findDOMNode(TestUtils.renderIntoDocument(
      <div className="properties-field">
        <Toggle defaultValue={defaultValue} onChange={handleChange} />
        <label>{name}</label>
      </div>
    ));
  };

  it('should be selected if `defaultValue` property is `true`', function () {
    let domNode = renderToggle({ name: 'ToggleField', defaultValue: true });
    let toggle = domNode.querySelector('.atellier-toggle');
    expect(toggle.nodeName).toEqual('DIV');
    expect(domNode.querySelector('.atellier-toggle-checked')).toBeDefined();
  });

  it('should be unselected if `defaultValue` is `false', function () {
    let domNode = renderToggle({ name: 'ToggleField', defaultValue: false });
    let toggle = domNode.querySelector('.atellier-toggle');
    expect(toggle.nodeName).toEqual('DIV');
    expect(domNode.querySelector('.atellier-toggle-checked')).toBeNull();
  });

  it('should the `name` property match the label value', function () {
    let domNode = renderToggle({ name: 'ToggleField', defaultValue: false });
    let label = domNode.querySelector('label');
    let text = label.innerText || label.textContent;
    expect(text).toEqual('ToggleField');
  });

  it('should add/remove class `.atellier-toggle-checked` when toggled', function () {
    let domNode = renderToggle({ name: 'ToggleField', defaultValue: false });
    expect(domNode.querySelector('.atellier-toggle-checked')).toBeNull();
    let toggle = domNode.querySelector('.atellier-toggle');
    TestUtils.Simulate.click(toggle);
    expect(domNode.querySelector('.atellier-toggle-checked')).not.toBeNull();
  });

  it('should call `handleChange` callback when toggled', function () {
    let handleChange = function(){};
    let obj = { handleChange: handleChange };
    spyOn(obj, 'handleChange');
    let domNode = renderToggle({ name: 'ToggleField', defaultValue: false, handleChange: obj.handleChange });
    let toggle = domNode.querySelector('.atellier-toggle');
    TestUtils.Simulate.click(toggle);
    expect(obj.handleChange.calls.count()).toBe(1);
  });

});

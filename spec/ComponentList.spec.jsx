import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';
import ComponentsList from '../lib/ComponentList.jsx';

describe('ComponentList', () => {

  class TestComponent extends React.Component {
    render() {
      return <h1>Test Component</h1>;
    }
  };

  let componentItems = [
    {
      componentName: 'test component',
      component: TestComponent
    }
  ];

  let renderComponentList = (components=componentItems) => {
    let componentsList = Immutable.List(components);
    return TestUtils.renderIntoDocument(
      <ComponentsList components={componentsList} />
    );
  };

  it('should render component list', () => {
    let componentList = renderComponentList();

    let div = TestUtils.findRenderedDOMComponentWithClass(
      componentList, 'component-nav'
    );

    expect(div).toBeTruthy();
  });

  it('should filter component list', () => {
    let componentList = renderComponentList();
    let input = TestUtils.findRenderedDOMComponentWithClass(
      componentList, 'component-filter'
    );

    TestUtils.Simulate.change(input, { target: { value: 'test'} });

    let li = TestUtils.findRenderedDOMComponentWithClass(
      componentList, 'component-list-item'
    );

    expect(li).toBeTruthy();
  });

  it('should select component list item', () => {
    let componentList = renderComponentList();

    let li = TestUtils.findRenderedDOMComponentWithClass(
      componentList, 'component-list-item'
    );

    TestUtils.Simulate.click(li);
  });
  
});

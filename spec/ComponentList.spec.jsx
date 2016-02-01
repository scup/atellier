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

  let components = [
    {
      componentName: 'test component',
      component: TestComponent
    }
  ];

  let renderComponentList = (components=components) => {
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

  xit('should filter component list', () => {
    let componentList = renderComponentList();
    let input = TestUtils.findRenderedDOMComponentWithClass(
      componentList, 'component-filter'
    );

    TestUtils.Simulate.change(input, { target: { value: 'test'} });

    let listItems = TestUtils.findRenderedDOMComponentWithClass(
      componentList, 'component-list'
    );

    console.log(listItems);


  });

  //
  // it('should handle toggle sidebar', () => {
  //   let sidebar = renderSideBar();
  //
  //   expect(sidebar.state.close).toBeFalsy();
  //
  //   sidebar._handleToggleSidebar();
  //   expect(sidebar.state.close).toBeTruthy();
  // });

});

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';
import Sidebar from '../lib/Sidebar.jsx';

describe('Sidebar', () => {

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

  let renderSideBar = (components=components) => {
    let componentsList = Immutable.List(components);
    return TestUtils.renderIntoDocument(
      <Sidebar components={componentsList} />
    );
  };

  it('should render sidebar', () => {
    let sidebar = renderSideBar();

    let div = TestUtils.findRenderedDOMComponentWithClass(
      sidebar, 'sidebar'
    );

    expect(div).toBeTruthy();
  });

  it('should handle toggle sidebar', () => {
    let sidebar = renderSideBar();

    expect(sidebar.state.close).toBeFalsy();

    sidebar._handleToggleSidebar();
    expect(sidebar.state.close).toBeTruthy();
  });

});

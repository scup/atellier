import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Attelier from '../lib/Attelier.jsx';

describe('Attelier', () => {

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

  let renderAttelier = (components=components) => {
    return TestUtils.renderIntoDocument(
      <Attelier components={components} />
    );
  };

  it('should render attelier', () => {
    let attelier = renderAttelier();

    var div = TestUtils.findRenderedDOMComponentWithClass(
      attelier, 'attelier'
    );

    expect(div).toBeTruthy();
  });

  it('should set stagedComponent state', () => {
    let attelier = renderAttelier();

    attelier._handleSelectComponent(components[0]);

    expect(attelier.state.stagedComponent).toBeTruthy();
  });

});

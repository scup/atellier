import React, { PropTypes } from 'react';
import TestUtils from 'react-addons-test-utils';
import Workspace from '../lib/Workspace.jsx';

describe('Workspace', () => {

  class TestComponent extends React.Component {

    static propTypes = {
      text: PropTypes.string
    };

    render() {
      return (
        <h1>{ this.props.text }</h1>
      );
    }
  }

  let handleCloseProperties = () => {
    return null;
  };

  let renderWorkspace = ({ component, onCloseProperties=handleCloseProperties }) => {
    return TestUtils.renderIntoDocument(
      <Workspace component={component} onCloseProperties={handleCloseProperties} />
    );
  };

  it('should render workspace', () => {

    let workspace = renderWorkspace({
      component: {
        component: TestComponent,
        componentName: 'TestComponent'
      }
    });

    var div = TestUtils.findRenderedDOMComponentWithClass(
      workspace, 'workspace'
    );

    expect(div).toBeTruthy();
  });

  it('should render workspace', () => {

    let workspace = renderWorkspace({
      component: {
        component: TestComponent,
        componentName: 'Test Component'
      }
    });

    var textarea = TestUtils.findRenderedDOMComponentWithTag(
      workspace, 'textarea'
    );

    TestUtils.Simulate.change(textarea);
  });

});

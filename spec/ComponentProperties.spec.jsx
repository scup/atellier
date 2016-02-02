import React from 'react';
import Immutable from 'immutable';
import TestUtils from 'react-addons-test-utils';
import ComponentProperties from '../lib/ComponentProperties.jsx';

describe('ComponentProperties', () => {

  class Component extends React.Component {
    render() {
      return <h1>Test Component</h1>;
    };
  }

  let componentList = Immutable.List([
    {
      componentName: 'tet component',
      component: Component
    }
  ]);

  let componentItem = componentList.get(0);

  let defaultProps = {
    component: componentItem,
    componentProps: {},
    components: componentList,
    onChangeProps: () => {},
    onCloseProperties: () => {}
  };

  let renderComponentProperties = (properties) => {
    let props = Object.assign({}, defaultProps, properties)
    return TestUtils.renderIntoDocument(
      <ComponentProperties {...props} />
    );
  };

  it('should render component properties', () => {
    let ComponentProperties = renderComponentProperties();

    let div = TestUtils.findRenderedDOMComponentWithClass(
      ComponentProperties, 'component-properties'
    );

    expect(div).toBeTruthy();

  });

});

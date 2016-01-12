import React from 'react/addons';
import ReactAttelier from '../lib/react-attelier.jsx';

describe('ReactAttelier', function() {
  var component;

  beforeEach(function() {
    component = React.addons.TestUtils.renderIntoDocument(
      <ReactAttelier/>
    );
  });

  it('should render', function() {
    expect(component.getDOMNode().className).toEqual('react-attelier');
  });
});

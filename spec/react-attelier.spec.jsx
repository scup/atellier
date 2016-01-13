import React from 'react/addons';
import ReactAttelier from '../lib/Attelier.jsx';

describe('ReactAttelier', function() {
  var component;

  beforeEach(function() {
    component = React.addons.TestUtils.renderIntoDocument(
      <ReactAttelier/>
    );
  });

  it('should render', function() {
    expect(true).toEqual(true);
  });
});

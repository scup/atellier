import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import Attelier from '../lib/Attelier.jsx';

describe('Attelier', () => {

  it('should render', function() {

    let attelier = ReactTestUtils.renderIntoDocument(
      <Attelier />
    );

    var div = ReactTestUtils.findRenderedDOMComponentWithClass(
      attelier, 'attelier flex-container'
    );

    expect(div).toBeTruthy();
  });
});

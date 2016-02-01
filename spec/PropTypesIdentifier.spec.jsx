import { PropTypes } from 'react';
import PropTypesIdentifier from '../lib/structural/PropTypesIdentifier.jsx';

describe('PropTypesIdentifier', () => {

  it('should identifier proptype', () => {
    PropTypesIdentifier
      .create(PropTypes)
      .identify();

    expect(PropTypes.string.type).toBe('string');
  });

  it('should intercept oneOf proptype', () => {
    PropTypesIdentifier
      .create(PropTypes)
      .intercept(PropTypes.oneOf);

    let args = ['gato', 'cachorro', 'coelho'];
    let proptype = PropTypes.oneOf(args);

    expect(proptype.type).toBe('oneOf');
    expect(proptype.options).toBe(args);
  });

});

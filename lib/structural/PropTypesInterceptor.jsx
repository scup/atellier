import { PropTypes } from 'react';

class PropTypesInterceptor {

}

export default {
  intercept: (propType) => {
    switch(propType) {
      case PropTypes.string:
        console.log('é string');
        break;
      case PropTypes.number:
        console.log('é number');
        break;
      case PropTypes.array:
        console.log('é array');
        break;
      case PropTypes.array:
        console.log('é array');
        break;
      default:
        console.log('Não conheço...');
    }
  }
};

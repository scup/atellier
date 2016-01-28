import { PropTypes } from 'react';

class PropTypesInterceptor {

}

export default {

  getPropTypePatch(propType){

    if (propType === React.PropTypes.string) {
      return 'string';
    } else if (propType === React.PropTypes.bool) {
      return 'bool';
    } else if (propType === React.PropTypes.array) {
      return 'array';
    } else if (propType === React.PropTypes.number) {
      return 'number';
    } else if (propType === React.PropTypes.object) {
      return 'object';
    } else if (propType === React.PropTypes.element) {
      return 'element';
    } else if (propType === React.PropTypes.func) {
      return 'func';
    } else if (propType.type === 'oneOf') {
      return 'oneOf';
    } else {
      return 'unknown';
    }
  },

  intercept: (propType) => {
    switch(propType) {
      case PropTypes.oneOf:
        React.PropTypes.oneOf_ = React.PropTypes.oneOf
        return React.PropTypes.oneOf = function(oneOfArguments){

          function y(propTypeArguments){
            let x = React.PropTypes.oneOf_;
            x = x(oneOfArguments)(propTypeArguments)

              if (!y.options)
                y.options = {};
              y.options[arguments[1]] = oneOfArguments;
              y.type = "oneOf"

            return x

          }
          return y
        }

        break;
      default:
        console.log('Não conheço...');
    }
  }
};

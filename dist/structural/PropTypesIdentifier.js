'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PropTypesIdentifier = function () {
  function PropTypesIdentifier(propTypes) {
    _classCallCheck(this, PropTypesIdentifier);

    this.propTypes = propTypes;
  }

  _createClass(PropTypesIdentifier, [{
    key: 'identify',
    value: function identify() {
      for (var proptype in this.propTypes) {
        this.propTypes[proptype].type = proptype;
        if (this.propTypes[proptype].isRequired) {
          this.propTypes[proptype].isRequired.type = proptype;
        }
      }
      return this;
    }
  }, {
    key: 'intercept',
    value: function intercept(proptype) {
      var _this = this;

      if (proptype === this.propTypes.oneOf) {
        (function () {
          var _oneOf = _this.propTypes.oneOf;
          _this.propTypes.oneOf = function (oneOfArguments) {
            var proptypeFunc = _this._getInterceptFunc(_oneOf, oneOfArguments);
            proptypeFunc.type = 'oneOf';
            proptypeFunc.options = oneOfArguments;
            return proptypeFunc;
          };
        })();
      }

      return this;
    }
  }, {
    key: '_getInterceptFunc',
    value: function _getInterceptFunc(func, args) {
      return function (proptypeArguments) {
        var instance = func(args)(proptypeArguments);
        return instance;
      };
    }
  }], [{
    key: 'create',
    value: function create(propTypes) {
      return new this(propTypes);
    }
  }]);

  return PropTypesIdentifier;
}();

exports.default = PropTypesIdentifier;
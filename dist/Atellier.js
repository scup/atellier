'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _PropTypesIdentifier = require('./structural/PropTypesIdentifier');

var _PropTypesIdentifier2 = _interopRequireDefault(_PropTypesIdentifier);

require('./styles/atellier.less');

var _Sidebar = require('./Sidebar');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Workspace = require('./Workspace');

var _Workspace2 = _interopRequireDefault(_Workspace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_PropTypesIdentifier2.default.create(_react.PropTypes).intercept(_react.PropTypes.oneOf).identify();

var Atellier = function (_React$Component) {
  _inherits(Atellier, _React$Component);

  function Atellier(props) {
    _classCallCheck(this, Atellier);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Atellier).call(this, props));

    _this._handleSelectComponent = function (component, key) {
      component.indexKey = key;
      _this.setState({ stagedComponent: component });
    };

    _this.state = {
      components: _immutable2.default.List(props.components),
      stagedComponent: null
    };
    return _this;
  }

  _createClass(Atellier, [{
    key: 'render',
    value: function render() {
      var _state = this.state;
      var components = _state.components;
      var stagedComponent = _state.stagedComponent;

      return _react2.default.createElement(
        'div',
        { className: 'atellier' },
        _react2.default.createElement(_Sidebar2.default, { components: components, stagedComponent: stagedComponent, onSelect: this._handleSelectComponent }),
        _react2.default.createElement(_Workspace2.default, { components: components, component: stagedComponent, onCloseProperties: this._handleSelectComponent })
      );
    }
  }]);

  return Atellier;
}(_react2.default.Component);

Atellier.defaultProps = {
  components: []
};

Atellier.propTypes = {
  components: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    component: _react.PropTypes.func,
    componentName: _react.PropTypes.string
  }))
};

// commonjs2
exports.default = Atellier;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _ComponentProperties = require('./ComponentProperties');

var _ComponentProperties2 = _interopRequireDefault(_ComponentProperties);

var _Stage = require('./Stage');

var _Stage2 = _interopRequireDefault(_Stage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Workspace = function (_React$Component) {
  _inherits(Workspace, _React$Component);

  function Workspace(props) {
    _classCallCheck(this, Workspace);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Workspace).call(this, props));

    _this._handleChangeProps = function (properties) {
      _this.setState({ componentProps: properties });
    };

    _this.state = {
      componentProps: {}
    };
    return _this;
  }

  _createClass(Workspace, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var components = _props.components;
      var component = _props.component;
      var onCloseProperties = _props.onCloseProperties;
      var componentProps = this.state.componentProps;

      return !!component && _react2.default.createElement(
        'div',
        { className: 'workspace' },
        _react2.default.createElement(_ComponentProperties2.default, {
          components: components,
          component: component,
          componentProps: componentProps,
          onChangeProps: this._handleChangeProps,
          onCloseProperties: onCloseProperties }),
        _react2.default.createElement(_Stage2.default, {
          component: component,
          properties: componentProps })
      );
    }
  }]);

  return Workspace;
}(_react2.default.Component);

Workspace.propTypes = {
  component: _react.PropTypes.shape({
    component: _react.PropTypes.func,
    componentName: _react.PropTypes.string
  }),
  components: _react.PropTypes.instanceOf(_immutable2.default.List),
  onCloseProperties: _react.PropTypes.func
};
exports.default = Workspace;
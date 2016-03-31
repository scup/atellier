'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _PropertiesContainer = require('./PropertiesContainer');

var _PropertiesContainer2 = _interopRequireDefault(_PropertiesContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Properties = function (_React$Component) {
  _inherits(Properties, _React$Component);

  function Properties(props) {
    _classCallCheck(this, Properties);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Properties).call(this, props));

    _this._handleChangeProps = function (properties) {
      _this.props.onChangeProps(properties);
    };

    return _this;
  }

  _createClass(Properties, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var component = _props.component;
      var componentProps = _props.componentProps;
      var components = _props.components;
      var onCloseProperties = _props.onCloseProperties;

      var element = _react2.default.createElement(component.component);
      return _react2.default.createElement(
        'div',
        { className: 'component-properties' },
        _react2.default.createElement(_PropertiesContainer2.default, {
          name: component.componentName,
          element: element,
          elementProps: componentProps,
          components: components,
          onChangeProps: this._handleChangeProps,
          onCloseProperties: onCloseProperties
        })
      );
    }
  }]);

  return Properties;
}(_react2.default.Component);

Properties.propTypes = {
  component: _react.PropTypes.shape({
    component: _react.PropTypes.func,
    componentName: _react.PropTypes.string
  }),
  componentProps: _react.PropTypes.object,
  components: _react.PropTypes.instanceOf(_immutable2.default.List),
  onChangeProps: _react.PropTypes.func,
  onCloseProperties: _react.PropTypes.func
};
exports.default = Properties;
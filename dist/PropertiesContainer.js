'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FieldType = require('./FieldType');

var _FieldType2 = _interopRequireDefault(_FieldType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropertiesContainer = function (_React$Component) {
  _inherits(PropertiesContainer, _React$Component);

  // componentProps: PropTypes.object

  function PropertiesContainer(props) {
    _classCallCheck(this, PropertiesContainer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PropertiesContainer).call(this, props));

    _initialiseProps.call(_this);

    if (props) {
      _this._defineProperties(props);
    }
    return _this;
  }

  _createClass(PropertiesContainer, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this._defineProperties(nextProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var name = _props.name;
      var element = _props.element;


      if (element && element.type && _typeof(element.type.propTypes) !== 'object') {
        return null;
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'properties-container' },
          this._renderContainerHeader(name),
          _react2.default.createElement(
            'div',
            { className: 'properties-form' },
            this._renderPropertiesFields(element)
          )
        )
      );
    }
  }, {
    key: '_renderContainerHeader',
    value: function _renderContainerHeader(name) {
      return !!name && _react2.default.createElement(
        'div',
        { className: 'container-header' },
        _react2.default.createElement(
          'a',
          { className: 'container-close-button', onClick: this._handleCloseProperties },
          '+'
        ),
        _react2.default.createElement(
          'h2',
          { className: 'properties-component' },
          name
        )
      );
    }
  }, {
    key: '_renderPropertiesFields',
    value: function _renderPropertiesFields(element) {
      var propTypes = element && element.type.propTypes;
      var propsFields = [];

      for (var prop in propTypes) {
        var proptype = propTypes[prop];
        propsFields.push(_react2.default.createElement(_FieldType2.default, {
          key: prop,
          name: prop,
          type: proptype.type,
          defaultValue: this._properties[prop],
          options: proptype.options,
          components: this.props.components,
          onChange: this._handleChange
        }));
      }

      return propsFields.length && propsFields || this._renderNoProperties();
    }
  }, {
    key: '_renderNoProperties',
    value: function _renderNoProperties() {
      return _react2.default.createElement(
        'p',
        { className: 'no-properties' },
        'No properties'
      );
    }
  }]);

  return PropertiesContainer;
}(_react2.default.Component);

PropertiesContainer.defaultProps = {
  type: function type() {},
  propTypes: {},
  defaultProps: {}
};
PropertiesContainer.propTypes = {
  // onChangeProps: PropTypes.func,
  // onCloseProperties: PropTypes.func,
  element: _react.PropTypes.shape({
    type: _react.PropTypes.func,
    propTypes: _react.PropTypes.object,
    defaultProps: _react.PropTypes.object
  }) };

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._handleChange = function (propName, propValue) {
    _this2._properties[propName] = propValue;
    _this2.props.onChangeProps(_this2._properties);
  };

  this._handleCloseProperties = function () {
    return _this2.props.onCloseProperties && _this2.props.onCloseProperties(null);
  };

  this._defineProperties = function (props) {
    if (props.element.type) {
      Object.keys(props.element.type.propTypes).filter(function (prop) {
        if (props.element.type.defaultProps && !props.element.type.defaultProps[prop]) {
          props.element.type.defaultProps[prop] = null;
        }
      });
    }
    _this2._properties = _extends({}, props.element.props, props.elementProps);
  };
};

exports.default = PropertiesContainer;
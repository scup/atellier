'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAce = require('react-ace');

var _reactAce2 = _interopRequireDefault(_reactAce);

var _jsBeautify = require('js-beautify');

var _jsBeautify2 = _interopRequireDefault(_jsBeautify);

var _PropertiesContainer = require('./PropertiesContainer');

var _PropertiesContainer2 = _interopRequireDefault(_PropertiesContainer);

var _Toggle = require('./Toggle');

var _Toggle2 = _interopRequireDefault(_Toggle);

require('brace/mode/javascript');

require('brace/mode/json');

require('brace/theme/twilight');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FieldType = function (_React$Component) {
  _inherits(FieldType, _React$Component);

  // name: '',
  // type: 'string',
  // defaultValue: null,
  // onChange: PropTypes.func

  function FieldType(props) {
    _classCallCheck(this, FieldType);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FieldType).call(this, props));

    _this._handleChange = function (response) {
      var value = response;
      if (response.target) {
        value = response.target.type === 'number' && +response.target.value || response.target.value;
      }
      _this.props.onChange(_this.props.name, value);
    };

    _this._handleElementChange = function (response) {
      var component = _this.props.components.get(response.target.value);
      var element = _react2.default.createElement(component.component);
      _this.props.onChange(_this.props.name, element);
    };

    _this._handleElementChangeProps = function (properties) {
      var _this$props = _this.props;
      var name = _this$props.name;
      var defaultValue = _this$props.defaultValue;

      var element = _react2.default.cloneElement(defaultValue, properties);
      _this.props.onChange(_this.props.name, element);
    };

    _this._handleObjectChange = function (response) {
      _this.setState({ defaultValue: response }, function () {
        try {
          _this.props.onChange(_this.props.name, JSON.parse(response));
        } catch (e) {
          console.error(e);
        }
      });
    };

    _this._handleFunctionChange = function (response) {
      _this.setState({ defaultValue: response }, function () {
        try {
          _this.props.onChange(_this.props.name, new Function('return ' + response + ';')());
        } catch (e) {
          console.error(e);
        };
      });
    };

    _this._renderTypeHandlers = {
      string: _this._renderStringInput,
      number: _this._renderNumberInput,
      bool: _this._renderBoolInput,
      array: _this._renderObjectInput,
      object: _this._renderObjectInput,
      oneOf: _this._renderOneOf,
      element: _this._renderElement,
      func: _this._renderFunction
    };

    _this.state = {
      defaultValue: _this._getDefaultValue(props)
    };
    return _this;
  }
  // defaultValue: PropTypes.any,
  // name: PropTypes.string,
  // onChange: PropTypes.func,
  // type: PropTypes.string.isRequired,
  // options: PropTypes.any


  _createClass(FieldType, [{
    key: 'render',
    value: function render() {
      var renderComponent = _typeof(this.props.type) && this._renderTypeHandlers[this.props.type] || this._renderStringInput;
      return renderComponent.call(this, this.props);
    }
  }, {
    key: '_renderStringInput',
    value: function _renderStringInput(_ref) {
      var name = _ref.name;
      var type = _ref.type;
      var defaultValue = _ref.defaultValue;

      return _react2.default.createElement(
        'div',
        { className: 'properties-field' },
        _react2.default.createElement(
          'label',
          null,
          name
        ),
        _react2.default.createElement('textarea', { className: 'atellier-input', defaultValue: defaultValue, onChange: this._handleChange })
      );
    }
  }, {
    key: '_renderNumberInput',
    value: function _renderNumberInput(_ref2) {
      var name = _ref2.name;
      var type = _ref2.type;
      var defaultValue = _ref2.defaultValue;

      return _react2.default.createElement(
        'div',
        { className: 'properties-field' },
        _react2.default.createElement(
          'label',
          null,
          name
        ),
        _react2.default.createElement('input', { type: 'number', className: 'atellier-input', defaultValue: defaultValue, onChange: this._handleChange })
      );
    }
  }, {
    key: '_renderBoolInput',
    value: function _renderBoolInput(_ref3) {
      var name = _ref3.name;
      var type = _ref3.type;
      var defaultValue = _ref3.defaultValue;

      return _react2.default.createElement(
        'div',
        { className: 'properties-field' },
        _react2.default.createElement(_Toggle2.default, { defaultValue: defaultValue, onChange: this._handleChange }),
        _react2.default.createElement(
          'label',
          null,
          name
        )
      );
    }
  }, {
    key: '_renderObjectInput',
    value: function _renderObjectInput(_ref4) {
      var name = _ref4.name;
      var type = _ref4.type;
      var defaultValue = _ref4.defaultValue;

      var aceProps = {
        className: 'atellier-editor',
        mode: 'json',
        theme: 'twilight',
        showGutter: false,
        onChange: this._handleObjectChange,
        name: (Date.now() * Math.random() / Math.random()).toString(),
        value: this.state.defaultValue
      };

      return _react2.default.createElement(
        'div',
        { className: 'properties-field' },
        _react2.default.createElement(
          'label',
          null,
          name
        ),
        _react2.default.createElement(_reactAce2.default, aceProps)
      );
    }
  }, {
    key: '_renderFunction',
    value: function _renderFunction(_ref5) {
      var name = _ref5.name;
      var type = _ref5.type;
      var defaultValue = _ref5.defaultValue;

      var aceProps = {
        className: 'atellier-editor',
        mode: 'javascript',
        theme: 'twilight',
        showGutter: false,
        onChange: this._handleFunctionChange,
        name: (Date.now() * Math.random() / Math.random()).toString(),
        value: this.state.defaultValue
      };

      return _react2.default.createElement(
        'div',
        { className: 'properties-field' },
        _react2.default.createElement(
          'label',
          null,
          name
        ),
        _react2.default.createElement(_reactAce2.default, aceProps)
      );
    }
  }, {
    key: '_renderOneOf',
    value: function _renderOneOf(_ref6) {
      var name = _ref6.name;
      var type = _ref6.type;
      var defaultValue = _ref6.defaultValue;
      var options = _ref6.options;

      var selectOptions = options.map(function (item, index) {
        return _react2.default.createElement(
          'option',
          { key: index, value: item },
          item
        );
      });
      return _react2.default.createElement(
        'div',
        { className: 'properties-field' },
        _react2.default.createElement(
          'label',
          null,
          name
        ),
        _react2.default.createElement(
          'select',
          { className: 'atellier-input', onChange: this._handleChange, defaultValue: defaultValue },
          _react2.default.createElement(
            'option',
            null,
            'Nothing selected'
          ),
          selectOptions
        )
      );
    }
  }, {
    key: '_renderElement',
    value: function _renderElement(_ref7) {
      var name = _ref7.name;
      var type = _ref7.type;
      var defaultValue = _ref7.defaultValue;
      var components = _ref7.components;

      var containerProps = void 0;
      var selectComponents = components.map(function (item, index) {
        return _react2.default.createElement(
          'option',
          { key: index, value: index },
          item.componentName
        );
      });

      if (defaultValue) {
        containerProps = _react2.default.createElement(_PropertiesContainer2.default, {
          element: defaultValue,
          components: this.props.components,
          onChangeProps: this._handleElementChangeProps
        });
      }
      return _react2.default.createElement(
        'div',
        { className: 'properties-field' },
        _react2.default.createElement(
          'label',
          null,
          name
        ),
        _react2.default.createElement(
          'select',
          { className: 'atellier-input', onChange: this._handleElementChange },
          _react2.default.createElement(
            'option',
            null,
            'Nothing selected'
          ),
          selectComponents
        ),
        containerProps
      );
    }
  }, {
    key: '_getDefaultValue',
    value: function _getDefaultValue(props) {
      switch (props.type) {
        case 'array':
        case 'object':
          return JSON.stringify(props.defaultValue, null, 2);
        case 'func':
          return (0, _jsBeautify2.default)(props.defaultValue && props.defaultValue.toString() || 'function() { return; }');
        default:
          return props.defaultValue;
      };
    }
  }]);

  return FieldType;
}(_react2.default.Component);

FieldType.propTypes = {};
FieldType.defaultProps = {};
exports.default = FieldType;
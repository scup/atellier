'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stage = function (_React$Component) {
  _inherits(Stage, _React$Component);

  function Stage(props) {
    _classCallCheck(this, Stage);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Stage).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      constrast: false,
      componentError: null,
      reloadNeeded: false
    };
    _this._defineElement(props);
    return _this;
  }

  _createClass(Stage, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this._defineElement(nextProps);
    }
  }, {
    key: '_renderComponent',
    value: function _renderComponent() {
      var _props = this.props;
      var component = _props.component;
      var properties = _props.properties;

      var targetRender = document.getElementById('__stage_render__');
      try {
        _reactDom2.default.render(_react2.default.createElement(
          'div',
          { className: 'stage' },
          this._renderStageBoard(),
          ',',
          this._renderStageTools()
        ), targetRender);
      } catch (error) {
        targetRender.innerHTML = '';
        _reactDom2.default.render(_react2.default.createElement(
          'div',
          { className: 'stage' },
          this._renderErrorAlert(error)
        ), targetRender);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { id: '__stage_render__', className: 'stage' });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._renderComponent();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._renderComponent();
    }
  }, {
    key: '_renderStageBoard',
    value: function _renderStageBoard() {
      var className = (0, _classnames2.default)('stage-board', { 'stage-board-dark': this.state.constrast });
      return _react2.default.createElement(
        'div',
        { className: className },
        this._instance
      );
    }
  }, {
    key: '_renderErrorAlert',
    value: function _renderErrorAlert(error) {
      this._setInvalidComponent(this.props.component);
      return _react2.default.createElement(
        'div',
        { className: 'stage-render-error' },
        _react2.default.createElement(
          'button',
          { onClick: this.onReloadAtellier, className: 'reload' },
          'Reload'
        ),
        _react2.default.createElement(
          'span',
          { className: 'stage-error-text' },
          'React component ',
          _react2.default.createElement(
            'b',
            null,
            this.state.componentError,
            ' '
          ),
          ' crashed!'
        ),
        _react2.default.createElement(
          'div',
          { className: 'stage-error-message' },
          error.message
        )
      );
    }
  }, {
    key: '_setInvalidComponent',
    value: function _setInvalidComponent(component) {
      var componentName = component.componentName,
          indexKey = component.indexKey;

      var invalidComponents = JSON.parse(localStorage.getItem('invalidComponents')) || [];

      var exists = invalidComponents.filter(function (item) {
        return item.componentName === componentName && item.indexKey === indexKey;
      });

      if (!exists.length && !this.state.reloadNeeded) {
        this.setState({
          reloadNeeded: true
        });
        invalidComponents.push({
          indexKey: indexKey,
          componentName: componentName
        });
      } else if (exists.length && !this.state.reloadNeeded) {
        this.setState({
          reloadNeeded: true
        });
      }

      localStorage.setItem('invalidComponents', JSON.stringify(invalidComponents));
    }
  }, {
    key: '_renderStageTools',
    value: function _renderStageTools() {
      return _react2.default.createElement(
        'div',
        { className: 'stage-tools' },
        _react2.default.createElement(
          'label',
          null,
          'Stage color'
        ),
        _react2.default.createElement(
          'select',
          { className: 'atellier-input', onChange: this._handleChangeConstrast },
          _react2.default.createElement(
            'option',
            { value: 'false' },
            'Light'
          ),
          _react2.default.createElement(
            'option',
            { value: 'true' },
            'Dark'
          )
        )
      );
    }
  }]);

  return Stage;
}(_react2.default.Component);

Stage.defaultProps = {
  component: {},
  properties: {}
};
Stage.propTypes = {
  component: _react.PropTypes.shape({
    component: _react.PropTypes.func,
    componentName: _react.PropTypes.string
  }),
  properties: _react.PropTypes.object
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onReloadAtellier = function () {
    window.location.reload();
  };

  this._handleChangeConstrast = function (event) {
    _this2.setState({
      constrast: event.target.value === 'true'
    });
  };

  this._defineElement = function (props) {
    var component = props.component;
    var properties = props.properties;

    if (component && component.component) {
      _this2._instance = _react2.default.cloneElement(_react2.default.createElement(component.component, properties));
    }
  };
};

exports.default = Stage;
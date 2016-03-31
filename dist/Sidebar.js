'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ComponentList = require('./ComponentList');

var _ComponentList2 = _interopRequireDefault(_ComponentList);

var _arrow = require('./images/arrow.png');

var _arrow2 = _interopRequireDefault(_arrow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sidebar = function (_React$Component) {
  _inherits(Sidebar, _React$Component);

  function Sidebar(props) {
    _classCallCheck(this, Sidebar);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Sidebar).call(this, props));

    _this._handleToggleSidebar = function () {
      _this.setState({ close: !_this.state.close });
    };

    _this.state = {
      close: false
    };
    return _this;
  }

  _createClass(Sidebar, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var components = _props.components;
      var stagedComponent = _props.stagedComponent;
      var onSelect = _props.onSelect;

      var className = (0, _classnames2.default)('sidebar', { 'sidebar-close': this.state.close });
      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          'h1',
          { className: 'logo' },
          'ATELLIER'
        ),
        _react2.default.createElement(
          'span',
          { className: 'sidebar-toggle-button', onClick: this._handleToggleSidebar },
          _react2.default.createElement('img', { src: _arrow2.default })
        ),
        _react2.default.createElement(_ComponentList2.default, { components: components, stagedComponent: stagedComponent, onSelect: onSelect })
      );
    }
  }]);

  return Sidebar;
}(_react2.default.Component);

Sidebar.defaultProps = {
  components: [],
  onSelect: _react.PropTypes.func,
  stagedComponent: {}
};
Sidebar.propTypes = {
  components: _react.PropTypes.instanceOf(_immutable2.default.List),
  onSelect: _react.PropTypes.func,
  stagedComponent: _react.PropTypes.shape({
    component: _react.PropTypes.func,
    componentName: _react.PropTypes.string
  })
};
exports.default = Sidebar;
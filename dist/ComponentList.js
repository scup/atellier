'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ComponentList = function (_React$Component) {
  _inherits(ComponentList, _React$Component);

  function ComponentList(props) {
    _classCallCheck(this, ComponentList);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ComponentList).call(this, props));

    _this._handleSelectComponentItem = function (component, key) {
      return function () {
        _this.props.onSelect(component, key);
      };
    };

    _this._handleFilterComponents = function (event) {
      _this.setState({ filter: event.target.value });
    };

    _this.state = {
      filter: ''
    };
    return _this;
  }

  _createClass(ComponentList, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'component-nav' },
        _react2.default.createElement(
          'div',
          { className: 'component-tools' },
          _react2.default.createElement('input', { type: 'text',
            className: 'component-filter atellier-input atellier-input-icon',
            placeholder: 'Search components',
            onChange: this._handleFilterComponents })
        ),
        _react2.default.createElement(
          'ul',
          { className: 'component-list' },
          this._renderComponentListItems()
        )
      );
    }
  }, {
    key: '_getInvalidComponents',
    value: function _getInvalidComponents() {
      return JSON.parse(localStorage.getItem('invalidComponents')) || [];
    }
  }, {
    key: '_isInvalidComponent',
    value: function _isInvalidComponent(component, indexKey) {
      var invalidComponents = this._getInvalidComponents();
      var exists = invalidComponents.find(function (item) {
        return item.componentName === component.componentName && item.indexKey === indexKey;
      });
      return !!exists;
    }
  }, {
    key: '_renderComponentListItems',
    value: function _renderComponentListItems() {
      var _this2 = this;

      return this.props.components.filter(function (_ref) {
        var componentName = _ref.componentName;

        return ~componentName.toLowerCase().indexOf(_this2.state.filter.toLowerCase());
      }).map(function (component, key) {
        var className = (0, _classnames2.default)('component-list-item', {
          'component-list-item-error': _this2._isInvalidComponent(component, key),
          'component-list-item-selected': _immutable2.default.is(component, _this2.props.stagedComponent)
        });

        return _react2.default.createElement(
          'li',
          { key: key, className: className, onClick: _this2._handleSelectComponentItem(component, key) },
          component.componentName
        );
      });
    }
  }]);

  return ComponentList;
}(_react2.default.Component);

ComponentList.defaultProps = {
  components: [],
  onSelect: _react.PropTypes.func,
  stagedComponent: {}
};
ComponentList.propTypes = {
  components: _react.PropTypes.instanceOf(_immutable2.default.List),
  onSelect: _react.PropTypes.func,
  stagedComponent: _react.PropTypes.shape({
    component: _react.PropTypes.func,
    componentName: _react.PropTypes.string
  })
};
exports.default = ComponentList;
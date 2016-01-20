import React, { PropTypes } from 'react';
import ContainerCloseButton from './images/x.png';
import FieldType from './FieldType.jsx';
// import PropTypesInterceptor from './structural/PropTypesInterceptor.jsx';

// PropTypes.number = PropTypesInterceptor.intercept(PropTypes.number);
// PropTypes.string = PropTypesInterceptor.intercept(PropTypes.string);

class Properties extends React.Component {

  static defaultProps = {
    component: {}
  };

  static propTypes = {
    onChangeProps: PropTypes.func,
    component: PropTypes.shape({
      component: PropTypes.func,
      componentName: PropTypes.string
    })
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.component) {
      this._element = React.createElement(nextProps.component.component);
    }
  }

  render() {
    return (
      <div className="component-properties">
        {this._renderPropertiesContainer()}
      </div>
    );
  }

  _renderPropertiesContainer() {
    if (!this._element) { return null; }
    return (
      <div className="properties-container">
        <a className="container-close-button">
          <img src={ContainerCloseButton} />
        </a>
        <h2 className="properties-component">
          {this.props.component.componentName}
        </h2>
        <div className="properties-form">
          {this._renderPropertiesFields()}
        </div>
      </div>
    );
  }

  _renderPropertiesFields() {
    let propsFields = [];
    let propTypes = this._element.type.propTypes;
    for (let prop in propTypes) {
      propTypes[prop].type = this._getPropTypePatch(propTypes[prop])
      propsFields.push(
        <FieldType
          key={prop}
          name={prop}
          type={propTypes[prop].type}
          defaultValue={this._element.props[prop]}
          onChange={this._handleChange} />
      );
    }
    return propsFields.length && propsFields || this._renderNoProperties();
  }

  _renderNoProperties() {
    return (
      <p className="no-properties">No properties</p>
    );
  }

  _getPropTypePatch(propType) {
    if (propType === React.PropTypes.string) {
      return 'string'
    } else if (propType === React.PropTypes.bool) {
      return 'bool'
    } else if (propType === React.PropTypes.array) {
      return 'array'
    } else if (propType === React.PropTypes.number) {
      return 'number'
    }
  }

  _handleChange = (propName, propValue) => {
    let properties = Object.assign({}, this._element.props);
    properties[propName] = propValue;
    this.props.onChangeProps(properties);
  };
}

export default Properties;

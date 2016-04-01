import React, { PropTypes } from 'react';
import FieldType from './FieldType';

class SimpleElement extends React.Component {
  render(){
    return (<span />);
  }
}

function getPropTypeName(validate) {
  const types = {
    array: [],
    string: '',
    number: 0,
    bool: true,
    func: () => {},
    object: {},
    element: (<SimpleElement />)
  }
  for (let typeName in types) {
    if ( !validate({name: types[typeName]}, "name") ) {
      return typeName;
    }
  }
  return 'unknown';
}

class PropertiesContainer extends React.Component {

  static defaultProps = {
    type: () => {},
    propTypes: {},
    defaultProps:{}
  };

  static propTypes = {
    // onChangeProps: PropTypes.func,
    // onCloseProperties: PropTypes.func,
    element: PropTypes.shape({
      type: PropTypes.func,
      propTypes: PropTypes.object,
      defaultProps: PropTypes.object
    }),
    // componentProps: PropTypes.object
  };

  constructor(props) {
    super(props);
    if (props) {
      this._defineProperties(props);
    }
  }

  componentWillReceiveProps(nextProps) {
    this._defineProperties(nextProps);
  }

  render() {
    let { name, element } = this.props;

    if ( (element) && element.type && typeof element.type.propTypes !== 'object') {
      return null;
    }

    return (
      <div>
      <div className="properties-container">
        {this._renderContainerHeader(name)}
        <div className="properties-form">
          {this._renderPropertiesFields(element)}
        </div>
      </div>
      </div>
    );
  }

  _renderContainerHeader(name) {
    return !!name && (
      <div className="container-header">
        <a className="container-close-button" onClick={this._handleCloseProperties}>+</a>
        <h2 className="properties-component">{name}</h2>
      </div>
    );
  }

  _renderPropertiesFields(element) {
    let propTypes = element && element.type.propTypes;
    let propsFields = [];
    for (let prop in propTypes) {
      let proptype = propTypes[prop];
      const propTypeName = getPropTypeName(proptype);
      propsFields.push(
        <FieldType
          key={prop}
          name={prop}
          type={propTypeName}
          defaultValue={this._properties[prop]}
          options={proptype.options}
          components={this.props.components}
          onChange={this._handleChange}
         />
      );
    }

    return propsFields.length && propsFields || this._renderNoProperties();
  }

  _renderNoProperties() {
    return (
      <p className="no-properties">No properties</p>
    );
  }

  _handleChange = (propName, propValue) => {
    this._properties[propName] = propValue;
    this.props.onChangeProps(this._properties);
  };

  _handleCloseProperties = () => {
    return this.props.onCloseProperties && this.props.onCloseProperties(null);
  };

  _defineProperties = (props) => {
    if ( props.element.type ) {
      Object.keys(props.element.type.propTypes).filter( function(prop) {
        if ( (props.element.type.defaultProps) && !props.element.type.defaultProps[prop] ) {
          props.element.type.defaultProps[prop] = null;
        }
      });
    }
    this._properties = Object.assign({}, props.element.props, props.elementProps);
  };

}

export default PropertiesContainer;

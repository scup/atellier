import React, { PropTypes } from 'react';
import FieldType from './FieldType.jsx';
import PropTypesInterceptor from './structural/PropTypesInterceptor.jsx';

PropTypesInterceptor.intercept(PropTypes.oneOf)


class Properties extends React.Component {

  static defaultProps = {
    onChangeProps: PropTypes.func,
    onCloseProperties: PropTypes.func,
    component: {},
    componentProps: {}
  };

  static propTypes = {
    onChangeProps: PropTypes.func,
    onCloseProperties: PropTypes.func,
    component: PropTypes.shape({
      component: PropTypes.func,
      componentName: PropTypes.string
    }),
    componentProps: PropTypes.object
  };

  constructor(props) {
    super(props);
    this._properties = {};
    this._defineElement(props);
    this.propsContainer = [];
  }

  componentWillReceiveProps(nextProps) {
    this._defineElement(nextProps);
  }

  recursiva(element){
    if (element.props)
    if (element.props.children){
      console.log(element.props.children,'<<<<<');
        return this.recursiva(element.props.children)
    }
  }

  render() {

    // this.recursiva();
    this.propsContainer = [];
    this._renderPropertiesContainer(this._element)
    this.propsContainer.reverse()
    return (
      <div className="component-properties">
        {this.propsContainer}
      </div>
    );
  }

  _renderPropertiesContainer(element) {    
    if (!element) { return null; }
    this.propsContainer.push(
      <div>
      <div className="properties-container">
        <a className="container-close-button" onClick={this._handleCloseProperties}>+</a>
        <h2 className="properties-component">
          {element.type.displayName || element.type}
        </h2>
        <div className="properties-form">
          {this._renderPropertiesFields(element)}
        </div>
      </div>
      </div>
    );

  }

  _renderPropertiesFields(element) {
    let propsFields = [];
    let propTypes = element.type.propTypes;

    for (let prop in propTypes) {
      propTypes[prop].type = PropTypesInterceptor.getPropTypePatch(propTypes[prop]);



      let options = [];
      if (propTypes[prop].options)
        if (propTypes[prop].options[prop])
          options = propTypes[prop].options[prop];

      propsFields.push(
        <FieldType
          key={prop}
          name={prop}
          components={this.props.components}
          type={propTypes[prop].type}
          defaultValue={this._properties[prop]}
          options={options}
          onChange={this._handleChange} />
      );

      if (propTypes[prop].type === 'element'){
        console.log(element.type.displayName)
        this._renderPropertiesContainer(element.props[prop])
      }

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
    this.props.onCloseProperties(null);
  };

  _defineElement = (props) => {
    if (props.component && props.component.component) {
      this._element = React.createElement(props.component.component);
      this._properties = Object.assign({}, this._element.props, props.componentProps);
    }
  };

}

export default Properties;

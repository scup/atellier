import React, { PropTypes } from 'react';
// import ReactDom from 'react-dom';
import FieldType from './FieldType.jsx';
import PropTypesInterceptor from './structural/PropTypesInterceptor.jsx';
import scrollbar from 'perfect-scrollbar';

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
  }

  componentWillReceiveProps(nextProps) {
    this._defineElement(nextProps);
  }

  getContainer() {
    // return ReactDom.findDOMNode(this.refs.propertiesContainer)
    return document.getElementsByClassName('component-properties')[0];
  }

  componentDidMount() {
    scrollbar.initialize(this.getContainer());
  }

  componentDidUpdate() {
    scrollbar.update(this.getContainer());
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
      <div>
      <div ref="propertiesContainer" className="properties-container">
        <a className="container-close-button" onClick={this._handleCloseProperties}>+</a>
        <h2 className="properties-component">
          {this.props.component.componentName}
        </h2>
        <div className="properties-form">
          {this._renderPropertiesFields()}
        </div>
      </div>
      </div>
    );
  }

  _renderPropertiesFields() {
    let propsFields = [];
    let propTypes = this._element.type.propTypes;

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

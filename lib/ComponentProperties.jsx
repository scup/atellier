import React, { PropTypes } from 'react';
import FieldType from './FieldType.jsx';
import PropTypesInterceptor from './structural/PropTypesInterceptor.jsx';

PropTypes.number = PropTypesInterceptor.intercept(PropTypes.number);
PropTypes.string = PropTypesInterceptor.intercept(PropTypes.string);

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

    // if (!this.state.properties) { return null; }
    // let { componentName } = this.props.component;
    // let propsFields = [];
    // for (let prop in this._element.type.propTypes) {
    //   this._element.type.propTypes[prop].type = this.getPropTypePatch(this._element.type.propTypes[prop])
    //   let params = this._element.type.propTypes[prop];
    //   propsFields.push(
    //     <FieldType
    //       key={prop}
    //       name={prop}
    //       type={params.type}
    //       defaultValue={this.state.properties[prop]}
    //       onChange={this.handleChange} />
    //   );
    // }
    //
    // return (
    //   <div className="component-properties">
    //     <div className="properties-form">
    //       <h2>{componentName}</h2>
    //       {propsFields}
    //     </div>
    //   </div>
    // );
  }

  _renderPropertiesContainer() {
    if (!this._element) { return null; }
    return (
      <div className="properties-container">
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
    return null;
  }

  getPropTypePatch(propType) {
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

  handleChange = (propName, propValue) => {
    let properties = Object.assign({}, this.state.properties);
    properties[propName] = propValue;
    this.setState({
      properties: properties
    });
    this.props.onChangeProps(properties);
  };
}

export default Properties;

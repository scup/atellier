import React, { PropTypes } from 'react';
import FieldType from './FieldType.jsx';
import PropTypesInterceptor from './structural/PropTypesInterceptor.jsx';

import './ComponentProperties.less';

PropTypes.number = PropTypesInterceptor.intercept(PropTypes.number);
PropTypes.string = PropTypesInterceptor.intercept(PropTypes.string);

class Properties extends React.Component {

  static propTypes = {
    component: PropTypes.object,
    onChangeProps: PropTypes.func
  };

  constructor(props) {
    super(props);
    let { component } = props.component;
    this._element = React.createElement(component);

    this.state = {
      properties: this._getPropsFromComponent()
    }
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

  render() {
    let { componentName } = this.props.component;
    let propsFields = [];
    for (let prop in this._element.type.propTypes) {
      this._element.type.propTypes[prop].type = this.getPropTypePatch(this._element.type.propTypes[prop])
      let params = this._element.type.propTypes[prop];
      propsFields.push(
        <FieldType
          key={prop}
          name={prop}
          type={params.type}
          defaultValue={this.state.properties[prop]}
          onChange={this.handleChange} />
      );
    }

    return (
      <div className="attelier-properties flex-item">
        <h2>{componentName}</h2>
        {propsFields}
      </div>
    );
  }

  _getPropsFromComponent(){
    return this._element.props;
  }

  handleChange = (propName, propValue) => {
    let properties = Object.assign({}, this.state.properties);
    properties[propName] = propValue;
    this.setState({
      properties: properties
    });
    this.props.onChangeProps(properties);
  }
}

export default Properties;

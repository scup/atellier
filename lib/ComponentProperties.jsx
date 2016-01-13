import React, { PropTypes } from 'react';
import FieldType from './FieldType.jsx';

import './ComponentProperties.less';

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

  render() {
    let { componentName } = this.props.component;

    let propsFields = [];
    for (let prop in this.state.properties ) {
      let defaultValue = this.state.properties[prop];
      console.log('this._element: ', this._element.type.propTypes);
      propsFields.push(
        <FieldType
          key={prop}
          name={prop}
          onChange={this.handleChange}
          defaultValue={defaultValue} />
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
  };
}

export default Properties;

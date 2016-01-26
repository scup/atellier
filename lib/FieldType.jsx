import React, { PropTypes } from 'react';
import Toggle from './Toggle.jsx';

class FieldType extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.any,
    name: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string.isRequired
  };

  static defaultProps = {
    name: '',
    type: 'string',
    defaultValue: null,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    this._renderTypeHandlers = {
      string: this._renderStringInput,
      number: this._renderNumberInput,
      bool: this._renderBoolInput,
      array: this._renderArrayInput,
      object: this._renderObjectInput
    };
  }

  render() {
    let renderComponent = this._renderTypeHandlers[ this.props.type ] || this._renderText;
    return renderComponent.call(this, this.props);
  }

  _renderStringInput({ name, type, defaultValue }) {
    return (
      <div className="properties-field">
        <label>{name}</label>
        <textarea className="attelier-input" defaultValue={defaultValue} onChange={this._handleChange} />
      </div>
    );
  }

  _renderNumberInput({ name, type, defaultValue }) {
    return (
      <div className="properties-field">
        <label>{name}</label>
        <input type="number" className="attelier-input" defaultValue={defaultValue} onChange={this._handleChange} />
      </div>
    );
  }

  _renderBoolInput({ name, type, defaultValue }) {
    return (
      <div className="properties-field">
        <Toggle defaultValue={defaultValue} onChange={this._handleChange} />
        <label>{name}</label>
      </div>
    );
  }

  _renderArrayInput({ name, type, defaultValue }) {
    return (
      <div className="properties-field"></div>
    );
  }

  _renderObjectInput({ name, type, defaultValue }) {
    return (
      <div className="properties-field"></div>
    );
  }

  _handleChange = ( response ) => {
    let value = response.target && response.target.value || response;
    this.props.onChange(this.props.name, value);
  };

}

export default FieldType;

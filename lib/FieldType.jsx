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

  _renderArrayInput({ type, defaultValue, name }) {
    // let options = (this.props.values || []).map((option, index) => {
    //   console.log(option);
    //   return <option key={index} value={option.value} selected={option.value}>{option.value}</option>;
    // });
    // console.log(options);

    for (var x in this.props.values) {
      console.log(x)
    }

    // return (
    //   <div className="properties-field">
    //     <label>{this.props.name}</label>
    //     <select className="attelier-input" value={defaultValue} onChange={this.handleChange}>
    //       {options}
    //     </select>
    //   </div>
    // );

    // return this._renderText({ type, defaultValue, name });
    return null;
  }

  _renderObjectInput({ type, defaultValue, name }) {
    return null;
  }

  _handleChange = ( response ) => {
    let value = response.target && response.target.value || response;
    this.props.onChange(this.props.name, value);
  };

}

export default FieldType;

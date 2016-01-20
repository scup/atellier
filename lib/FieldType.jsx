import React, { PropTypes } from 'react';
import Toggle from './Toggle.jsx';

class FieldType extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func,
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

  _renderStringInput({ type, defaultValue, name }) {
    return (
      <div className="properties-field">
        <label>{name}</label>
        <textarea className="attelier-input" defaultValue={defaultValue} onChange={this._handleChange} />
      </div>
    );
  }

  _renderNumberInput({ type, defaultValue, name }) {
    return (
      <div className="properties-field">
        <label>{name}</label>
        <input type="number" className="attelier-input" defaultValue={defaultValue} onChange={this._handleChange} />
      </div>
    );
  }

  _renderBoolInput({ type, defaultValue, name }) {
    return (
      <div className="properties-field">
        <Toggle defaultValue={defaultValue} onChange={this._handleChange} />
        <label>{name}</label>
      </div>
    );
  }

  _renderArrayInput({ type, defaultValue, name }) {
    // let options = (this.state.defaultValue || []).map((value, index) => {
    //   return <option key={index} value={value} selected={this.state.defaultValue === value}>{value}</option>;
    // });
    //
    // return (
    //   <div className="fieldtype">
    //     <label>{this.state.name}</label>
    //     <select onChange={this.handleChange}>
    //       {options}
    //     </select>
    //   </div>
    // );

    // TODO: implement
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

import React, { PropTypes } from 'react';

class FieldType extends React.Component {

  static propTypes = {
    defaultValue: React.PropTypes.any,
    onChange: PropTypes.func,
    type: React.PropTypes.string
  };

  static defaultProps = {
    type: 'string',
    defaultValue: null,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.renderTypeHandlers = {
      string: this.renderText,
      number: this.renderNumber,
      bool: this.renderToggle,
      array: this.renderSelect
    };
  }

  render() {
    let props;
    const renderComponent = this.renderTypeHandlers[ this.props.type ] || this.renderText;

    props = Object.assign({}, this.props);
    props.defaultValue = this.cast(this.props.type, this.props.defaultValue);
console.log(props);
    return renderComponent.call(this, props);
  }

  renderText({ type, defaultValue, name }) {
    return (
      <div className="fieldtype">
        <input type="text" placeholder={name} defaultValue={defaultValue} onChange={this.handleChange}/>
      </div>
    );
  }

  renderNumber({ type, defaultValue, name }) {
    return (
      <div className="fieldtype">
        <input type="number" placeholder={name} defaultValue={defaultValue} onChange={this.handleChange}/>
      </div>
    );
  }

  renderToggle({ type, defaultValue, name }) {
    return (
      <div className="fieldtype">
        <label>{name}</label>
        <input type="checkbox" value={'checked'} defaultChecked={defaultValue} onChange={this.handleChange} />
      </div>
    );
  }

  renderSelect({ type, defaultValue, name }) {
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
    return null;
  }

  cast(type, value) {
    return {
      'string': value + '',
      'bool': (value === 'checked'),
      'number': parseInt(value, 10)
    }[type] || value;
  }

  handleChange = ( event ) => {
    return this.props.onChange(this.props.name, this.cast(this.props.type, event.target.value));
  }
}

export default FieldType;

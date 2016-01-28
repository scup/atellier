import React, { PropTypes } from 'react';
import AceEditor from 'react-ace';
import PropertiesContainer from './PropertiesContainer.jsx';
import Toggle from './Toggle.jsx';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/theme/twilight';

class FieldType extends React.Component {

  static propTypes = {
    // defaultValue: PropTypes.any,
    // name: PropTypes.string,
    // onChange: PropTypes.func,
    // type: PropTypes.string.isRequired,
    // options: PropTypes.any
  };

  static defaultProps = {
    // name: '',
    // type: 'string',
    // defaultValue: null,
    // onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    this._renderTypeHandlers = {
      string: this._renderStringInput,
      number: this._renderNumberInput,
      bool: this._renderBoolInput,
      array: this._renderObjectInput,
      object: this._renderObjectInput,
      oneOf: this._renderOneOf,
      element: this._renderElement,
      func: this._renderFunction,
    };
  }

  render() {
    let renderComponent = (typeof this.props.type && this._renderTypeHandlers[ this.props.type ]) || this._renderText;
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

  _renderObjectInput({ name, type, defaultValue }) {
    if (typeof defaultValue === 'object'){
      defaultValue = JSON.stringify(defaultValue, null, 2);
    }
    return (
      <div className="properties-field">
      <label>{name}</label>
      <AceEditor
        className="attelier-editor"
        mode="json"
        theme="twilight"
        value={defaultValue}
        showGutter={false}
        onChange={this._handleRaw}
        name={(Date.now()*Math.random()/Math.random()).toString() }
        editorProps={{$blockScrolling: true, $showLineNumbers : false, showLineNumbers : false}} />
      </div>
    );
  };

  _renderFunction({ name, type, defaultValue }) {
    return (
      <div className="properties-field">
        <label>{name}</label>
        <textarea className="attelier-input" defaultValue={defaultValue} onChange={this._handleFunctionChange} />
      </div>
    );
  }

  _renderOneOf({ name, type, defaultValue, options }) {
    let selectOptions = options.map((item, index) => {
      return (<option key={index} value={item}>{item}</option>);
    });
    return (
      <div className="properties-field">
        <label>{name}</label>
        <select className="attelier-input" onChange={this._handleChange} >
          {selectOptions}
        </select>
      </div>
    );
  }

  _renderElement({ name, type, defaultValue, components }) {
    let selectComponents = components.map((item, index) => {
      return <option key={index} value={index}>{item.componentName}</option>
    });

    return (
      <div className="properties-field">
        <label>{name}</label>
        <select className="attelier-input" onChange={this._handleElementChange} >
          {selectComponents}
        </select>
        <PropertiesContainer
          element={defaultValue}
          components={this.props.components}
          onChangeProps={this._handleElementChangeProps}
        />
      </div>
    );
  }

  _handleChange = ( response ) => {
    let value = response;
    if (response.target) {
      value = response.target.type === 'number' && +response.target.value || response.target.value;
    }
    this.props.onChange(this.props.name, value);
  };

  _handleElementChange = (response) => {
    let component = this.props.components.get(response.target.value);
    let element = React.createElement(component.component);
    this.props.onChange(this.props.name, element);
  };

  _handleElementChangeProps = (properties) => {
    let { name, defaultValue } = this.props;
    let element = React.cloneElement(defaultValue, properties);
    this.props.onChange(this.props.name, element);
  };

  _handleObjectChange = (response) => {
    this.refs.rawjs.value = response;
  };

  _handleRaw = (response) => {
    try {
      this.props.onChange(this.props.name, JSON.parse(response));
    } catch(e) {
      this.props.onChange(this.props.name, response);
    }
  };

  _handleFunctionChange = ( response ) => {
    this.props.onChange(this.props.name, (new Function('return ('+response.target.value+')(arguments)')).bind(this.props.instance) );
  };

}

export default FieldType;

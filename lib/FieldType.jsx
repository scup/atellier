import React, { PropTypes } from 'react';
import Toggle from './Toggle.jsx';

import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/twilight';



class FieldType extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.any,
    name: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string.isRequired,
    options: PropTypes.any
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
      array: this._renderObjectInput,
      object: this._renderObjectInput,
      oneOf: this._renderOneOf,
      element: this._renderElement,
      func: this._renderFunction,
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

  _renderFunction({ name, type, defaultValue }) {
    return (
      <div className="properties-field">
        <label>{name}</label>
        <textarea className="attelier-input" defaultValue={defaultValue} onChange={this._handleFunctionChange} />
      </div>
    );
  }

  _renderOneOf({ name, type, defaultValue }) {
    let selectOptions = this.props.options.map(function(item,index){
      return <option key={index} value={item}>{item}</option>
    })
    return (
      <div className="properties-field">
        <label>{name}</label>
        <select className="attelier-input" onChange={this._handleChange} >
          {selectOptions}
        </select>
      </div>
    );
  }

  _renderElement({ name, type, defaultValue }) {

    let selectComponents = this.props.components.map(function(item,index){
      return <option key={index} value={item.component}>{item.componentName}</option>
    })
    return (
      <div className="properties-field">
        <label>{name}</label>
        <select className="attelier-input" onChange={this._handleComponentChange} >
          {selectComponents}
        </select>
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
      defaultValue = JSON.stringify(defaultValue,null,2 )
    }
    let codeEditor = (<AceEditor
              className="code-editor"
              mode="json"
              theme="twilight"
              value={defaultValue}
              showGutter={false}
              onChange={this._handleObjectChange}
              name={(Date.now()*Math.random()/Math.random()).toString() }
              editorProps={{
                $blockScrolling: true,
                $showLineNumbers : false,
                showLineNumbers : false
              }}
            />)
    return (
      <div className="properties-field">
      <label>{name}</label>
      {codeEditor}
      <textarea className="attelier-input" defaultValue={defaultValue} onChange={this._handleObjectChange} />

      </div>
    );
  }



  _handleComponentChange = (response)=>{
    var component = this.props.components.get(response.target.selectedIndex).component
    component = React.createElement(component)

    this.props.onChange(this.props.name, component);
  };

  _handleObjectChange = ( response ) => {
    this.props.onChange(this.props.name, JSON.parse(response.target.value));
  };

  _handleFunctionChange = ( response ) => {
    this.props.onChange(this.props.name, (new Function('return ('+response.target.value+')(arguments)')).bind(this.props.instance) );
  };

  _handleChange = ( response ) => {
    let value = response;
    if (response.target) {
      value = response.target.type === 'number' && +response.target.value || response.target.value;
    }
    this.props.onChange(this.props.name, value);
  };

}

export default FieldType;

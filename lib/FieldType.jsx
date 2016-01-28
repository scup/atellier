import React, { PropTypes } from 'react';
import PropertiesContainer from './PropertiesContainer.jsx';
import Toggle from './Toggle.jsx';


import AceEditor from 'react-ace';
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

  _renderFunction({ name, type, defaultValue }) {
    return (
      <div className="properties-field">
        <label>{name}</label>
        <textarea className="attelier-input" defaultValue={defaultValue} onChange={this._handleFunctionChange} />
      </div>
    );
  }

  _renderOneOf({ name, type, defaultValue, options }) {
    let selectOptions = options.map(function(item,index){
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
          onChangeProps={this._handleChangeProps}
        />
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
    let codeEditor = (<AceEditor
              className="code-editor"
              mode="json"
              theme="twilight"
              value={defaultValue}
              showGutter={false}
              onChange={this._handleComponentRaw}
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
      </div>
    );
  };

  _handleComponentRaw = (response) => {
    try {
      this.props.onChange(this.props.name, JSON.parse(response));
    } catch(e) {
      this.props.onChange(this.props.name, response);
    }

  };

  _handleChangeProps = (properties) => {
    let { name, defaultValue } = this.props;
    let element = React.cloneElement(defaultValue, properties);
    this.props.onChange(this.props.name, element);
  };

  _handleElementChange = (response) => {
    let element = this.props.components.get(response.target.value);
    this.props.onAddChildElement(this.props.name, element);
  };

  _handleObjectChange = (response) => {
    this.refs.rawjs.value = response;
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

function _onChange(newValue) {
  console.log('change', newValue)
}

export default FieldType;

import React, { PropTypes } from 'react';
import AceEditor from 'react-ace';
import jsbeautifier from 'js-beautify';
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

    this.state = {
      defaultValue: this._getDefaultValue(props)
    };
  }

  render() {
    let renderComponent = (typeof this.props.type && this._renderTypeHandlers[ this.props.type ]) || this._renderStringInput;
    return renderComponent.call(this, this.props);
  }

  _renderStringInput({ name, type, defaultValue }) {
    return (
      <div className="properties-field">
        <label>{name}</label>
        <textarea className="atellier-input" defaultValue={defaultValue} onChange={this._handleChange} />
      </div>
    );
  }

  _renderNumberInput({ name, type, defaultValue }) {
    return (
      <div className="properties-field">
        <label>{name}</label>
        <input type="number" className="atellier-input" defaultValue={defaultValue} onChange={this._handleChange} />
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
    let aceProps = {
      className: 'atellier-editor',
      mode: 'json',
      theme: 'twilight',
      showGutter: false,
      onChange: this._handleObjectChange,
      name: (Date.now()*Math.random()/Math.random()).toString(),
      value: this.state.defaultValue
    };

    return (
      <div className="properties-field">
      <label>{name}</label>
      <AceEditor {...aceProps} />
      </div>
    );
  };

  _renderFunction({ name, type, defaultValue }) {
    let aceProps = {
      className: 'atellier-editor',
      mode: 'javascript',
      theme: 'twilight',
      showGutter: false,
      onChange: this._handleFunctionChange,
      name: (Date.now()*Math.random()/Math.random()).toString(),
      value: this.state.defaultValue
    };

    return (
      <div className="properties-field">
        <label>{name}</label>
        <AceEditor {...aceProps} />
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
        <select className="atellier-input" onChange={this._handleChange} defaultValue={defaultValue}>
          <option>Nothing selected</option>
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
        <select className="atellier-input" onChange={this._handleElementChange}>
          <option>Nothing selected</option>
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

  _getDefaultValue(props) {
    switch(props.type) {
      case 'array':
      case 'object':
        return JSON.stringify(props.defaultValue, null, 2);
      case 'func':
        return jsbeautifier(
            (props.defaultValue && props.defaultValue.toString()) || 'function() { return; }'
          );
      default:
        return props.defaultValue;
    };
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
    this.setState({defaultValue: response}, () => {
      try {
        this.props.onChange(this.props.name, JSON.parse(response));
      } catch(e) {
        console.error(e);
      }
    });
  };

  _handleFunctionChange = (response ) => {
    this.setState({defaultValue: response}, () => {
      try {
        this.props.onChange(this.props.name, new Function(`return ${response};`)());
      } catch(e) {
        console.error(e);
      };
    });
  };

}

export default FieldType;

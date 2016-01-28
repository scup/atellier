import React, { PropTypes } from 'react';
import PropertiesContainer from './PropertiesContainer.jsx';
import PropTypesInterceptor from './structural/PropTypesInterceptor.jsx';

class Properties extends React.Component {

  static defaultProps = {
    // onChangeProps: PropTypes.func,
    // onCloseProperties: PropTypes.func,
    // component: {},
    // componentProps: {}
  };

  static propTypes = {
    // onChangeProps: PropTypes.func,
    // onCloseProperties: PropTypes.func,
    // component: PropTypes.shape({
    //   component: PropTypes.func,
    //   componentName: PropTypes.string
    // }),
    // componentProps: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  recursiva(element){
    if (element.props)
    if (element.props.children){
      console.log(element.props.children,'<<<<<');
        return this.recursiva(element.props.children)
    }
  }

  render() {
    let { component, componentProps, components } = this.props;
    let element = React.createElement(component.component);
    return (
      <div className="component-properties">
        <PropertiesContainer
          name={component.componentName}
          element={element}
          elementProps={componentProps}
          components={components}
          onChangeProps={this._handleChangeProps}
        />
      </div>
    );

  }

  _handleChangeProps = (properties) => {
    this.props.onChangeProps(properties);
  };

  // _handleAddChildElement = (name, element) => {
  //   element.componentName = name;
  //   this.state.childElements[name] = element;
  //   this.setState({childElements: this.state.childElements});
  //
  //   let properties = Object.assign({}, this.props.componentProps);
  //   properties[name] = React.createElement(element.component);
  //   this.props.onChangeProps(properties);
  // };
  //
  // _handleChangeChildElementProps = (properties, name) => {
  //   properties[name] = React.createElement(this.state.childElements[name].component, properties);
  //   this.props.onChangeProps(properties);
  // };

}

export default Properties;

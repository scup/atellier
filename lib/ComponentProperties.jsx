import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import PropertiesContainer from './PropertiesContainer.jsx';

class Properties extends React.Component {

  static defaultProps = {
    onChangeProps: PropTypes.func,
    onCloseProperties: PropTypes.func,
    component: {},
    componentProps: {}
  };

  static propTypes = {
    onChangeProps: PropTypes.func,
    onCloseProperties: PropTypes.func,
    component: PropTypes.shape({
      component: PropTypes.func,
      componentName: PropTypes.string
    }),
    componentProps: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      childElements: []
    }
  }

  recursiva(element){
    if (element.props)
    if (element.props.children){
      console.log(element.props.children,'<<<<<');
        return this.recursiva(element.props.children)
    }
  }

  render() {

    // this.recursiva();
    this.propsContainer = [];
    this._renderPropertiesContainer(this._element)
    this.propsContainer.reverse()
    return (
      <div className="component-properties">
        <PropertiesContainer
          components={this.props.components}
          component={this.props.component}
          componentProps={this.props.componentProps}
          onChangeProps={this.props.onChangeProps}
          onAddChildElement={this._handleAddChildElement}
          onCloseProperties={this.props.onCloseProperties} />
        {this._renderChildElementsProperties()}
      </div>
    );

  }

  _renderChildElementsProperties() {
    return this.state.childElements.map((element, index) => {
      return (
        <PropertiesContainer
          key={index}
          components={this.props.components}
          component={element}
          componentProps={this.props.componentProps}
          onChangeProps={this.props.onChangeProps}
          onAddChildElement={this._handleAddChildElement}
          onCloseProperties={this.props.onCloseProperties} />
      );
    });
  }

  _handleAddChildElement = (name, element) => {
    let properties = Object.assign({}, this.props.componentProps);
    properties[name] = React.createElement(element.component);
    this.props.onChangeProps(properties);
  };

}

export default Properties;

import React, { PropTypes } from 'react';
import ComponentProperties from './ComponentProperties.jsx';
import Stage from './Stage.jsx';

class Workspace extends React.Component {

  static defaultProps = {
    onCloseProperties: PropTypes.func,
    component: {}
  };

  static propTypes = {
    onCloseProperties: PropTypes.func,
    component: PropTypes.shape({
      component: PropTypes.func,
      componentName: PropTypes.string
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      componentProps: {}
    };
  }

  render() {
    let { components, component, onCloseProperties } = this.props;
    let { componentProps, childElements } = this.state;
    return !!component && (
      <div className="workspace">
        <ComponentProperties
          components={components}
          component={component}
          componentProps={componentProps}
          childElements={childElements}
          onChangeProps={this._handleChangeProps}
          onAddChildElement={this._handleAddChildElement}
          onCloseProperties={onCloseProperties} />
        <Stage
          component={component}
          properties={componentProps} />
      </div>
    );
  }

  _handleChangeProps = (properties) => {
    this.setState({componentProps: properties});
  };
}

export default Workspace;

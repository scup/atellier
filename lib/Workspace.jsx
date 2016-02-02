import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import ComponentProperties from './ComponentProperties.jsx';
import Stage from './Stage.jsx';

class Workspace extends React.Component {

  static defaultProps = {
    onCloseProperties: PropTypes.func,
    component: {},
    components: Immutable.List([])
  };

  static propTypes = {
    onCloseProperties: PropTypes.func,
    component: PropTypes.shape({
      component: PropTypes.func,
      componentName: PropTypes.string
    }),
    components: PropTypes.instanceOf(Immutable.List)
  };

  constructor(props) {
    super(props);
    this.state = {
      componentProps: {}
    };
  }

  render() {
    let { components, component, onCloseProperties } = this.props;
    let { componentProps } = this.state;
    return !!component && (
      <div className="workspace">
        <ComponentProperties
          components={components}
          component={component}
          componentProps={componentProps}
          onChangeProps={this._handleChangeProps}
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
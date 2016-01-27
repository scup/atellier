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
    let { component, onCloseProperties } = this.props;
    let { componentProps } = this.state;
    return !!component && (
      <div className="workspace">
        <ComponentProperties  components={this.props.components} component={component} componentProps={componentProps} onChangeProps={this._onChangeProps} onCloseProperties={onCloseProperties} />
        <Stage component={component} properties={componentProps} />
      </div>
    );
  }

  _onChangeProps = (properties) => {
    this.setState({componentProps: properties});
  };
}

export default Workspace;

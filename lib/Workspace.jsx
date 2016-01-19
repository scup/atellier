import React, { PropTypes } from 'react';
import ComponentProperties from './ComponentProperties.jsx';
import Stage from './Stage.jsx';

class Workspace extends React.Component {

  static defaultProps = {
    component: []
  };

  static propTypes = {
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
    let { component } = this.props;
    let { componentProps } = this.state;
    return (
      <div className="workspace">
        <ComponentProperties component={component} onChangeProps={this.onChangeProps} />
        <Stage component={component} properties={componentProps} />
      </div>
    );
  }

  onChangeProps = (properties) => {
    this.setState({componentProps: properties});
  };
}

export default Workspace;

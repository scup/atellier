import React, { PropTypes } from 'react';
import Sidebar from './Sidebar.jsx';
import Workspace from './Workspace.jsx';
import './styles/attelier.less';

class Attelier extends React.Component {

  static defaultProps = {
    components: []
  };

  static propTypes = {
    components: PropTypes.arrayOf(PropTypes.shape({
      component: PropTypes.func,
      componentName: PropTypes.string
    }))
  };

  constructor(props) {
    super(props);
    this.state = {
      components: [],
      stagedComponent: null
    };
  }

  render() {
    return (
      <div className="attelier">
        <Sidebar components={this.props.components} onSelect={this.onSelectComponent} />
        <Workspace component={this.state.stagedComponent} />
      </div>
    );
  }

  onSelectComponent = (component) => {    
    this.setState({stagedComponent: component});
  };
}

export default Attelier;

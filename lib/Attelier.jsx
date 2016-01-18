import React, { PropTypes } from 'react';
import Stage from './Stage.jsx';
import ComponentList from './ComponentList.jsx';
import ComponentProperties from './ComponentProperties.jsx';
import Sidebar from './Sidebar.jsx';
import Workspace from './Workspace.jsx';

import './Attelier.less';

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

  state = {
    components: [],
    stagedComponent: null,
    stagedComponentProps: {}
  };

  constructor(){
    super()
  }

  render() {
    let sidebarContent,
        workspaceContent;

    if (this.state.stagedComponent) {
      sidebarContent = (
        <ComponentProperties component={this.state.stagedComponent} onChangeProps={this.onChangeProps}/>
      );
      workspaceContent = (
        <Stage keys={this.state.keys}
          component={this.state.stagedComponent}
          properties={this.state.stagedComponentProps} />
      );
    } else {
      sidebarContent = (
        <ComponentList
          components={this.props.components}
          onSelect={this.onSelectComponent}/>
      );
    }

    return (
      <div className="attelier flex-container">
        <Sidebar>
          {sidebarContent}
        </Sidebar>
        <Workspace>
          {workspaceContent}
        </Workspace>
      </div>
    );
  }

  onSelectComponent = (component) => {
    this.setState({stagedComponent: component});
  };

  onChangeProps = (properties) => {
    this.setState({stagedComponentProps: properties});
  };
}

export default Attelier;

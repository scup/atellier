import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import Sidebar from './Sidebar.jsx';
import Workspace from './Workspace.jsx';
import './styles/atellier.less';

class Atellier extends React.Component {

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
      components: Immutable.List(props.components),
      stagedComponent: null
    };
  }

  render() {
    let { components, stagedComponent } = this.state;
    return (
      <div className="atellier">
        <Sidebar components={components} stagedComponent={stagedComponent} onSelect={this._handleSelectComponent} />
        <Workspace components={components} component={stagedComponent} onCloseProperties={this._handleSelectComponent} />
      </div>
    );
  }

  _handleSelectComponent = (component) => {
    this.setState({stagedComponent: component});
  };
}

export default Atellier;

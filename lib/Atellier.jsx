import React from 'react';
import Immutable from 'immutable';
import PropTypesIdentifier from './structural/PropTypesIdentifier.jsx';
import Sidebar from './Sidebar.jsx';
import Workspace from './Workspace.jsx';

import './styles/atellier.less';

function defineComponent() {

  let PropTypes = __React__.PropTypes;

  PropTypesIdentifier
    .create(PropTypes)
    .intercept(PropTypes.oneOf)
    .identify();

  return class Atellier extends __React__.Component {

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

    _handleSelectComponent = (component, key) => {
      component.indexKey = key;
      this.setState({stagedComponent: component});
    };
  }
}

// commonjs2
module.exports = function(_react){
  window.__React__ = _react;// global
  return defineComponent();
};

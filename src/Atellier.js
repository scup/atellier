import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import PropTypesIdentifier from './structural/PropTypesIdentifier';
import './styles/atellier.less';
import Sidebar from './Sidebar';
import Workspace from './Workspace';

PropTypesIdentifier
  .create(PropTypes)
  .intercept(PropTypes.oneOf)
  .identify();

class Atellier extends React.Component {
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

Atellier.defaultProps = {
  components: []
};

Atellier.propTypes = {
  components: PropTypes.arrayOf(PropTypes.shape({
    component: PropTypes.func,
    componentName: PropTypes.string
  }))
};


// commonjs2
export default Atellier;

import React, { PropTypes } from 'react';
import ComponentList from './ComponentList.jsx';

class Sidebar extends React.Component {

  static defaultProps = {
    components: []
  };

  static propTypes = {
    onSelect: PropTypes.func,
    components: PropTypes.arrayOf(PropTypes.shape({
      component: PropTypes.func,
      componentName: PropTypes.string
    }))
  };

  render() {    
    let { components, stagedComponent, onSelect } = this.props;
    return (
      <div className="sidebar">
        <h1 className="logo">ATTELIER</h1>
        <ComponentList components={components} onSelect={onSelect} />
      </div>
    );
  }
}

export default Sidebar;

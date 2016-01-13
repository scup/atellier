import React from 'react';

import './Sidebar.less';

class Sidebar extends React.Component {
  render() {
    return (
      <div className="attelier-sidebar flex-item">
        {this.props.children}
      </div>
    );
  }
}

export default Sidebar;

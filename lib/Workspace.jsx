import React from 'react';

// import './Workspace.less';

class Workspace extends React.Component {
  render() {
    return (
      <div className="attelier-workspace flex-item">{this.props.children}</div>
    );
  }
}

export default Workspace;

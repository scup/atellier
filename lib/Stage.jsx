import React from 'react';

import './Stage.less';

class Stage extends React.Component {

  constructor(){
    super();
    this.state = {
      component : false,
      children : null
    }
  }

  render() {
    let component;
    if (this.props.component){
      component = React.createElement(this.props.component, this.state.props, this.props.children)
    }
    return (<div className="stage">{component || 'Sem Componente'}</div>)
  }
}

export default Stage;

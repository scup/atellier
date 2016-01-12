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
    var component
    if (this.state.component){
      component = React.createElement(this.state.component,this.state.props,this.props.children)
    }else{
      component = false
    }
    return (<div className="stage">{component || 'Sem Componente'}</div>)
  }
}

export default Stage;

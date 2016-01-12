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
    let content,
        { component } = this.props.component;
    if (component){
      content = React.createElement(component, this.props.properties, this.props.children)
    }
    return (<div className="stage">{content || 'Sem Componente'}</div>)
  }
}

export default Stage;

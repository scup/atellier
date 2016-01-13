import React from 'react';
import cx from 'classnames';

import './Stage.less';

class Stage extends React.Component {

  constructor(){
    super();
    this.state = {
      component : false,
      children : null,
      contrast: false
    }
  }

  render() {
    let content,
        { component } = this.props.component;
    if (component){
      content = React.createElement(component, this.props.properties, this.props.children)
    }

    let classes = cx('stage', {
      'stage-black': this.state.contrast
    });

    return (
      <div className={classes}>
        <div className="stage-contrast" onClick={this.handleClick}>
          <span></span>
        </div>
        {content || 'Sem Componente'}
      </div>)
  }

  handleClick = () => {
    this.setState({
      contrast: !this.state.contrast
    });
  }
}

export default Stage;

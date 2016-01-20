import React from 'react';
import cx from 'classnames';

class Stage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      component : false,
      children : null,
      contrast: false
    }
  }

  render() {
    return (
      <div className="stage">
        <div className="stage-board"></div>
        <div className="stage-tools"></div>
      </div>
    );
    // let content;
    // let { component } = this.props;
    // if (component && component.component){
    //   content = React.createElement(component.component, this.props.properties, this.props.children)
    // }
    //
    // let classes = cx('stage', {
    //   'stage-black': this.state.contrast
    // });
    //
    // return (
    //   <div className={classes}>
    //     <div className="stage-contrast" onClick={this.handleClick}>
    //       <span></span>
    //     </div>
    //     {content || 'Sem Componente'}
    //   </div>)
  }

  handleClick = () => {
    this.setState({
      contrast: !this.state.contrast
    });
  };
}

export default Stage;

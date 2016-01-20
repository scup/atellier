import React, { PropTypes } from 'react';
import classNames from 'classnames';

class Stage extends React.Component {

  static defaultProps = {
    component: {},
    properties: {}
  };

  static propTypes = {
    component: PropTypes.shape({
      component: PropTypes.func,
      componentName: PropTypes.string
    }),
    properties: PropTypes.object
  };


  constructor(props){
    super(props);
    // this.state = {
    //   component : false,
    //   children : null,
    //   contrast: false
    // }
    this.state = {
      constrast: false
    };
  }

  componentWillReceiveProps(nextProps) {
    let { component, properties } = nextProps;
    if (component) {
      this._element = React.createElement(component.component, properties);
    }
  }

  render() {
    return (
      <div className="stage">
        {this._renderStageBoard()}
        {this._renderStageTools()}
      </div>
    );    
  }

  _renderStageBoard() {
    let className = classNames('stage-board', {'stage-board-dark': this.state.constrast});
    return (
      <div className={className}>
        {this._element}
      </div>
    );
  }

  _renderStageTools() {
    return (
      <div className="stage-tools"></div>
    );
  }

  handleClick = () => {
    this.setState({
      contrast: !this.state.contrast
    });
  };
}

export default Stage;

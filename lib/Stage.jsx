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
    this.state = {
      constrast: false
    };
    this._defineElement(props);
  }

  componentWillReceiveProps(nextProps) {
    this._defineElement(nextProps);
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
      <div className="stage-tools">
        <label>Stage color</label>
        <select onChange={this._handleChangeConstrast}>
          <option value="false">Light</option>
          <option value="true">Dark</option>
        </select>
      </div>
    );
  }

  _handleChangeConstrast = (event) => {
    this.setState({
      constrast: event.target.value === 'true'
    });
  };

  _defineElement = (props) => {
    let { component, properties } = props;
    if (component && component.component) {
      this._element = React.createElement(component.component, properties);
    }
  };
}

export default Stage;

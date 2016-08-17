import React, { PropTypes } from 'react';
import reactdom from 'react-dom';
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
      constrast: false,
      componentError: null,
      reloadNeeded: false
    };
    this._defineElement(props);
  }

  componentWillReceiveProps(nextProps) {
    this._defineElement(nextProps);
  }

  _renderComponent(){
    let { component, properties } = this.props;
    let targetRender = document.getElementById('__stage_render__');
    try {
      reactdom.render(
        <div className="stage">
          {this._renderStageBoard()}
          {this._renderStageTools()}
        </div>,
        targetRender
      );
    } catch(error) {
      targetRender.innerHTML = '';
      reactdom.render(
        <div className="stage">
          {this._renderErrorAlert(error)}
        </div>,
        targetRender
      );
    }
  }

  render() {
    return (
      <div id="__stage_render__" className="stage"></div>
    );
  }

  componentDidMount(){
    this._renderComponent();
  }

  componentDidUpdate(){
    this._renderComponent();
  }

  _renderStageBoard() {
    let className = classNames('stage-board', {'stage-board-dark': this.state.constrast});
    return (
      <div className={className}>
        {this._instance}
      </div>
    );
  }

  onReloadAtellier = () => {
    window.location.reload();
  };

  _renderErrorAlert(error) {
    this._setInvalidComponent( this.props.component );
    return (
      <div className="stage-render-error">
       <button onClick={this.onReloadAtellier} className="reload">Reload</button>
        <span className="stage-error-text">
          React component <b>{this.state.componentError} </b> crashed!
        </span>
        <div className="stage-error-message">{error.message}</div>
      </div>
    );
  }

  _setInvalidComponent(component){
    let componentName = component.componentName,
        indexKey = component.indexKey;

    let invalidComponents = JSON.parse(localStorage.getItem('invalidComponents')) || [];

    let exists = invalidComponents.filter( (item) => {
      return (item.componentName === componentName && item.indexKey === indexKey);
    });

    if ( !exists.length && !this.state.reloadNeeded ) {
      this.setState({
        reloadNeeded: true
      });
      invalidComponents.push({
        indexKey: indexKey,
        componentName: componentName
      });
    } else if(exists.length && !this.state.reloadNeeded) {
      this.setState({
        reloadNeeded: true
      });
    }

    localStorage.setItem('invalidComponents', JSON.stringify(invalidComponents));
  }

  _renderStageTools() {
    return (
      <div className="stage-tools">
        <label>Stage color</label>
        <select className="atellier-input" onChange={this._handleChangeConstrast}>
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
      this._instance = React.cloneElement(React.createElement(component.component, properties))
    }
  };
}

export default Stage;

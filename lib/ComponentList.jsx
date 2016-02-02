import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Immutable from 'immutable';

class ComponentList extends React.Component {

  static defaultProps = {
    components: [],
    onSelect: PropTypes.func,
    stagedComponent: {}
  };

  static propTypes = {
    components: PropTypes.instanceOf(Immutable.List),
    onSelect: PropTypes.func,
    stagedComponent: PropTypes.shape({
      component: PropTypes.func,
      componentName: PropTypes.string
    }),
  };

  constructor(props){
    super(props);
    this.state = {
      filter: ''
    };
  }

  render() {
    return (
      <div className="component-nav">
        <div className="component-tools">
          <input type="text"
            className="component-filter atellier-input atellier-input-icon"
            placeholder="Search components"
            onChange={this._handleFilterComponents} />
        </div>
        <ul className="component-list">
          {this._renderComponentListItems()}
        </ul>
      </div>
    );
  }

  _renderComponentListItems() {
    return this.props.components
      .filter(({componentName}) => {
        return ~componentName.toLowerCase().indexOf(this.state.filter.toLowerCase());
      })
      .map((component, key) => {
        let className = classNames('component-list-item', {
          'component-list-item-selected': Immutable.is(component, this.props.stagedComponent)
        });
        return (
          <li key={key} className={className} onClick={this._handleSelectComponentItem(component)}>
            {component.componentName}
          </li>
        );
      });
  }

  _handleSelectComponentItem = (component) => {
    return () => {
      this.props.onSelect(component);
    };
  };

  _handleFilterComponents = (event) => {
    this.setState({filter: event.target.value});
  };

}

export default ComponentList;

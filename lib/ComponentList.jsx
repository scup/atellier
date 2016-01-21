import React, { PropTypes } from 'react';
import classNames from 'classnames';
import immutable from 'immutable';

class ComponentList extends React.Component {

  static defaultProps = {
    components: []
  };

  static propTypes = {
    onSelect: PropTypes.func,
    components: PropTypes.arrayOf(PropTypes.shape({
      component: PropTypes.func,
      componentName: PropTypes.string
    }))
  };

  constructor(props){
    super(props);
    this.state = {
      filter: '',
      itemSelected: undefined,
      components: immutable.List(props.components)
    };
  }

  render() {
    return (
      <div className="component-nav">
        <div className="component-tools">
          <input type="text"
            className="component-filter attelier-input attelier-input-icon"
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
    return this.state.components
      .filter(({componentName}) => {
        return componentName.toLowerCase().includes(this.state.filter.toLowerCase());
      })
      .map(({componentName, index}) => {
        let className = classNames('component-list-item', {
          'component-list-item-selected': componentName === this.state.itemSelected
        });
        return (
          <li key={`${index}:${componentName}`} className={className} onClick={this._handleSelectComponentItem(componentName)}>
            {componentName}
          </li>
        );
      });
  }

  _handleSelectComponentItem = (componentName) => {
    return () => {
      console.log(componentName);      
      // console.log(this.state.components.get(0);
      // this.props.onSelect(this.props.components[index]);
      // this.setState({ itemSelected: index });
    };
  };

  _handleFilterComponents = (event) => {
    this.setState({filter: event.target.value});
  };

}

export default ComponentList;

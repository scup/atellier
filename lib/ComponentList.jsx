import React, { PropTypes } from 'react';
import classNames from 'classnames';

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
      itemSelected: undefined
    };
  }

  render() {
    return (
      <div className="component-nav">
        <div className="component-tools">
          <input type="text" className="component-filter attelier-form" placeholder="Search components" />
        </div>
        <ul className="component-list">
          {this._renderComponentListItems()}
        </ul>
      </div>
    );
  }

  _renderComponentListItems(){
    return this.props.components.map((componentItem, index)=>{
      let className = classNames('component-list-item', { 'selected': index === this.state.itemSelected });
      return (
        <li key={index} className={className} onClick={this._onSelect(index)}>
          <label>{componentItem.componentName}</label>
        </li>
      );
    });
  }

  _onSelect = (index) => {
    return () => {
      this.props.onSelect(this.props.components[index]);
      this.setState({ itemSelected: index });
    };
  };

}

export default ComponentList;

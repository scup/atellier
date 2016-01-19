import React from 'react';

// import './ComponentList.less';

class ComponentList extends React.Component {

  static defaultProps = {
    components: []
  };

  constructor(props){
    super(props);
    this.state = {
      selected : false
    }
  }
  getComponets(){
    this.components = this.props.components.map((item,i)=>{
      let myClass = false;
      if (i === this.state.selected){
        let myClass = 'selected'
      };
      return (<li className={myClass} onClick={this.selectComponent.bind(this,i)} key={i}>{item.componentName}</li>)
    })
  }

  selectComponent(index){
    this.props.onSelect(this.props.components[index]);
    this.setState({
      selected : index
    })
  }

  render() {
    this.getComponets()
    return (<ul className="component-list">{this.components}</ul>)
  }
}

export default ComponentList;

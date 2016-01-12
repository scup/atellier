import React from 'react';
import Stage from './Stage.jsx';
import ComponentList from './ComponentList.jsx';

import './Attelier.less';

class Attelier extends React.Component {
  constructor(){
    super()
    this.state = {
      component : false
    };
    this.controls = {
      controls : [],
      keys : []
    };
  }

  refresh(){
    this.setState({
      keys : this.controls
    })
  }

  onSelectComponent(component){
    for(var key in component.component.propTypes){
      var newInput = React.createElement('input',{
        type : 'text',
        key : key,
        placeholder : key,
        onChange : this.refresh.bind(this)
      })
     this.controls.controls.push(newInput);
     this.controls.keys.push(key);
    }

    this.setState({
      component : component.component,
      keys : this.controls
    })
  }
  render() {
    return (
      <div>
        <ComponentList select={this.onSelectComponent.bind(this)}/>
        <Stage component={this.state.component} keys={this.state.keys}/>
      </div>
    )
  }
}

export default Attelier;

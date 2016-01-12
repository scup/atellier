import React, { PropTypes } from 'react';
import Stage from './Stage.jsx';
import ComponentList from './ComponentList.jsx';
import Sidebar from './Sidebar.jsx';
import Workspace from './Workspace.jsx';

import './Attelier.less';

class Attelier extends React.Component {

  static propTypes = {
    components: PropTypes.arrayOf(PropTypes.shape({
      component: PropTypes.func,
      componentName: PropTypes.string
    }))
  }

  state = {
    components: []
  }

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


  render() {

    let sidebarContent = (<ComponentList components={this.props.components} onSelect={this.onSelectComponent}/>),
        workspaceContent = (<Stage component={this.state.component} keys={this.state.keys}/>);

    return (
      <div className="attelier flex-container">
        <Sidebar>
          {sidebarContent}
        </Sidebar>
        <Workspace>
          {workspaceContent}
        </Workspace>
      </div>
    );
    // return (
    //   <div>
    //     <ComponentList components={this.props.components} onSelect={this.onSelectComponent}/>
    //     <Stage component={this.state.component} keys={this.state.keys}/>
    //   </div>
    // )
  }

  onSelectComponent = (component) => {
    console.log(component);
    // for(var key in component.component.propTypes){
    //   var newInput = React.createElement('input',{
    //     type : 'text',
    //     key : key,
    //     placeholder : key,
    //     onChange : this.refresh.bind(this)
    //   })
    //  this.controls.controls.push(newInput);
    //  this.controls.keys.push(key);
    // }

    this.setState({
      component : component.component,
      keys : this.controls
    })
  }
}

export default Attelier;

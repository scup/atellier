import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import PropertiesContainer from './PropertiesContainer';

class Properties extends React.Component {

  static propTypes = {
    component: PropTypes.shape({
      component: PropTypes.func,
      componentName: PropTypes.string
    }),
    componentProps: PropTypes.object,
    components: PropTypes.instanceOf(Immutable.List),
    onChangeProps: PropTypes.func,
    onCloseProperties: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  render() {
    let { component, componentProps, components, onCloseProperties } = this.props;
    let element = React.createElement(component.component);
    return (
      <div className="component-properties">
        <PropertiesContainer
          name={component.componentName}
          element={element}
          elementProps={componentProps}
          components={components}
          onChangeProps={this._handleChangeProps}
          onCloseProperties={onCloseProperties}
        />
      </div>
    );
  }

  _handleChangeProps = (properties) => {
    this.props.onChangeProps(properties);
  };

}

export default Properties;

import React, { PropTypes } from 'react';
import PropertiesContainer from './PropertiesContainer.jsx';

class Properties extends React.Component {

  static defaultProps = {
    // onChangeProps: PropTypes.func,
    // onCloseProperties: PropTypes.func,
    // component: {},
    // componentProps: {}
  };

  static propTypes = {
    // onChangeProps: PropTypes.func,
    // onCloseProperties: PropTypes.func,
    // component: PropTypes.shape({
    //   component: PropTypes.func,
    //   componentName: PropTypes.string
    // }),
    // componentProps: PropTypes.object
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

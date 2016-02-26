import Immutable from 'immutable';
import PropertiesContainer from './PropertiesContainer.jsx';

export default ((__React__) => {

    const PropTypes = __React__.PropTypes;

    class Properties extends __React__.Component {

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
        let element = __React__.createElement(component.component);
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

    return Properties;

  })(React);

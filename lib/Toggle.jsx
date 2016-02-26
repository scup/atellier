import classNames from 'classnames';

export default ((__React__) => {

  const PropTypes = __React__.PropTypes;

  class Toggle extends __React__.Component {

    static propTypes = {
      defaultValue: PropTypes.bool,
      onChange: PropTypes.func
    };

    static defaultProps = {
      defaultValue: false,
      onChange: PropTypes.func
    };

    constructor(props) {
      super(props);
      this.state = {
        checked: this.props.defaultValue
      };
    }

    render() {
      let className = classNames('atellier-toggle', this.props.className, {'atellier-toggle-checked': this.state.checked});
      return (
        <div className={className} onClick={this._handleChange}></div>
      );
    }

    _handleChange = () => {
      this.setState({checked: !this.state.checked}, () => {
        this.props.onChange(this.state.checked);
      });
    };
  }

  return Toggle;

})(React);

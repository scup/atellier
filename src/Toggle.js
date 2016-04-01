import React, { PropTypes } from 'react';
import classNames from 'classnames';

class Toggle extends React.Component {

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

export default Toggle;

import React, { PropTypes } from 'react';

class FieldType extends React.Component {

  static defaultProps = {
    onChange: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      defaultValue: props.defaultValue || ''
    }
  }

  render() {
    let { name, defaultValue } = this.props;
    return (
      <div className="fieldtype">
        <input type="text" placeholder={name} value={this.state.defaultValue} onChange={this.handleChange}/>
      </div>
    );
  }

  handleChange = ( event ) => {
    this.setState({
      defaultValue: event.target.value
    });
    this.props.onChange(this.props.name, event.target.value);
  }
}

export default FieldType;

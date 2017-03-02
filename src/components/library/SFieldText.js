import _ from 'lodash';
import React, {Component} from 'react';
import {Col, ControlLabel} from 'react-bootstrap';
import TextField from 'material-ui/TextField'

class SFieldText extends Component {
  constructor(props) {
    super(props);
    this.init(props);

    this.debouncedOnChange = _.debounce(event => {
      props.input.onChange(event.target.value)
    }, 200);

    this.handleChange = event => {
      event.persist();
      this.setState({value: event.target.value});
      this.debouncedOnChange(event);
    }

    this.init = this.init.bind(this);
  }

  init(props) {
    if (props.input) {
      this.state = {value: props.input.value};
      this.lastPropValue = props.input.value;
    }
  }

  componentWillReceiveProps(nextProps) {
    this.init(nextProps);
  }

  _renderActualComponent() {
    return (
      <TextField
        floatingLabelText={this.props.disabled ? '' : this.props.label}
        hintText={this.props.placeholder}
        errorText={this.props.meta.touched && this.props.meta.error}
        {...this.props.input}
        fullWidth
        value={this.getValue()}
        onChange={this.handleChange}
      />
    );
  }

  getValue() {
    const value = this.props.input.value !== this.lastPropValue ?
      this.props.input.value :
      this.state.value;

    this.lastPropValue = this.props.input.value;

    return value;
  }

  render() {
    return (
      <div>
        <Col componentClass={ControlLabel} className="default-label" sm={2}>
          {this.props.disabled ? this.props.label : ''}
        </Col>
        <Col sm={this.props.size || 3} className={this.props.disabled ? 'form-control-static' : ''}>
          {this.props.disabled ? this.props.staticValue : this._renderActualComponent()}
        </Col>
      </div>
    )
  }
}

export default SFieldText;

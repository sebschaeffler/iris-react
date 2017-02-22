import React from 'react';
import { Col, ControlLabel } from 'react-bootstrap';
import TextField from 'material-ui/TextField'

function _renderActualComponent(props) {
  const {input, label, placeholder, meta: {touched, error}, custom, disabled} = props;
  return (
    <TextField
      floatingLabelText={disabled ? '' : label}
      hintText={placeholder}
      errorText={touched && error}
      {...input}
      {...custom}
      fullWidth
    />
  );
}

const SFieldText = (props) => {
  const { label, size, type, disabled, staticValue } = props;
  return (
    <div>
      <Col componentClass={ControlLabel} className="default-label" sm={2}>
        {disabled ? label : ''}
      </Col>
      <Col sm={size || 3} className={disabled ? 'form-control-static' : ''}>
        {disabled && type !== 'select' ? staticValue : _renderActualComponent(props)}
      </Col>
    </div>
  );

}

export default SFieldText;

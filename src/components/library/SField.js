import React from 'react';
import { FormControl, Col, ControlLabel } from 'react-bootstrap';

function renderActualComponent(input, type, placeholder, staticValue, meta) {
  return (
    <FormControl
      type={type}
      componentClass={type === 'textarea' || type === 'select' ? type : 'input'}
      {...input}
      placeholder={placeholder}
    />
  );
}

const SField = (props) => {

  const { input, meta, label, size, type, placeholder, disabled, staticValue } = props;
  return (
    <div className={(meta.touched && meta.error ? 'has-error' : '')}>
      <Col componentClass={ControlLabel} sm={2}>
        {label}
      </Col>
      <Col sm={size || 3} className={disabled ? 'form-control-static' : ''}>
        {disabled ? staticValue : renderActualComponent(input, type, placeholder, staticValue, meta)}
        {meta.touched && ((meta.error && <span className={'help-block'} style={{ marginBottom: 0 }}>{meta.error}</span>) || (meta.warning && <span className={'help-block'}>{meta.warning}</span>))}
      </Col>
    </div>
  );

}

export default SField;

import React from 'react';
import { FormControl, Col, ControlLabel } from 'react-bootstrap';

function _renderActualComponent(props) {
  const {input, type, placeholder} = props;
  return (
    <FormControl
      type={type}
      componentClass={type === 'textarea' ? type : 'input'}
      {...input}
      onBlur={() => {
        input.onBlur(input.value);
      }}
      placeholder={placeholder}
    />
  );
}

const SField = (props) => {

  const { meta, label, size, type, disabled, staticValue } = props;
  return (
    <div className={(meta.touched && meta.error ? 'has-error' : '')}>
      <Col componentClass={ControlLabel} sm={2}>
        {label}
      </Col>
      <Col sm={size || 3} className={disabled ? 'form-control-static' : ''}>
        {disabled && type !== 'select' ? staticValue : _renderActualComponent(props)}
        {meta.touched && ((meta.error && <span className={'help-block'} style={{ marginBottom: 0 }}>{meta.error}</span>) || (meta.warning && <span className={'help-block'}>{meta.warning}</span>))}
      </Col>
    </div>
  );

}

export default SField;

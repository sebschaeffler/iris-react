import React from 'react';
import { FormControl, Col, ControlLabel } from 'react-bootstrap';

function renderActualComponent(input, type, placeholder, staticValue) {
  //console.log(this.props.initialValues.get(input.name))
  return (
    <FormControl
      type={type}
      componentClass={type === 'textarea' || type === 'select' ? type : 'input'}
      value={input.value ? input.value : staticValue}
      onBlur={() => { }}
      onChange={event => input.onChange(event.target.value)}
      placeholder={placeholder}
    />
  );
}

const SField = (props) => {

  const { input, meta: { touched, error, warning }, label, size, type, placeholder, disabled, staticValue } = props;
  return (
    <div className={(touched && error ? 'has-error' : '')}>
      <Col componentClass={ControlLabel} sm={2}>
        {label}
      </Col>
      <Col sm={size || 3} className={disabled ? 'form-control-static' : ''}>
        {disabled ? staticValue : renderActualComponent(input, type, placeholder, staticValue)}
        {touched && ((error && <span className={'help-block'} style={{ marginBottom: 0 }}>{error}</span>) || (warning && <span className={'help-block'}>{warning}</span>))}
      </Col>
    </div>
  );

}

export default SField;

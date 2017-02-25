import React from 'react';
import { Col, ControlLabel } from 'react-bootstrap';
import MultiSelect from './MultiSelect';

function _renderActualComponent(props) {
  const {input, placeholder, meta: {touched, error}, children, custom, isProcessing} = props;

  if (isProcessing) {
    return (
      <div>
        Loading......
      </div>
    );
  }

  return (
    <MultiSelect
      floatingLabelText={placeholder}
      errorText={touched && error}
      {...input}
      onChange={(e, v) => input.onChange(v)}
      onBlur={(e, v) => input.onBlur(v)}
      children={children}
      fullWidth
      {...custom} />
  );
}

const SFieldMultiSelect = (props) => {
  const { meta, label, size, disabled, staticValue } = props;
  const value = staticValue && staticValue.length > 0 ? staticValue.map(item => item.getName()).join(', ') : '';
  return (
    <div className={(meta.touched && meta.error ? 'has-error' : '')}>
      <Col componentClass={ControlLabel} className='default-label' sm={2}>
        {disabled ? label : ''}
      </Col>
      <Col sm={size || 3} className={disabled ? 'form-control-static' : ''}>
        {disabled ? value : _renderActualComponent(props)}
      </Col>
    </div>
  );
}

export default SFieldMultiSelect;

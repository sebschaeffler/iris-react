import React from 'react';
import { FormControl, Col, ControlLabel } from 'react-bootstrap';

function _renderActualComponent(input, type, placeholder, staticValue, multiple) {
  if (type !== 'select') {
    return (
      <FormControl
        type={type}
        componentClass={type === 'textarea' || type === 'select' ? type : 'input'}
        {...input}
        onBlur={() => {
          input.onBlur(input.value);
        }}
        multiple={multiple}
        placeholder={placeholder}
      />
    );
  } else {
    const values = input.value.length> 0 ? input.value : staticValue;
    if (values.length === 0) {
      return (
        <FormControl
          type='text'
          value='No values available yet'
          disabled
        />
      );
    } else {
      return (
        <FormControl componentClass='select' placeholder='Plese select...' multiple={multiple}>
          {values.map((item) => (<option key={item.id} value={item.id}>{item.name}</option>))}
        </FormControl>
      );
    }
  }
}

const SField = (props) => {

  const { input, meta, label, size, type, placeholder, disabled, staticValue, multiple } = props;
  return (
    <div className={(meta.touched && meta.error ? 'has-error' : '')}>
      <Col componentClass={ControlLabel} sm={2}>
        {label}
      </Col>
      <Col sm={size || 3} className={disabled ? 'form-control-static' : ''}>
        {disabled ? staticValue : _renderActualComponent(input, type, placeholder, staticValue, multiple)}
        {meta.touched && ((meta.error && <span className={'help-block'} style={{ marginBottom: 0 }}>{meta.error}</span>) || (meta.warning && <span className={'help-block'}>{meta.warning}</span>))}
      </Col>
    </div>
  );

}

export default SField;

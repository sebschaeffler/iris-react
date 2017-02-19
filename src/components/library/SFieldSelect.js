import React from 'react';
import { FormControl, Col, ControlLabel } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

function _renderSelectField(props) {
  const { placeholder, disabled, multiple, isProcessing } = props;
  if (isProcessing) {
    return (
        <span><FontAwesome name='spinner' /></span>
    );
  } else {
    return (
      <FormControl componentClass='select' placeholder={placeholder} multiple={multiple} disabled={disabled}>
        {props.children}
      </FormControl>
    );
  }
}

const SFieldSelect = (props) => {

  const { meta, label, size, disabled } = props;
  return (
    <div className={(meta.touched && meta.error ? 'has-error' : '')}>
      <Col componentClass={ControlLabel} sm={2}>
        {label}
      </Col>
      <Col sm={size || 3} className={disabled ? 'form-control-static' : ''}>
        {_renderSelectField(props)}
        {meta.touched && ((meta.error && <span className={'help-block'} style={{ marginBottom: 0 }}>{meta.error}</span>) || (meta.warning && <span className={'help-block'}>{meta.warning}</span>))}
      </Col>
    </div>
  );

}

export default SFieldSelect;

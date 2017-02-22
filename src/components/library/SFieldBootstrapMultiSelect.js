import React from 'react';
import { FormControl, Col, ControlLabel } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

// This should actually not be used since it is an antipattern
// http://ux.stackexchange.com/questions/74996/multi-selection-dropdown-list-implementation-best-practice
// Maybe a list or table is more appropriate?

function _renderSelectField(props) {
  const { input, placeholder, disabled, multiple, isProcessing, onChangeAction } = props;
  if (isProcessing) {
    return (
      <span><FontAwesome name='spinner' /></span>
    );
  } else {
    return (
      <FormControl
        className='multiselect'
        componentClass='select'
        placeholder={placeholder}
        multiple={multiple}
        disabled={disabled}
        onChange={(event, index, value) => {console.log("Event on change: ", event.target, index, value); onChangeAction(event.target.value); input.onChange(event.target.value)}}
        onBlur={(event) => {console.log("Event on blur: ", event); onChangeAction(event.target.value); input.onBlur(event.target.value)}}
      >
        {props.children}
      </FormControl>
    );
  }
}

const SFieldMultiSelect = (props) => {

  const { meta, label, size, disabled } = props;
  return (
    <div className={(meta.touched && meta.error ? 'has-error' : '')}>
      <div>
        <Col componentClass={ControlLabel} className="default-label" sm={2}>
          {label}
        </Col>
      </div>
      <Col sm={size || 3} className={disabled ? 'form-control-static' : ''}>
        {_renderSelectField(props)}
        {meta.touched && ((meta.error && <span className={'help-block'} style={{ marginBottom: 0 }}>{meta.error}</span>) || (meta.warning && <span className={'help-block'}>{meta.warning}</span>))}
      </Col>
    </div>
  );

}

export default SFieldMultiSelect;

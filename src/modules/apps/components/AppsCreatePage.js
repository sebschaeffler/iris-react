import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Form, FormGroup, FormControl, Col, ControlLabel, Button, Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { Keys } from './AppsPage_messages';
import { Keys as AppKeys } from '../../../i18n/keys';
import { Link } from 'react-router';
import { submitNewApp } from '../actions';

class AppsCreatePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      localApp: this.props.newApp
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.cancel = this.cancel.bind(this);
    this.renderField = this.renderField.bind(this);
    this.renderActualComponent = this.renderActualComponent.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  onSubmit(values) {
    this.props.submitNewApp();
  }

  cancel() {

  }

  // Stateles
  renderActualComponent(input, type, placeholder, staticValue) {
    return (
      <FormControl
        type={type}
        componentClass={type === 'textarea' || type === 'select' ? type : 'input'}
        {...input}
        placeholder={placeholder}
      />
    );
  }

  //Should be stateless, i.e. no binding to 'this' to access the states (local or global)
  renderField({ input, meta: { touched, error, warning }, label, size, type, placeholder, disabled, staticValue }) {
    return (
      <div className={(touched && error ? 'has-error' : '')}>
        <Col componentClass={ControlLabel} sm={2}>
          {label}
        </Col>
        <Col sm={size || 3} className={disabled ? 'form-control-static' : ''}>
          {disabled ? staticValue : this.renderActualComponent(input, type, placeholder, staticValue)}
          {touched && ((error && <span className={'help-block'} style={{ marginBottom: 0 }}>{error}</span>) || (warning && <span className={'help-block'}>{warning}</span>))}
        </Col>
      </div>
    );
  }

  renderErrors() {
    if (this.state.errors) {
      return (<div>
        {this.state.errors}
      </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div className='button-left'>
          <FormGroup>
            <Col>
              <Link to='/appslist'>
                <Button
                  className='default-submit-button'
                  type='reset'
                  onClick={this.cancel}>
                  <FontAwesome name='arrow-left' />
                  <span className="button-text">
                    <FormattedMessage id={Keys.BUTTON_BACK_TO_LIST} />
                  </span>
                </Button>
              </Link>
            </Col>
          </FormGroup>
        </div>
        <Form horizontal onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Row className="form-group">
            <Field
              type='text'
              name='name'
              label='Name'
              placeholder='Name'
              component={this.renderField} />
          </Row>
          {this.renderErrors()}
          <div className='button-left'>
            <Col>
              <Button
                className='default-submit-button'
                type='submit'
                disabled={this.props.pristine || this.props.submitting}>
                <FormattedMessage id={Keys.BUTTON_SUBMIT} />
              </Button>
              <Button
                className='query-reset'
                type='button'
                onClick={this.props.reset}
                disabled={this.props.pristine || this.props.submitting}>
                <FormattedMessage id={AppKeys.VIEWS_BUTTONS_RESET} />
              </Button>
            </Col>
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // this is REALLY misleading, it should be called valuesFromState or something similar
    initialValues: state.apps.newapi,
    isSuccessfullyCreated: state.addapi.isSuccessfullyCreated,
    errors: state.addapi.errors
  }
};

export const AddAppCreateForm = reduxForm({
  form: 'addAppForm'
  //validate
})(AppsCreatePage);

export default connect(mapStateToProps, { submitNewApp })(injectIntl(AddAppCreateForm));

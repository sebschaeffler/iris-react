import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Panel, Form, FormGroup, FormControl, Col, ControlLabel, Button, Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import msg, { Keys } from './ApisPage_messages';
import { Keys as AppKeys } from '../../../i18n/keys';
import Api from '../../../model/api';
import { submitNewApi } from '../actions';

class ApisCreatePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      //localApi: this.props.initialValues,
      generalPanelExpanded: true,
      definitionPanelExpanded: true,
      policiesPanelExpanded: true,
      errors: null
    };

    this.toggleGeneralPanel = this.toggleGeneralPanel.bind(this);
    this.toggleDefinitionPanel = this.toggleDefinitionPanel.bind(this);
    this.togglePoliciesPanel = this.togglePoliciesPanel.bind(this);
    this.renderField = this.renderField.bind(this);
    this.renderActualComponent = this.renderActualComponent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  // setState() does not immediately mutate this.state but creates a pending state transition.
  // Accessing this.state after calling this method can potentially return the existing value.
  // There is no guarantee of synchronous operation of calls to setState and calls may be batched
  // for performance gains.
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onSubmit(values) {
    this.props.submitNewApi(new Api(values));
  }

  renderErrors() {
    if (this.state.errors) {
      return (<div>
        {this.state.errors}
      </div>
      );
    }
  }

  toggleGeneralPanel() {
    this.setState({ generalPanelExpanded: !this.state.generalPanelExpanded });
  }

  toggleDefinitionPanel() {
    this.setState({ definitionPanelExpanded: !this.state.definitionPanelExpanded });
  }

  togglePoliciesPanel() {
    this.setState({ policiesPanelExpanded: !this.state.policiesPanelExpanded });
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

  render() {
    return (
      <div>
        <div className='button-left'>
          <FormGroup>
            <Col>
              <Link to='/apislist'>
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
        <div className="workarea">
          <Form horizontal onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Panel collapsible defaultExpanded header='General details' onSelect={this.toggleGeneralPanel} expanded={this.state.generalPanelExpanded} >
              <Row className="form-group">
                <Field
                  type='text'
                  name='context'
                  label='Context'
                  size={2}
                  staticValue={this.props.initialValues.getContext()}
                  component={this.renderField}
                  disabled />
                <Field
                  type='text'
                  name='visibility'
                  label='Visibility'
                  size={2}
                  staticValue={this.props.initialValues.getVisibility()}
                  component={this.renderField}
                  disabled />
              </Row>
              <Row className="form-group">
                <Field
                  type='text'
                  name='name'
                  label='Name'
                  size={8}
                  placeholder={this.props.intl.formatMessage(msg(Keys.SHARE_PRICES_PLACEHOLDER))}
                  component={this.renderField} />
              </Row>
              <Row className="form-group">
                <Field
                  type='text'
                  name='technical_name'
                  label='Technical name'
                  size={8}
                  placeholder='e.g. share-prices (lowercase and hyphens are recommended)'
                  component={this.renderField}
                />
              </Row>
              <Row className="form-group">
                <Field
                  type='textarea'
                  name='description'
                  label='Description'
                  size={8}
                  component={this.renderField}
                  placeholder='High level description of the API'
                />
              </Row>
              <Row className="form-group">
                <Field
                  type='text'
                  name='tags'
                  label='Tags'
                  size={8}
                  component={this.renderField}
                  placeholder='e.g. share prices, options, futures'
                />
              </Row>
            </Panel>
            <Panel collapsible defaultExpanded header='API definition' onSelect={this.toggleDefinitionPanel} expanded={this.state.definitionPanelExpanded} >
              <Row className="form-group">
                <Field
                  type='text'
                  name='api_endpoint'
                  label='Api endpoint'
                  size={8}
                  component={this.renderField}
                  placeholder='e.g. http://www.example.com/sharePrices'
                />
              </Row>
              <Row className="form-group">
                <Field
                  type='text'
                  name='doc_endpoint'
                  label='Documentation enpoint'
                  size={8}
                  component={this.renderField}
                  placeholder='e.g. http://www.example.com/sharePrices/swagger-ui'
                />
              </Row>
            </Panel>
            <Panel collapsible defaultExpanded header='Policies' onSelect={this.togglePoliciesPanel} expanded={this.state.policiesPanelExpanded} >
              <Col componentClass={ControlLabel} sm={14}>
                Default policies will be enabled.
                </Col>
            </Panel>
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
                  type='reset'
                  onClick={this.props.reset}
                  disabled={this.props.pristine || this.props.submitting}>
                  <FormattedMessage id={AppKeys.VIEWS_BUTTONS_RESET} />
                </Button>
              </Col>
            </div>
          </Form>
        </div >
      </div >
    );
  }

}

export const validate = (values) => {
  let errors = {};
  const urlRegExp = /([a-z]+:\/+)([^\/\s]*)([a-z0-9\-@\^=%&;\/~\+]*)[\?]?([^ #]*)#?([^ #]*)/ig;
  if (!values.name || values.name.trim() === '') {
    errors.name = 'Name is required';
  }

  if (!values.version || values.version.trim() === '') {
    errors.version = 'Version is required';
  } else if (!values.version.match(/^\d+\.\d+$/)) {
    errors.version = 'Version should respect the following pattern: {major_version}.{minor_version}, e.g. 1.0';
  }

  if (!values.description || values.description.trim() === '') {
    errors.description = 'Description is required';
  }

  if (!values.api_endpoint || values.api_endpoint.trim() === '') {
    errors.api_endpoint = 'Api endpoint is required';
  } else if (!values.api_endpoint.match(urlRegExp)) {
    errors.api_endpoint = 'A valid URI is expected: e.g. http(s)://domain_name/endpoint';
  }

  if (values.doc_endpoint && values.doc_endpoint.trim() !== '' && !values.doc_endpoint.match(urlRegExp)) {
    errors.doc_endpoint = 'A valid URI is expected: e.g. http(s)://domain_name/endpoint';
  }

  if (!values.tags || values.tags.trim() === '') {
    errors.tags = 'At least one tag is required';
  }
  return errors;
}

const mapStateToProps = (state) => {
  return {
    initialValues: state.apis.api,
    isSuccessful: state.apis.isSuccessful,
    errors: state.apis.errors
  }
};

export const ApisCreateForm = reduxForm({
  form: 'addApiForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
  //validate
})(ApisCreatePage);

export default connect(mapStateToProps, { submitNewApi })(injectIntl(ApisCreateForm));

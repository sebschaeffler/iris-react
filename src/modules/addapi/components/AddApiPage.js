import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Panel, Form, FormGroup, FormControl, Col, ControlLabel, Button, Row } from 'react-bootstrap';
import PageHeader from '../../../components/library/PageHeader';
import msg, { Keys } from './AddApiPage_messages';
import appMsg, { Keys as AppKeys } from '../../../i18n/keys';
import Api from '../../../model/api';
import { submitNewApi } from '../actions';

class AddApiPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      localApi: this.props.initialValues,
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
    this.syncFrom = this.syncFrom.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  // setState() does not immediately mutate this.state but creates a pending state transition.
  // Accessing this.state after calling this method can potentially return the existing value.
  // There is no guarantee of synchronous operation of calls to setState and calls may be batched
  // for performance gains.
  componentWillReceiveProps(nextProps) {
    // Here is where "initialvalues" name is misleading it actually returns what came out from
    // the redux-form reducer
    if (!nextProps || !nextProps.submitSucceeded) {
      this.setState({
        localApi: this.syncFrom(nextProps.initialValues)
      }, function () {
        //console.log("New values (componentWillReceiveProps): ", this.state.localApi);
      });
    }
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  componentDidMount() {
    this.setState({
      localApi: this.syncFrom(this.props.initialValues)
    }, function () {
      //console.log("Current values (componentDidMount)", this.state.localApi);
    });
  }

  syncFrom(datasource) {
    //console.log("Datasource: ", datasource);
    if (datasource) {
      // update local state with new object built from source
      return new Api().setName(datasource.name || this.props.initialValues.name)
        .setContext(datasource.context || this.props.initialValues.context)
        .setVersion(datasource.version || this.props.initialValues.version)
        .setVisibility(datasource.visibility || this.props.initialValues.visibility)
        .setDescription(datasource.description || this.props.initialValues.description)
        .setTags(datasource.tags || this.props.initialValues.tags)
        .setApiEndpoint(datasource.api_endpoint || this.props.initialValues.api_endpoint)
        .setDocEndpoint(datasource.doc_endpoint || this.props.initialValues.doc_endpoint);
    } else {
      //console.log("ERROR: datasource for sync. is null");
    }
  }

  onSubmit(values) {
    // Sync local state from form values
    const api = this.syncFrom(values);
    this.props.submitNewApi(api);
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
      <div className='page-wrapper content'>
        <PageHeader title={this.props.intl.formatMessage(msg(Keys.SECTIONS_ADD_API_TITLE))} headerIcon='plus' rootText={this.props.intl.formatMessage(appMsg(AppKeys.APP_TITLE))} />
        <Form horizontal onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Panel collapsible defaultExpanded header='General details' onSelect={this.toggleGeneralPanel} expanded={this.state.generalPanelExpanded} >
            <Row className="form-group">
              <Field
                type='text'
                name='name'
                label='Name'
                placeholder={this.props.intl.formatMessage(msg(Keys.SHARE_PRICES_PLACEHOLDER))}
                component={this.renderField} />
              <Field
                type='text'
                name='context'
                label='Context'
                staticValue={this.state.localApi.getContext()}
                component={this.renderField}
                disabled />
            </Row>
            <Row className="form-group">
              <Field
                type='text'
                name='version'
                label='Version'
                placeholder='e.g. 1.0.0'
                component={this.renderField}
              />
              <Field
                type='text'
                name='visibility'
                label='Visibility'
                staticValue={this.state.localApi.getVisibility()}
                component={this.renderField}
                disabled />
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
          <div className='button-area'>
            <FormGroup>
              <Col>
                <Button
                  className='default-submit-button'
                  type='submit'
                  disabled={this.props.pristine || this.props.submitting}>
                  <FormattedMessage id={Keys.BUTTON_CREATE} />
                </Button>
                <Button
                  className='query-reset'
                  type='button'
                  onClick={this.props.reset}
                  disabled={this.props.pristine || this.props.submitting}>
                  <FormattedMessage id={AppKeys.VIEWS_BUTTONS_RESET} />
                </Button>
              </Col>
            </FormGroup>
          </div>
        </Form>
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

  if (!values.doc_endpoint || values.doc_endpoint.trim() === '') {
    errors.doc_endpoint = 'Documentation endpoint is required';
  } else if (!values.doc_endpoint.match(urlRegExp)) {
    errors.doc_endpoint = 'A valid URI is expected: e.g. http(s)://domain_name/endpoint';
  }

  if (!values.tags || values.tags.trim() === '') {
    errors.tags = 'At least one tag is required';
  }
  return errors;
}

const mapStateToProps = (state) => {
  return {
    // this is REALLY misleading, it should be called valuesFromState or something similar
    initialValues: state.addapi.api,
    isSuccessful: state.addapi.isSuccessful,
    errors: state.addapi.errors
  }
};

export const AddApiCreateForm = reduxForm({
  form: 'addApiForm'
  //validate
})(AddApiPage);

export default connect(mapStateToProps, { submitNewApi })(injectIntl(AddApiCreateForm));

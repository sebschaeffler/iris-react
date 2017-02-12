import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Panel, Form, FormGroup, Col, ControlLabel, Button, Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import msg, { Keys } from './ApisPage_messages';
import { Keys as AppKeys } from '../../../i18n/keys';
import Api from '../../../model/api';
import * as actions from '../actionTypes';
import SField from '../../../components/library/SField';
import { submitNewApi, loadApi, resetApi, updateApi, deleteApi } from '../actions';

class ApisCreatePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditEnabled: true,
      isDetailPage: this.props.params.id, // needs to parse window location to detect if an id is present, i.e. detail page
      generalPanelExpanded: true,
      definitionPanelExpanded: true,
      policiesPanelExpanded: true,
      errors: null
    };

    this.toggleGeneralPanel = this.toggleGeneralPanel.bind(this);
    this.toggleDefinitionPanel = this.toggleDefinitionPanel.bind(this);
    this.togglePoliciesPanel = this.togglePoliciesPanel.bind(this);
    this.renderCreateActions = this.renderCreateActions.bind(this);
    this.renderDetailActions = this.renderDetailActions.bind(this);
    this.renderBackAction = this.renderBackAction.bind(this);
    this.onApiSubmit = this.onApiSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.deleteApi = this.deleteApi.bind(this);
    this.redirectUser = this.redirectUser.bind(this);
    this.renderTechnicalId = this.renderTechnicalId.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  // setState() does not immediately mutate this.state but creates a pending state transition.
  // Accessing this.state after calling this method can potentially return the existing value.
  // There is no guarantee of synchronous operation of calls to setState and calls may be batched
  // for performance gains.
  componentDidMount() {
    console.log('Is detail page?', this.state.isDetailPage, " Param: ", this.props.params.id)
    if (this.state.isDetailPage) {
      this.setState({
        isEditEnabled: false
      });
      // Load content
      this.props.loadApi({
        id: this.props.params.id
      });
    } else {
      // Explicitely reset state api values (redux-form only reset initialValues property)
      this.props.resetApi();
    }

    this.props.reset();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    } else if (nextProps.currentAction === actions.UPDATE_SUCCESS || nextProps.currentAction === actions.DELETE_SUCCESS || nextProps.currentAction === actions.SUBMIT_SUCCESS) {
      this.redirectUser();
    }
  }

  redirectUser() {
    this.props.router.replace('/apislist');
  }

  onApiSubmit(newValues) {
    var newApi = new Api();
    newApi = newApi
      .setId(newValues.id ? newValues.id : this.props.initialValues.getId())
      .setTechnicalName(newValues.technical_name ? newValues.technical_name : this.props.initialValues.getTechnicalName())
      .setName(newValues.name ? newValues.name : this.props.initialValues.getName())
      .setContext(newValues.context ? newValues.context : this.props.initialValues.getContext())
      .setVisibility(newValues.visibility ? newValues.visibility : this.props.initialValues.getVisibility())
      .setDescription(newValues.description ? newValues.description : this.props.initialValues.getDescription())
      .setTags(newValues.tags ? newValues.tags : this.props.initialValues.getTags())
      .setApiEndpoint(newValues.api_endpoint ? newValues.api_endpoint : this.props.initialValues.getApiEndpoint())
      .setDocEndpoint(newValues.doc_endpoint ? newValues.doc_endpoint : this.props.initialValues.getDocEndpoint())
    if (this.state.isDetailPage) {
      return this.props.updateApi(newApi);
    } else {
      return this.props.submitNewApi(newApi);
    }
  }

  renderErrors() {
    if (this.state.errors) {
      return (<div>
        {this.state.errors}
      </div>
      );
    }
  }

  deleteApi() {
    this.props.deleteApi(this.props.initialValues);
  }

  toggleEdit() {
    this.setState({
      isEditEnabled: !this.state.isEditEnabled
    });
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

  renderCreateActions() {
    if (!this.state.isDetailPage || this.state.isEditEnabled) {
      return (
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
      );
    }
  }

  renderDetailActions() {
    if (this.state.isDetailPage && !this.state.isEditEnabled) {
      return (
        <div className='button-left'>
          <Col>
            <Button
              className='default-submit-button'
              type='button'
              onClick={this.toggleEdit}>
              <FormattedMessage id={AppKeys.VIEWS_BUTTONS_EDIT} />
            </Button>
            <Button
              className='default-submit-button'
              type='button'
              onClick={this.deleteApi}>
              <FormattedMessage id={AppKeys.VIEWS_BUTTONS_DELETE} />
            </Button>
          </Col>
        </div>
      );
    }
  }

  renderBackAction() {
    if (!this.state.isDetailPage || !this.state.isEditEnabled) {
      return (
        <div className='button-left'>
          <FormGroup>
            <Col>
              <Button
                className='default-submit-button'
                type='reset'
                onClick={this.redirectUser}>
                <FontAwesome name='arrow-left' />
                <span className="button-text">
                  <FormattedMessage id={Keys.BUTTON_BACK_TO_LIST} />
                </span>
              </Button>
            </Col>
          </FormGroup>
        </div>
      );
    } else if (this.state.isEditEnabled) {
      return (
        <div className='button-left'>
          <FormGroup>
            <Col>
              <Button
                className='default-submit-button'
                type='reset'
                onClick={this.toggleEdit}>
                <FontAwesome name='arrow-left' />
                <span className="button-text">
                  <FormattedMessage id={AppKeys.VIEWS_BUTTONS_CANCEL} />
                </span>
              </Button>
            </Col>
          </FormGroup>
        </div>
      );
    }
  }

  renderTechnicalId() {
    if (this.state.isDetailPage) {
      return (
        <Row className="form-group">
          <Field
            type='text'
            name='id'
            label='Technical identifier'
            size={8}
            component={SField}
            staticValue={this.props.initialValues.getId()}
            disabled />
        </Row>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderBackAction()}
        <div className="workarea">
          <Form horizontal onSubmit={this.props.handleSubmit(this.onApiSubmit)}>
            {this.renderTechnicalId()}
            <Panel collapsible defaultExpanded header='General details' onSelect={this.toggleGeneralPanel} expanded={this.state.generalPanelExpanded} >
              <Row className="form-group">
                <Field
                  type='text'
                  name='context'
                  label='Context'
                  size={2}
                  staticValue={this.props.initialValues.getContext()}
                  component={SField}
                  disabled />
                <Field
                  type='text'
                  name='visibility'
                  label='Visibility'
                  size={2}
                  staticValue={this.props.initialValues.getVisibility()}
                  component={SField}
                  disabled />
              </Row>
              <Row className="form-group">
                <Field
                  type='text'
                  name='name'
                  label='Name'
                  size={8}
                  placeholder={this.props.intl.formatMessage(msg(Keys.SHARE_PRICES_PLACEHOLDER))}
                  component={SField}
                  staticValue={this.props.initialValues.getName()}
                  disabled={this.state.isDetailPage && !this.state.isEditEnabled}
                />
              </Row>
              <Row className="form-group">
                <Field
                  type='text'
                  name='technical_name'
                  label='Technical name'
                  size={8}
                  placeholder='e.g. share-prices (lowercase and hyphens are recommended)'
                  component={SField}
                  staticValue={this.props.initialValues.getTechnicalName()}
                  disabled={this.state.isDetailPage && !this.state.isEditEnabled}
                />
              </Row>
              <Row className="form-group">
                <Field
                  type='textarea'
                  name='description'
                  label='Description'
                  size={8}
                  component={SField}
                  staticValue={this.props.initialValues.getDescription()}
                  placeholder='High level description of the API'
                  disabled={this.state.isDetailPage && !this.state.isEditEnabled}
                />
              </Row>
              <Row className="form-group">
                <Field
                  type='text'
                  name='tags'
                  label='Tags'
                  size={8}
                  component={SField}
                  staticValue={this.props.initialValues.getTags()}
                  placeholder='e.g. share prices, options, futures'
                  disabled={this.state.isDetailPage && !this.state.isEditEnabled}
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
                  component={SField}
                  staticValue={this.props.initialValues.getApiEndpoint()}
                  placeholder='e.g. http://www.example.com/sharePrices'
                  disabled={this.state.isDetailPage && !this.state.isEditEnabled}
                />
              </Row>
              <Row className="form-group">
                <Field
                  type='text'
                  name='doc_endpoint'
                  label='Documentation enpoint'
                  size={8}
                  component={SField}
                  staticValue={this.props.initialValues.getDocEndpoint()}
                  placeholder='e.g. http://www.example.com/sharePrices/swagger-ui'
                  disabled={this.state.isDetailPage && !this.state.isEditEnabled}
                />
              </Row>
            </Panel>
            <Panel collapsible defaultExpanded header='Policies' onSelect={this.togglePoliciesPanel} expanded={this.state.policiesPanelExpanded} >
              <Col componentClass={ControlLabel} sm={14}>
                Default policies will be enabled.
                </Col>
            </Panel>
            {this.renderErrors()}
            {this.renderCreateActions()}
            {this.renderDetailActions()}
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

  if (!values.technical_name || values.technical_name.trim() === '') {
    errors.technical_name = 'Technical name is required';
  } else if (!values.technical_name.match(/[a-z0-9]/)) {
    errors.technical_name = 'Technical name should be in lower case (and use hyphens if need be)';
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
    errors: state.apis.errors,
    currentAction: state.apis.currentAction
  }
};

export const ApisCreateForm = reduxForm({
  form: 'apiForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(ApisCreatePage);

export default connect(mapStateToProps, { submitNewApi, loadApi, resetApi, updateApi, deleteApi })(injectIntl(ApisCreateForm));

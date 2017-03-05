import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { injectIntl } from 'react-intl';
import { Panel, Col, ControlLabel, Row } from 'react-bootstrap';
import IFrame from 'react-iframe';
import msg, { Keys } from './ApisPage_messages';
import GenericLayout from '../../../components/library/GenericLayout';
import SFieldText from '../../../components/library/SFieldText';
import { submitNewApi, loadApi, resetApi, updateApi, deleteApi, toggleStatus } from '../actions';

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

    this.getConfig = this.getConfig.bind(this);
    this.getSecondaryTabContent = this.getSecondaryTabContent.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleGeneralPanel = this.toggleGeneralPanel.bind(this);
    this.toggleDefinitionPanel = this.toggleDefinitionPanel.bind(this);
    this.togglePoliciesPanel = this.togglePoliciesPanel.bind(this);
    this.redirectUser = this.redirectUser.bind(this);
    this.onApiSubmit = this.onApiSubmit.bind(this);
    this.deleteApi = this.deleteApi.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
  }

  getConfig() {
    return ({
      tabs: this.state.isDetailPage,
      getSecondaryTabContent: this.getSecondaryTabContent,
      secondaryTabIcon: 'import_contacts',
      secondaryTabLabel: 'Documentation',
      backLabel: Keys.BUTTON_BACK_TO_LIST,
      submitLabel: Keys.BUTTON_SUBMIT,
      isDetailPage: this.state.isDetailPage,
      isEditEnabled: this.state.isEditEnabled,
      remoteProps: this.props,
      errors: this.state.errors,
      onSubmit: this.props.handleSubmit(this.onApiSubmit),
      backAction: this.redirectUser,
      toggleEditAction: this.toggleEdit,
      deleteAction: this.deleteApi,
      toggleStatusAction: this.toggleStatus,
      isProcessing: this.props.isProcessing
    });
  }

  // setState() does not immediately mutate this.state but creates a pending state transition.
  // Accessing this.state after calling this method can potentially return the existing value.
  // There is no guarantee of synchronous operation of calls to setState and calls may be batched
  // for performance gains.
  componentDidMount() {
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
    } else if (nextProps.lastCRUDState &&
      (nextProps.lastCRUDState.isUpdateSuccessful() ||
        nextProps.lastCRUDState.isDeleteSuccessful() ||
        nextProps.lastCRUDState.isSubmitSuccessful())) {
      this.redirectUser();
    }

    console.log(nextProps.initialValues.getStatus())
  }

  redirectUser() {
    this.props.router.replace('/apislist');
  }

  onApiSubmit(newValues) {
    if (this.state.isDetailPage) {
      return this.props.updateApi(newValues);
    } else {
      return this.props.submitNewApi(newValues);
    }
  }

  deleteApi() {
    this.props.deleteApi(this.props.initialValues.getId());
  }

  toggleStatus() {
    this.props.toggleStatus();
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


  getSecondaryTabContent() {
    const url = this.props.initialValues.doc_endpoint;
    if (url) {
      return (
        <IFrame url={url} width='100%' height='100%' />
      );
    } else {
      return (
        <span>
          There is no documentation available yet.
        </span>
      );
    }
  }

  render() {
    return (
      <GenericLayout config={this.getConfig()} status={this.props.initialValues.getStatus()}>
        <Panel collapsible defaultExpanded header='General details' onSelect={this.toggleGeneralPanel} expanded={this.state.generalPanelExpanded} >
          <Row className="form-group">
            <Field
              type='text'
              name='owner'
              label='Owner'
              size={8}
              staticValue={this.props.initialValues.getOwner()}
              component={SFieldText}
              disabled={!this.state.isEditEnabled}
            />
            {/*<Field
              type='text'
              name='visibility'
              label='Visibility'
              size={2}
              staticValue={this.props.initialValues.getVisibility()}
              component={SFieldText}
              disabled />*/}
          </Row>
          <Row className={this.state.isEditEnabled ? '' : 'form-group'}>
            <Field
              type='text'
              name='name'
              label='Name'
              size={8}
              placeholder={this.props.intl.formatMessage(msg(Keys.SHARE_PRICES_PLACEHOLDER))}
              component={SFieldText}
              staticValue={this.props.initialValues.getName()}
              disabled={!this.state.isEditEnabled}
            />
          </Row>
          <Row className={this.state.isEditEnabled ? '' : 'form-group'}>
            <Field
              type='text'
              name='technical_name'
              label='Technical name'
              size={8}
              placeholder='e.g. share-prices (lowercase and hyphens are recommended)'
              component={SFieldText}
              staticValue={this.props.initialValues.getTechnicalName()}
              disabled={!this.state.isEditEnabled}
            />
          </Row>
          <Row className={this.state.isEditEnabled ? '' : 'form-group'}>
            <Field
              type='textarea'
              name='description'
              label='Description'
              size={8}
              multiLine={true}
              rows={2}
              component={SFieldText}
              staticValue={this.props.initialValues.getDescription()}
              placeholder='High level description of the API'
              disabled={!this.state.isEditEnabled}
            />
          </Row>
          <Row className={this.state.isEditEnabled ? '' : 'form-group'}>
            <Field
              type='text'
              name='tags'
              label='Tags'
              size={8}
              component={SFieldText}
              staticValue={this.props.initialValues.getTags()}
              placeholder='e.g. share prices, options, futures'
              disabled={!this.state.isEditEnabled}
            />
          </Row>
        </Panel>
        <Panel collapsible defaultExpanded header='API definition' onSelect={this.toggleDefinitionPanel} expanded={this.state.definitionPanelExpanded} >
          <Row className={this.state.isEditEnabled ? '' : 'form-group'}>
            <Field
              type='text'
              name='api_endpoint'
              label='Api endpoint'
              size={8}
              component={SFieldText}
              staticValue={this.props.initialValues.getApiEndpoint()}
              placeholder='e.g. http://www.example.com/sharePrices'
              disabled={!this.state.isEditEnabled}
            />
          </Row>
          <Row className={this.state.isEditEnabled ? '' : 'form-group'}>
            <Field
              type='text'
              name='doc_endpoint'
              label='Documentation enpoint'
              size={8}
              component={SFieldText}
              staticValue={this.props.initialValues.getDocEndpoint()}
              placeholder='e.g. http://www.example.com/sharePrices/swagger-ui'
              disabled={!this.state.isEditEnabled}
            />
          </Row>
        </Panel>
        <Panel collapsible defaultExpanded header='Policies' onSelect={this.togglePoliciesPanel} expanded={this.state.policiesPanelExpanded} >
          <Col componentClass={ControlLabel} sm={14}>
            Default policies will be enabled.
          </Col>
        </Panel>
      </GenericLayout>
    );
  }

}

export const validate = (values) => {
  let errors = {};
  const urlRegExp = /([a-z]+:\/+)([^\/\s]*)([a-z0-9\-@\^=%&;\/~\+]*)[\?]?([^ #]*)#?([^ #]*)/ig;
  if (!values.name || values.name.trim() === '') {
    errors.name = 'Name is required';
  }
  if (!values.owner || values.owner.trim() === '') {
    errors.owner = 'Owner is required';
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
    isProcessing: state.apis.isProcessing,
    lastCRUDState: state.apis.CRUDState
  }
};

export const ApisCreateForm = reduxForm({
  form: 'apiForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(ApisCreatePage);

export default connect(mapStateToProps, { submitNewApi, loadApi, resetApi, updateApi, deleteApi, toggleStatus })(injectIntl(ApisCreateForm));

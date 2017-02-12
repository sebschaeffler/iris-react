import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Form, FormGroup, Col, Button, Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { Keys } from './AppsPage_messages';
import { Keys as AppKeys } from '../../../i18n/keys';
import SField from '../../../components/library/SField';
import { submitNewApp, load, resetApp, updateApp, deleteApp } from '../actions';
import * as actions from '../actionTypes';
import { App } from '../model';

class AppsCreatePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditEnabled: true,
      isDetailPage: this.props.params.id // needs to parse window location to detect if an id is present, i.e. detail page
    };

    this.onAppSubmit = this.onAppSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.renderCreateActions = this.renderCreateActions.bind(this);
    this.renderDetailActions = this.renderDetailActions.bind(this);
    this.renderBackAction = this.renderBackAction.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.deleteApp = this.deleteApp.bind(this);
    this.redirectUser = this.redirectUser.bind(this);
    this.renderTechnicalId = this.renderTechnicalId.bind(this);
  }

  componentDidMount() {
    if (this.state.isDetailPage) {
      this.setState({
        isEditEnabled: false
      });
      // Load content
      this.props.load({
        id: this.props.params.id
      });
    } else {
      // Explicitely reset state app values (redux-form only reset initialValues property)
      this.props.resetApp();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentAction === actions.UPDATE_SUCCESS || nextProps.currentAction === actions.DELETE_SUCCESS || nextProps.currentAction === actions.SUBMIT_SUCCESS) {
      this.redirectUser();
    }
  }

  redirectUser() {
    this.props.router.replace('/appslist');
  }

  onAppSubmit(newValues) {
    var newApp = new App();
    newApp = newApp
      .setId(newValues.id ? newValues.id : this.props.initialValues.getId())
      .setName(newValues.name ? newValues.name : this.props.initialValues.getName())
      .setDescription(newValues.description ? newValues.description : this.props.initialValues.getDescription())
      .setCallbackUrl(newValues.callback_url ? newValues.callback_url : this.props.initialValues.getCallbackUrl());
    if (this.state.isDetailPage) {
      return this.props.updateApp(newApp);
    } else {
      return this.props.submitNewApp(newApp);
    }
  }

  deleteApp() {
    this.props.deleteApp(this.props.initialValues);
  }

  toggleEdit() {
    this.setState({
      isEditEnabled: !this.state.isEditEnabled
    });
  }

  renderErrors() {
    if (this.state.errors) {
      return (
        <div>
          {this.state.errors}
        </div>
      );
    }
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
              onClick={this.deleteApp}>
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
          <Form horizontal onSubmit={this.props.handleSubmit(this.onAppSubmit)}>
            {this.renderTechnicalId()}
            <Row className="form-group">
              <Field
                type='text'
                name='name'
                label='Name'
                placeholder='Name'
                size={8}
                component={SField}
                staticValue={this.props.initialValues.getName()}
                disabled={this.state.isDetailPage && !this.state.isEditEnabled} />
            </Row>
            <Row className="form-group">
              <Field
                type='textarea'
                name='description'
                label='Description'
                size={8}
                component={SField}
                placeholder='Description of the application'
                staticValue={this.props.initialValues.getDescription()}
                disabled={this.state.isDetailPage && !this.state.isEditEnabled} />
            </Row>
            <Row className="form-group">
              <Field
                type='text'
                name='callback_url'
                label='Callback URL'
                size={8}
                placeholder='http://www.yourapi.com'
                component={SField}
                staticValue={this.props.initialValues.getCallbackUrl()}
                disabled={this.state.isDetailPage && !this.state.isEditEnabled} />
            </Row>
            {this.renderErrors()}
            {this.renderCreateActions()}
            {this.renderDetailActions()}
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialValues: state.apps.app,
    isSuccessful: state.apps.isSuccessful,
    errors: state.apps.errors,
    currentAction: state.apps.currentAction
  }
};

export const AddAppCreateForm = reduxForm({
  form: 'appForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
  //validate
})(AppsCreatePage);

export default connect(mapStateToProps, { submitNewApp, load, resetApp, updateApp, deleteApp })(injectIntl(AddAppCreateForm));

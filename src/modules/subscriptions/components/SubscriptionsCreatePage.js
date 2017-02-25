
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { injectIntl } from 'react-intl';
import { Row } from 'react-bootstrap';
import MenuItem from 'material-ui/MenuItem';
import { ListItem } from 'material-ui/List'
import { Keys } from './SubscriptionsPage_messages';
import GenericLayout from '../../../components/library/GenericLayout';
import * as LayoutHelper from '../../../components/library/LayoutHelper';
import SFieldMultiSelect from '../../../components/library/SFieldMultiSelect';
import SFieldSelect from '../../../components/library/SFieldSelect';
import SFieldText from '../../../components/library/SFieldText';
import { submitNewSubscription, loadSubscription, resetSubscription, updateSubscription, deleteSubscription } from '../actions';
import { loadApi } from '../../apis/actions';
import { load } from '../../apps/actions';

class SubscriptionsCreatePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditEnabled: true,
      isLoadingAsyncContent: false,
      isApisLoaded: false,
      isAppsLoaded: false,
      apis: this.props.apis ? this.props.apis.list : [],
      selectedApis: [],
      apps: this.props.apps ? this.props.apps.list : [],
      isDetailPage: this.props.params.id, // needs to parse window location to detect if an id is present, i.e. detail page
      errors: null
    };

    this.getConfig = this.getConfig.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.isProcessing = this.isProcessing.bind(this);
    this.redirectUser = this.redirectUser.bind(this);
    this.onSubscriptionSubmit = this.onSubscriptionSubmit.bind(this);
    this.deleteSubscription = this.deleteSubscription.bind(this);
  }

  getConfig() {
    return ({
      backLabel: Keys.BUTTON_BACK_TO_LIST,
      submitLabel: Keys.BUTTON_SUBMIT,
      isDetailPage: this.state.isDetailPage,
      isEditEnabled: this.state.isEditEnabled,
      remoteProps: this.props,
      errors: this.state.errors,
      onSubmit: this.props.handleSubmit(this.onSubscriptionSubmit),
      backAction: this.redirectUser,
      toggleEditAction: this.toggleEdit,
      deleteAction: this.deleteSubscription,
      isProcessingAction: this.isProcessing
    });
  }

  // setState() does not immediately mutate this.state but creates a pending state transition.
  // Accessing this.state after calling this method can potentially return the existing value.
  // There is no guarantee of synchronous operation of calls to setState and calls may be batched
  // for performance gains.
  // In other words: do not use console.log here to check the state has been properly set :)
  componentDidMount() {
    if (this.state.isDetailPage) {
      this.setState({
        isEditEnabled: false,
      });
      // Load content
      this.props.loadSubscription({
        id: this.props.params.id
      });
    } else {
      // Explicitely reset state Subscription values (redux-form only reset initialValues property)
      this.props.resetSubscription();
    }

    if (!this.state.isDetailPage) {
      // Load apis
      this.props.loadApi();
      // Load apps
      this.props.load();
    }

    this.props.reset();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    } else if (nextProps.lastCRUDState &&
      (nextProps.lastCRUDState.isUpdateSuccessful() ||
        nextProps.lastCRUDState.isDeleteSuccessful() ||
        nextProps.lastCRUDState.isSubmitSuccessful())) {
      this.redirectUser();
    }

    // Dropdowns

    // All APIs and apps
    if (!this.state.isDetailPage) {
      // Get the apis
      if (nextProps && nextProps.apis && nextProps.apis.list) {
        this.setState({
          apis: nextProps.apis.list,
          isApisLoaded: true
        });
      }
      // Get app
      if (nextProps && nextProps.apps && nextProps.apps.list) {
        this.setState({
          apps: nextProps.apps.list,
          isAppsLoaded: true
        });
      }
    }
    // Only lookup current values (detail)
    else {
      // Lookups
      if (nextProps.lastCRUDState.isLoadSuccessful() && !this.state.isLoadingAsyncContent) {
        this.setState({
          isLoadingAsyncContent: true
        });
        // Lookup apis
        this.props.loadApi({
          apis: Object.values(nextProps.initialValues.getApis())
        });
        // Lookup apps
        this.props.load({
          apps: [nextProps.initialValues.getAppId()]
        });
      } // Get the loaded apis
      if (nextProps.apisCRUDState && nextProps.apisCRUDState.isLoadSuccessful()) {
        this.setState({
          apis: nextProps.apis.list,
          selectedApis: nextProps.apis.list,
          isApisLoaded: true
        });
      }
      // Get the loaded apps
      if (nextProps.appsCRUDState && nextProps.appsCRUDState.isLoadSuccessful()) {
        this.setState({
          apps: nextProps.apps.list,
          isAppsLoaded: true
        });
      }
      // TODO: Handle errors
      // TODO: Set isLoading to false
    }
  }

  isProcessing() {
    return (!this.state.isApisLoaded && !this.state.isAppsLoaded);
  }

  redirectUser() {
    this.props.router.replace('/subscriptionslist');
  }

  onSubscriptionSubmit(newValues) {
    if (this.state.isDetailPage) {
      return this.props.updateSubscription(newValues);
    } else {
      return this.props.submitNewSubscription(newValues);
    }
  }

  deleteSubscription() {
    this.props.deleteSubscription(this.props.initialValues.id);
  }

  toggleEdit() {
    this.setState({
      isEditEnabled: !this.state.isEditEnabled
    });
  }

  renderStatus() {
    if (this.state.isDetailPage) {
      return (
        <Row className="form-group">
          <Field
            type='text'
            name='status'
            label='Status'
            size={8}
            component={SFieldText}
            staticValue={this.props.initialValues.getStatus()}
            disabled
          />
        </Row>
      );
    }
  }

  render() {
    return (
      <GenericLayout config={this.getConfig()}>
        <Row className="form-group">
          <Field
            name='apis'
            label='Apis'
            placeholder='Select your APIs...'
            component={SFieldMultiSelect}
            staticValue={this.state.apis}
            onChange={(event, value) => { this.setState({ selectedApis: value }) }}
            fullWidth={true}
            size={8}
            disabled={(this.state.isDetailPage && !this.state.isEditEnabled) ||
              !this.state.apis ||
              (this.state.apis && !this.state.apis.length)}
          >
            {this.state.apis.map((item) => (<ListItem key={item.id} value={item.id} primaryText={item.name} />))}
          </Field>
        </Row>
        <Row className="form-group">
          <Field
            name='app_id'
            label='Application'
            placeholder='Select your application...'
            component={SFieldSelect}
            staticValue={this.state.apps}
            size={8}
            disabled={(this.state.isDetailPage && !this.state.isEditEnabled) || !this.state.apps.length}
          >
            {this.state.apps.map((item) => (<MenuItem key={item.id} value={item.id} primaryText={item.name} />))}
          </Field>
        </Row>
        <Row className="form-group">
          <Field
            type='text'
            name='name'
            label='Name'
            size={8}
            placeholder='e.g. Apis subscription for my project'
            component={SFieldText}
            staticValue={this.props.initialValues.getName()}
            disabled={this.state.isDetailPage && !this.state.isEditEnabled}
          />
        </Row>
        <Row className="form-group">
          <Field
            type='text'
            name='description'
            label='Description'
            size={8}
            placeholder='e.g. Description for your project Apis subscription'
            component={SFieldText}
            staticValue={this.props.initialValues.getDescription()}
            disabled={this.state.isDetailPage && !this.state.isEditEnabled}
          />
        </Row>
        {this.renderStatus()}
        {LayoutHelper.renderActions(this.getConfig())}
      </GenericLayout >
    );
  }

}

const mapStateToProps = (state) => {
  return {
    initialValues: state.subscriptions.subscription,
    lastCRUDState: state.subscriptions.CRUDState,
    apis: state.apis.list,
    apisIsProcessing: state.apis.isProcessing,
    apisCRUDState: state.apis.CRUDState,
    apisErrors: state.apis.errors,
    apps: state.apps.list,
    appsIsProcessing: state.apps.isProcessing,
    appsCRUDState: state.apps.CRUDState,
    appsErrors: state.apps.errors
  }
};

export const SubscriptionsCreateForm = reduxForm({
  form: 'subscriptionForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(SubscriptionsCreatePage);

export default connect(mapStateToProps, { loadApi, load, submitNewSubscription, loadSubscription, resetSubscription, updateSubscription, deleteSubscription })(injectIntl(SubscriptionsCreateForm));

import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { injectIntl } from 'react-intl';
import { Row } from 'react-bootstrap';
import { Keys } from './SubscriptionsPage_messages';
import Subscription from '../model';
import * as actions from '../actionTypes';
import GenericLayout from '../../../components/library/GenericLayout';
import * as LayoutHelper from '../../../components/library/LayoutHelper';
import SField from '../../../components/library/SField';
import { submitNewSubscription, loadSubscription, resetSubscription, updateSubscription, deleteSubscription } from '../actions';

class SubscriptionsCreatePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditEnabled: true,
      isDetailPage: this.props.params.id, // needs to parse window location to detect if an id is present, i.e. detail page
      errors: null
    };

    this.getConfig = this.getConfig.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
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
      deleteAction: this.deleteSubscription
    });
  }

  // setState() does not immediately mutate this.state but creates a pending state transition.
  // Accessing this.state after calling this method can potentially return the existing value.
  // There is no guarantee of synchronous operation of calls to setState and calls may be batched
  // for performance gains.
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
    this.props.router.replace('/subscriptionslist');
  }

  onSubscriptionSubmit(newValues) {
    var newSubscription = new Subscription();
    newSubscription = newSubscription
      .setId(newValues.id ? newValues.id : this.props.initialValues.getId())
      .setName(newValues.name ? newValues.name : this.props.initialValues.getName())
      .setDescription(newValues.description ? newValues.description : this.props.initialValues.getDescription())
      .setAppId(newValues.app_id ? newValues.app_id : this.props.initialValues.getAppId())
      .setApis(newValues.apis ? newValues.apis : this.props.initialValues.getApis())
    if (this.state.isDetailPage) {
      return this.props.updateSubscription(newSubscription);
    } else {
      return this.props.submitNewSubscription(newSubscription);
    }
  }

  deleteSubscription() {
    this.props.deleteSubscription(this.props.initialValues);
  }

  toggleEdit() {
    this.setState({
      isEditEnabled: !this.state.isEditEnabled
    });
  }

  render() {
    return (
      <GenericLayout config={this.getConfig()}>
        <Row className="form-group">
          <Field
            type='text'
            name='name'
            label='Name'
            size={8}
            placeholder='e.g. Apis subscription for my project'
            component={SField}
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
            placeholder='e.g. Apis subscription for my project'
            component={SField}
            staticValue={this.props.initialValues.getDescription()}
            disabled={this.state.isDetailPage && !this.state.isEditEnabled}
          />
        </Row>
        <Row className="form-group">
          <Field
            type='text'
            name='status'
            label='Status'
            size={8}
            component={SField}
            staticValue={this.props.initialValues.getStatus()}
            disabled
          />
        </Row>
        {LayoutHelper.renderActions(this.getConfig())}
      </GenericLayout >
    );
  }

}

const mapStateToProps = (state) => {
  return {
    initialValues: state.subscriptions.subscription,
    currentAction: state.subscriptions.currentAction
  }
};

export const SubscriptionsCreateForm = reduxForm({
  form: 'SubscriptionForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(SubscriptionsCreatePage);

export default connect(mapStateToProps, { submitNewSubscription, loadSubscription, resetSubscription, updateSubscription, deleteSubscription })(injectIntl(SubscriptionsCreateForm));

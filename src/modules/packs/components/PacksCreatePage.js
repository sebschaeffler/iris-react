import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { injectIntl } from 'react-intl';
import { Row } from 'react-bootstrap';
import { Keys } from './PacksPage_messages';
import SFieldText from '../../../components/library/SFieldText';
import GenericLayout from '../../../components/library/GenericLayout';
import { submitNewPack, loadPack, resetPack, updatePack, deletePack } from '../actions';

class PacksCreatePage extends Component {

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
    this.onPackSubmit = this.onPackSubmit.bind(this);
    this.deletePack = this.deletePack.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
  }

  getConfig() {
    return ({
      backLabel: Keys.BUTTON_BACK_TO_LIST,
      submitLabel: Keys.BUTTON_SUBMIT,
      isDetailPage: this.state.isDetailPage,
      isEditEnabled: this.state.isEditEnabled,
      remoteProps: this.props,
      errors: this.state.errors,
      onSubmit: this.props.handleSubmit(this.onPackSubmit),
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
      this.props.loadPack({
        id: this.props.params.id
      });
    } else {
      // Explicitely reset state values (redux-form only reset initialValues property)
      this.props.resetPack();
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
  }

  redirectUser() {
    this.props.router.replace('/packageslist');
  }

  onPackSubmit(newValues) {
    if (this.state.isDetailPage) {
      return this.props.updatePack(newValues);
    } else {
      return this.props.submitNewPack(newValues);
    }
  }

  deletePack() {
    this.props.deletePack(this.props.initialValues.getId());
  }

  toggleStatus() {
    console.log("Toggle")
    //his.props.toggleStatus();
  }

  toggleEdit() {
    this.setState({
      isEditEnabled: !this.state.isEditEnabled
    });
  }

  render() {
    return (
      <GenericLayout config={this.getConfig()} status={this.props.initialValues.getStatus()}>
        <Row className="form-group">
          <Field
            type='text'
            name='name'
            label='Name'
            placeholder='Name'
            size={8}
            component={SFieldText}
            staticValue={this.props.initialValues.getName()}
            disabled={this.state.isDetailPage && !this.state.isEditEnabled} />
        </Row>
        <Row className="form-group">
          <Field
            type='textarea'
            name='description'
            label='Description'
            size={8}
            component={SFieldText}
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
            placeholder='http://www.yourpackage.com'
            component={SFieldText}
            staticValue={this.props.initialValues.getCallbackUrl()}
            disabled={this.state.isDetailPage && !this.state.isEditEnabled} />
        </Row>
      </GenericLayout>
    );
  }

}

export const validate = (values) => {
  let errors = {};

  return errors;
}

const mapStateToProps = (state) => {
  return {
    initialValues: state.packs.pack,
    isProcessing: state.packs.isProcessing,
    lastCRUDState: state.packs.CRUDState
  }
};

export const PacksCreateForm = reduxForm({
  form: 'packForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(PacksCreatePage);

export default connect(mapStateToProps, { submitNewPack, loadPack, resetPack, updatePack, deletePack })(injectIntl(PacksCreateForm));

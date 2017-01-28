import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Panel, Form, FormGroup, FormControl, Col, ControlLabel, Button } from 'react-bootstrap';
import PageHeader from '../../../components/library/PageHeader';
import msg, { Keys } from './AddApiPage_messages';
import appMsg, { Keys as AppKeys } from '../../../i18n/keys';
import { Api } from '../model';
import { loadDefaultValues } from '../actions';

class AddApiPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      generalPanelExpanded: true,
      definitionPanelExpanded: true,
      policiesPanelExpanded: true
    };

    this.toggleGeneralPanel = this.toggleGeneralPanel.bind(this);
    this.toggleDefinitionPanel = this.toggleDefinitionPanel.bind(this);
    this.togglePoliciesPanel = this.togglePoliciesPanel.bind(this);
  }

  componentDidMount() {
    this.props.loadDefaultValues();
    // reduxForm expectsthis.props.initialValues to get the default values through mapStateToProps
  }


  onSubmit(values) {
    const result = new Api({
      name: values.name,
      context: values.context,
      version: values.version,
      visibility: values.visibility,
      thumbnail: null,
      description: values.description,
      tags: values.tags,
      api_endpoint: values.api_endpoint,
      doc_endpoint: values.doc_endpoint
    });
    console.log(result);
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

  renderField({ input, meta: { touched, error, warning }, type, placeholder, disabled }) {
    return (
      <div>
        <FormControl
          type={type}
          componentClass={type === 'textarea' || type === 'select' ? type : 'input'}
          {...input}
          disabled={disabled}
          placeholder={placeholder}
          />
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    );
  }

  render() {
    return (
      <div className='page-wrapper content'>
        <PageHeader title={this.props.intl.formatMessage(msg(Keys.SECTIONS_ADD_API_TITLE))} headerIcon='plus' rootText={this.props.intl.formatMessage(appMsg(AppKeys.APP_TITLE))} />
        <Form horizontal onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Panel collapsible defaultExpanded header='General details' onSelect={this.toggleGeneralPanel} expanded={this.state.generalPanelExpanded} >
            <FormGroup controlId='name'>
              <Col componentClass={ControlLabel} sm={2}>
                Name
                </Col>
              <Col sm={4}>
                <Field
                  type='text'
                  name='name'
                  placeholder={this.props.intl.formatMessage(msg(Keys.SHARE_PRICES_PLACEHOLDER))}
                  component={this.renderField} />
              </Col>
              <Col componentClass={ControlLabel} sm={1}>
                Context
                </Col>
              <Col sm={3}>
                <Field
                  type='text'
                  name='context'
                  component={this.renderField}
                  disabled />
              </Col>
            </FormGroup>
            <FormGroup controlId='context'>
              <Col componentClass={ControlLabel} sm={2}>
                Version
                </Col>
              <Col sm={2}>
                <Field
                  type='text'
                  name='version'
                  placeholder='e.g. 1.0.0'
                  component={this.renderField}
                  />
              </Col>
              <Col componentClass={ControlLabel} sm={2} className='center-aligned-light-label'>
                (current configuration)
                </Col>
              <Col componentClass={ControlLabel} sm={1}>
                Visibility
                </Col>
              <Col sm={3}>
                <Field
                  type='text'
                  name='visibility'
                  component={this.renderField}
                  disabled />
              </Col>
            </FormGroup>
            <FormGroup controlId='description'>
              <Col componentClass={ControlLabel} sm={2}>
                Description
                </Col>
              <Col sm={8}>
                <Field
                  type='textarea'
                  name='description'
                  component={this.renderField}
                  placeholder='High level description of the API'
                  />
              </Col>
            </FormGroup>
            <FormGroup controlId='tags'>
              <Col componentClass={ControlLabel} sm={2}>
                Tags
                </Col>
              <Col sm={8}>
                <Field
                  type='text'
                  name='tags'
                  component={this.renderField}
                  placeholder='e.g. share prices, options, futures'
                  />
              </Col>
            </FormGroup>
          </Panel>
          <Panel collapsible defaultExpanded header='API definition' onSelect={this.toggleDefinitionPanel} expanded={this.state.definitionPanelExpanded} >
            <FormGroup controlId='api_endpoint'>
              <Col componentClass={ControlLabel} sm={2}>
                Api endpoint
                </Col>
              <Col sm={8}>
                <Field
                  type='text'
                  name='api_endpoint'
                  component={this.renderField}
                  placeholder='e.g. http://www.example.com/sharePrices'
                  />
              </Col>
            </FormGroup>
            <FormGroup controlId='doc_endpoint'>
              <Col componentClass={ControlLabel} sm={2}>
                Documentation endpoint
                </Col>
              <Col sm={8}>
                <Field
                  type='text'
                  name='doc_endpoint'
                  component={this.renderField}
                  placeholder='e.g. http://www.example.com/sharePrices/swagger-ui'
                  />
              </Col>
            </FormGroup>
          </Panel>
          <Panel collapsible defaultExpanded header='Policies' onSelect={this.togglePoliciesPanel} expanded={this.state.policiesPanelExpanded} >
            <Col componentClass={ControlLabel} sm={14}>
              Default policies will be enabled.
                </Col>
          </Panel>
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
      </div>
    );
  }

}

export const validate = (values) => {
  console.log('Validation: ', values);
  let errors = {};
  if (!values.name || values.name === '') {
    // this.props.intl.formatMessage({id: })
    errors.name = 'Name is required';
  }
  return errors;
}

const mapStateToProps = (state) => {
  return {
    initialValues: state.addapi
  }
};

export const AddApiCreateForm = reduxForm({
  form: 'addApiForm',
  validate
})(AddApiPage);

export default connect(mapStateToProps, { loadDefaultValues })(injectIntl(AddApiCreateForm));

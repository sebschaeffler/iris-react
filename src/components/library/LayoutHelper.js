import React from 'react';
import { FormGroup, Col, Button, Row } from 'react-bootstrap';
import { Field } from 'redux-form/immutable';
import SField from './SField';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import { Keys as AppKeys } from '../../i18n/keys';

export function renderTechnicalId(props) {
  const { isDetailPage, remoteProps } = props;
  if (isDetailPage) {
    return (
      <Row className="form-group">
        <Field
          type='text'
          name='id'
          label='Technical identifier'
          size={8}
          component={SField}
          staticValue={remoteProps.initialValues.getId()}
          disabled />
      </Row>
    );
  }
};

export function renderErrors(errors) {
  if (errors) {
    return (
      <div>
        {errors}
      </div>
    );
  }
};

export function renderBackAction(props) {
  const {
    backLabel, isDetailPage, isEditEnabled, toggleEditAction, backAction
  } = props;
  if (!isDetailPage || !isEditEnabled) {
    return (
      <div className='button-left'>
        <FormGroup>
          <Col>
            <Button
              className='default-submit-button'
              type='reset'
              onClick={backAction}>
              <FontAwesome name='arrow-left' />
              <span className="button-text">
                <FormattedMessage id={backLabel} />
              </span>
            </Button>
          </Col>
        </FormGroup>
      </div>
    );
  } else if (isEditEnabled) {
    return (
      <div className='button-left'>
        <FormGroup>
          <Col>
            <Button
              className='default-submit-button'
              type='reset'
              onClick={toggleEditAction}>
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
};

export function renderActions(props) {
  const {
    submitLabel, isDetailPage, isEditEnabled, toggleEditAction, deleteAction, remoteProps
  } = props;

  if (!isDetailPage || isEditEnabled) {
    return (
      <div className='button-left'>
        <Col>
          <Button
            className='default-submit-button'
            type='submit'
            disabled={remoteProps.pristine || remoteProps.submitting}>
            <FormattedMessage id={submitLabel} />
          </Button>
          <Button
            className='query-reset'
            type='reset'
            onClick={remoteProps.reset}
            disabled={remoteProps.pristine || remoteProps.submitting}>
            <FormattedMessage id={AppKeys.VIEWS_BUTTONS_RESET} />
          </Button>
        </Col>
      </div>
    );
  } else if (isDetailPage && !isEditEnabled) {
    return (
      <div className='button-left'>
        <Col>
          <Button
            className='default-submit-button'
            type='button'
            onClick={toggleEditAction}>
            <FormattedMessage id={AppKeys.VIEWS_BUTTONS_EDIT} />
          </Button>
          <Button
            className='default-submit-button'
            type='button'
            onClick={deleteAction}>
            <FormattedMessage id={AppKeys.VIEWS_BUTTONS_DELETE} />
          </Button>
        </Col>
      </div>
    );
  }
};

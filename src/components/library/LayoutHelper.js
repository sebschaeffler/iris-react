import React from 'react';
import { FormGroup, Col, Row } from 'react-bootstrap';
import { Field } from 'redux-form/immutable';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationChevronleft from 'material-ui/svg-icons/navigation/chevron-left';
import SFieldText from './SFieldText';
import { FormattedMessage } from 'react-intl';
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
          component={SFieldText}
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
      <div className='button-left button-top'>
        <FormGroup>
          <Col>
            <RaisedButton
              primary={true}
              className='default-button'
              label={<FormattedMessage id={backLabel} />}
              onClick={backAction}
              icon={<NavigationChevronleft />} />
          </Col>
        </FormGroup>
      </div>
    );
  } else if (isEditEnabled) {
    return (
      <div className='button-left'>
        <FormGroup>
          <Col>
            <RaisedButton
              primary={true}
              className='default-button'
              label={<FormattedMessage id={AppKeys.VIEWS_BUTTONS_CANCEL} />}
              onClick={toggleEditAction}
              icon={<NavigationChevronleft />} />
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
      <div className='button-left button-bottom'>
        <Col>
          <RaisedButton
            primary={true}
            className='default-button'
            label={<FormattedMessage id={submitLabel} />}
            type='submit'
            disabled={remoteProps.pristine || remoteProps.submitting} />
          <RaisedButton
            className='default-button'
            label={<FormattedMessage id={AppKeys.VIEWS_BUTTONS_RESET} />}
            type='reset'
            onClick={remoteProps.reset}
            disabled={remoteProps.pristine || remoteProps.submitting} />
        </Col>
      </div>
    );
  } else if (isDetailPage && !isEditEnabled) {
    return (
      <div className='button-left button-bottom'>
        <Col>
          <RaisedButton
            primary={true}
            className='default-button'
            label={<FormattedMessage id={AppKeys.VIEWS_BUTTONS_EDIT} />}
            type='button'
            onClick={toggleEditAction} />
          <RaisedButton
            className='default-button'
            label={<FormattedMessage id={AppKeys.VIEWS_BUTTONS_DELETE} />}
            type='button'
            onClick={deleteAction} />
        </Col>
      </div>
    );
  }
};

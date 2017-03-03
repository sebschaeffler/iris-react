import React from 'react';
import {FormGroup, Col} from 'react-bootstrap';
import {Field} from 'redux-form/immutable';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavigationChevronleft from 'material-ui/svg-icons/navigation/chevron-left';
import SFieldText from './SFieldText';
import {FormattedMessage} from 'react-intl';
import {Keys as AppKeys} from '../../i18n/keys';

export function renderTechnicalId(props) {
  const {isDetailPage, remoteProps} = props;
  if (isDetailPage) {
    return (
      <Field
        type='text'
        name='id'
        label='Technical identifier'
        size={4}
        component={SFieldText}
        staticValue={remoteProps.initialValues.getId()}
        disabled/>
    );
  }
};

export function renderStatus(props) {
  const {isDetailPage, remoteProps} = props;
  if (isDetailPage) {
    return (
      <Field
        type='text'
        name='status'
        label='Current status'
        size={4}
        component={SFieldText}
        staticValue={remoteProps.initialValues.getStatus()}
        disabled
      />
    );
  }
}

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
              className='default-button'
              label={<FormattedMessage id={backLabel} />}
              onClick={backAction}
              icon={<NavigationChevronleft />}/>
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
              primary
              className='default-button'
              label={<FormattedMessage id={AppKeys.VIEWS_BUTTONS_CANCEL} />}
              onClick={toggleEditAction}
              icon={<NavigationChevronleft />}/>
          </Col>
        </FormGroup>
      </div>
    );
  }
};

// Displays a floating action button
// Props expects the action to be triggered when clicking on the button
// Icon should match material-ui component e.g. <ContentAdd /> for + icon
export function renderFloatingActionButton(props) {
  return (
    <FloatingActionButton
      className='floating-button'
      onClick={props.action}>
      {props.icon}
    </FloatingActionButton>
  );
}

// Displays a floating action button
// Props expects the action to be triggered when clicking on the button
// Icon should match material-ui component e.g. <ContentAdd /> for + icon
// TODO: accept list of actions
export function renderActionButton(props) {
  if (props.action) {
    return (
      <div className={!props.action.alignment || props.action.alignment === 'right' ? 'button-right' : 'button-left'}>
        <FormGroup>
          <Col>
            <RaisedButton
              href={props.action.url}
              target={props.action.target}
              primary={props.action.primary || false}
              secondary={props.action.secondary || false}
              label={props.action.label || ''}
              className='default-button'
              style={props.action.style}
              icon={props.action.icon}
            />
          </Col>
        </FormGroup>
      </div>
    );
  }
}

export function renderActions(props) {
  const {
    submitLabel, isDetailPage, isEditEnabled, toggleEditAction, deleteAction, toggleStatusAction, remoteProps
  } = props;

  if (!isDetailPage || isEditEnabled) {
    return (
      <div className='button-left button-bottom'>
        <Col>
          <RaisedButton
            primary
            className='default-button'
            label={<FormattedMessage id={submitLabel} />}
            type='submit'
            disabled={remoteProps.pristine || remoteProps.submitting}/>
          <RaisedButton
            className='default-button'
            label={<FormattedMessage id={AppKeys.VIEWS_BUTTONS_RESET} />}
            type='reset'
            onClick={remoteProps.reset}
            disabled={remoteProps.pristine || remoteProps.submitting}/>
        </Col>
      </div>
    );
  } else if (isDetailPage && !isEditEnabled) {
    return (
      <div className='button-left button-bottom'>
        <Col>
          <RaisedButton
            primary
            className='default-button'
            label={<FormattedMessage id={AppKeys.VIEWS_BUTTONS_EDIT} />}
            type='button'
            onClick={toggleEditAction}/>
          <RaisedButton
            className='default-button'
            label={<FormattedMessage id={AppKeys.VIEWS_BUTTONS_DELETE} />}
            type='button'
            onClick={deleteAction}/>
          <RaisedButton
            className='default-button'
            label={remoteProps.initialValues.getStatus().toUpperCase() === 'Active'.toUpperCase() ? 'Disable' : 'Enable'}
            type='button'
            onClick={toggleStatusAction}/>
        </Col>
      </div>
    );
  }
};

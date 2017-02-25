import React from 'react';
import { Panel, Tooltip, OverlayTrigger } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

const SubscriptionWidget = (props) => {
  const icon = 'pull-right '.concat(props.css);
  const openTip = <Tooltip id="opentip">Open <strong>{props.headerText}</strong> details</Tooltip>;
  const deleteTip = <Tooltip id="deletetip">Delete <strong>{props.headerText}</strong>?</Tooltip>;

  function _delete() {
    props.deleteAction(props.id);
  }

  return (
    <Panel className='stat' bsStyle={props.widgetStyle}
      header={
        <Link to={props.linkTo}>
          <div className='stat-panel-heading row'>
            <div className='col-xs-3'>
              <span className='big_icon'><FontAwesome name={props.icon} /></span>
            </div>
            <div className='col-xs-9 text-right'>
              <div className='huge'>{props.headerText}</div>
              <div className='huge'>{props.secondaryText}</div>
            </div>
          </div>
        </Link>
      }
      footer={
        <div>
          <Link to={props.linkTo}>
            <OverlayTrigger placement="bottom" overlay={openTip}>
              <span className={icon.concat(' default-action')}><FontAwesome name='arrow-circle-o-right' /></span>
            </OverlayTrigger>
          </Link>
          <span className='pull-right'>
            <OverlayTrigger placement="bottom" overlay={deleteTip}>
            <div onClick={_delete}>
              <span className='widget-action trash'><FontAwesome name='trash-o' /></span>
            </div>
          </OverlayTrigger>
          </span>
        <div className='clearfix'></div>
        </div >
      }
/>
  );

}

export default SubscriptionWidget;

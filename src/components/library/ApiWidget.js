import React from "react";
import { Panel, Tooltip, OverlayTrigger } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router";

const MAX_STARS = 5;

function _displayRating(rating) {
  var result = [];
  while (result.length < MAX_STARS) {
    const icon = result.length < rating ? 'star' : 'star-o';
    result.push(<span key={result.length} className='widget-rating-icon'><FontAwesome name={icon} /></span>);
  }
  return result;
}

const ApiWidget = (props) => {
  const icon = 'pull-right '.concat(props.css);
  const subscribeTip = <Tooltip id="subscribe">Subscribe to <strong>{props.headerText}</strong></Tooltip>;
  const openTip = <Tooltip id="opentip">Open <strong>{props.headerText}</strong> details</Tooltip>;
  const deleteTip = <Tooltip id="deletetip">Delete <strong>{props.headerText}</strong>?</Tooltip>;

  function _delete(e) {
    props.deleteAction(props.id);
  }

  return (
    <div className="widget-link">
      <Panel className='stat' bsStyle={props.widgetStyle}
        header={
          <Link to={props.linkTo}>
            <div className='stat-panel-heading row'>
              <div className='col-xs-3'>
                <span className='big_icon'><FontAwesome name={props.icon} /></span>
              </div>
              <div className='col-xs-9 text-right'>
                <div className='huge'>{props.headerText}</div>
                <div className='huge'>{props.count} <FontAwesome name="user" /></div>
                <div className='last-item'>{props.owner}</div>
              </div>
            </div>
          </Link>
        }
        footer={
          <div>
            <span className='widget-star'>
              {_displayRating(props.rating)}
            </span>
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
            <span className='pull-right'>
              <OverlayTrigger placement="bottom" overlay={subscribeTip}>
                <span className={icon.concat(' widget-action default-action')}><FontAwesome name='check' /></span>
              </OverlayTrigger>
            </span>
            <div className='clearfix'></div>
          </div>
        }
      />
    </div>
  );

}

export default ApiWidget;

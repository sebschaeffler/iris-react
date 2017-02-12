import React from 'react';
import { Panel } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

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

  return (
    <Panel className='stat' bsStyle={props.widgetStyle}
      header={
        <div className='stat-panel-heading row'>
          <div className='col-xs-3'>
            <span className='big_icon'><FontAwesome name={props.icon} /></span>
          </div>
          <div className='col-xs-9 text-right'>
            <div className='huge'>{props.headerText}</div>
            <div className='huge'>{props.count} <FontAwesome name="user" /></div>
          </div>
        </div>
      }
      footer={
        <Link to={props.linkTo}>
          <span className='widget-star'>
            {_displayRating(props.rating)}
          </span>
          <span className={icon}><FontAwesome name='arrow-circle-o-right' /></span>
          <div className='clearfix'></div>
        </Link>
      }
      />
  );

}

export default ApiWidget;

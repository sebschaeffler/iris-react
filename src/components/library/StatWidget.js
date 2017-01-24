// @flow
import React from 'react';
import { Panel } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

type Props = {|
  headerText: string,
  css: string,
  widgetStyle: string,
  footerText: string,
  icon: string,
  count: string,
  linkTo: string
|};

const StatWidget = (props: Props) => {
    const footerText = "pull-left ".concat(props.css);
    const icon = "pull-right ".concat(props.css);

		return (
    <Panel className="stat" bsStyle={props.widgetStyle}

      header={
        <div className="stat-panel-heading row">
          <div className="col-xs-3">
            <span className="big_icon"><FontAwesome name={props.icon} /></span>
          </div>
          <div className="col-xs-9 text-right">
            <div className="huge">{props.count}</div>
            <div>{props.headerText}</div>
          </div>
        </div>
      }

      footer={
        <Link to={props.linkTo}>
          <span className={footerText}>{props.footerText}</span>
          <span className={icon}><FontAwesome name="arrow-circle-o-right" /></span>
          <div className="clearfix"></div>
        </Link>
      }
      />

  );
};

export default StatWidget;

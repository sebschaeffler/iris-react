import React from 'react';
import FontAwesome from 'react-fontawesome';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router';
import msg, { Keys } from './PageHeader_messages';

function renderBreadcrumbs(rootText, youAreHereText, display, title) {
  if (!display) {
    return (<div></div>);
  }

  return (
    <div className="col-xs-10 col-lg-6 col-md-6 pull-right breadcrumb-wrapper">
      <span className="label">{youAreHereText}</span>
      <ol className="breadcrumb">
        <li><Link to="/">{rootText}</Link></li>
        <li className="active">{title}</li>
      </ol>
    </div>
  );
};

export const PageHeader = (props) => {
  const {title, headerIcon, intl,
    display = true
  } = props;

  const rootText = props.rootText || intl.formatMessage(msg(Keys.PAGEHEADER_MESSAGES_HOME));
  const youAreHereText = props.youAreHereText || intl.formatMessage(msg(Keys.PAGEHEADER_MESSAGES_YOUAREHERE));

  if (!title || !headerIcon) {
    return (<div></div>);
  }

  return (
    <div className="page-header">
        <div className="row">
          <h2 className="col-lg-5 col-md-8 pageheader">
            <FontAwesome name={headerIcon} className='header_icon'/>
            &nbsp;{title}
          </h2>
          { renderBreadcrumbs(rootText, youAreHereText, display, title) }
        </div>
    </div>
  );
};

export default injectIntl(PageHeader);

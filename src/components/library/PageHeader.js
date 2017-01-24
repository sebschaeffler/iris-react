// @flow
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router';
import msg, { Keys } from './PageHeader_messages';
import type { PropsWithIntl } from '../../types';

function renderBreadcrumbs(rootText, youAreHereText, display, title) {
  if (!display) {
    return (<div></div>);
  }

  return (
    <div className="col-xs-12 col-lg-4 col-md-6 pull-right breadcrumb-wrapper">
      <span className="label">{youAreHereText}</span>
      <ol className="breadcrumb">
        <li><Link to="/">{rootText}</Link></li>
        <li className="active">{title}</li>
      </ol>
    </div>
  );
};

type Props = PropsWithIntl<{|
  title: ?string,
  headerIcon: ?string,
  rootText?: string,
  youAreHereText?: string,
  display?: boolean
|}>;

export const PageHeader = (props: Props) => {
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
          <h2 className="col-lg-4 col-md-8">
            <FontAwesome name={headerIcon} />
            &nbsp;{title}
          </h2>
          { renderBreadcrumbs(rootText, youAreHereText, display, title) }
        </div>
    </div>
  );
};

export default injectIntl(PageHeader);

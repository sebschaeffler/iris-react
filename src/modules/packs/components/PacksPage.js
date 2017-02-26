import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PageHeader from '../../../components/library/PageHeader';
import msg, { Keys } from './PacksPage_messages';
import appMsg, { Keys as AppKeys } from '../../../i18n/keys';

class PacksPage extends Component {

  render() {
    return (
      <div className='page-wrapper content'>
        <PageHeader
          title={this.props.intl.formatMessage(msg(Keys.SECTIONS_PACKS_TITLE))}
          headerIcon='shopping-bag'
          rootText={this.props.intl.formatMessage(appMsg(AppKeys.APP_TITLE))} />
        <div className="spacer" />
        {this.props.children}
      </div>
    );
  }
}

export default connect()(injectIntl(PacksPage));

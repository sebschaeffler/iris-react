import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PageHeader from '../../../components/library/PageHeader';
import msg, { Keys } from './SubscriptionsPage_messages';
import appMsg, { Keys as AppKeys } from '../../../i18n/keys';

class SubscriptionsPage extends Component {

  render() {
    return (
      <div className='page-wrapper content'>
        <PageHeader
          title={this.props.intl.formatMessage(msg(Keys.SECTIONS_SUBSCRIPTIONS_TITLE))}
          headerIcon='pencil'
          rootText={this.props.intl.formatMessage(appMsg(AppKeys.APP_TITLE))} />
        <div className="spacer" />

        <div className='col-lg-12 col-md-8 explore-footer'>
          There are currently <span className='teal'>0</span> subscriptions(s).
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
  }
};

export default connect(mapStateToProps, {})(injectIntl(SubscriptionsPage));

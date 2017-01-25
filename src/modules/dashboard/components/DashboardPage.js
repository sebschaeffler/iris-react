import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PageHeader from '../../../components/library/PageHeader';
import msg, { Keys } from './DashboardPage_messages';
import appMsg, { Keys as AppKeys } from '../../../i18n/keys';

class DashboardPage extends Component {

  render() {
    let deadline = new Date();
    deadline.setHours(16);
    deadline.setMinutes(0);

    return (
      <div className="page-wrapper content">
        <PageHeader title={this.props.intl.formatMessage(msg(Keys.SECTIONS_DASHBOARD_TITLE))} headerIcon="home" rootText={this.props.intl.formatMessage(appMsg(AppKeys.APP_TITLE))} />
        <div className="row">

        </div>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <PageHeader title={this.props.intl.formatMessage(msg(Keys.SECTIONS_APIS_TITLE))} headerIcon="cogs" display={false} />
        <div className="row">

        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
  }
};

export default connect(mapStateToProps, {  })(injectIntl(DashboardPage));

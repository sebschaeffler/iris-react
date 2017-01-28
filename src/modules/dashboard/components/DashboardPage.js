import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PageHeader from '../../../components/library/PageHeader';
import ApiWidget from '../../../components/library/ApiWidget';
import msg, { Keys } from './DashboardPage_messages';
import appMsg, { Keys as AppKeys } from '../../../i18n/keys';

class DashboardPage extends Component {

  render() {
    return (
      <div className="page-wrapper content">
        <PageHeader title={this.props.intl.formatMessage(msg(Keys.SECTIONS_DASHBOARD_TITLE))} headerIcon="home" rootText={this.props.intl.formatMessage(appMsg(AppKeys.APP_TITLE))} />
        <div className="row">

        </div>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <PageHeader title={this.props.intl.formatMessage(msg(Keys.SECTIONS_APIS_TITLE))} headerIcon="cogs" display={false} />
        <div className="row">
          <div className="spacer" />
          <div className='col-lg-4 col-md-8'>
            <ApiWidget
              widgetStyle='info'
              icon='line-chart'
              count='1.0'
              headerText='Share prices'
              rating='4'
              linkTo='/'
              css='default-dark'
              />
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
  }
};

export default connect(mapStateToProps, {})(injectIntl(DashboardPage));

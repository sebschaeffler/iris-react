import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormattedDate,injectIntl} from 'react-intl';
import Clock from 'react-clock';
import FontAwesome from 'react-fontawesome';
import PageHeader from '../../../components/library/PageHeader';
import msg, {Keys} from './DashboardPage_messages';
import appMsg, {Keys as AppKeys} from '../../../i18n/keys';
import MarkdownElement from '../../../utils/MarkdownElement';
import gettingStartedText from './getting-started.md';

class DashboardPage extends Component {

  render() {
    return (
      <div className="page-wrapper content">
        <PageHeader title={this.props.intl.formatMessage(msg(Keys.SECTIONS_DASHBOARD_TITLE))} headerIcon="home"
                    rootText={this.props.intl.formatMessage(appMsg(AppKeys.APP_TITLE))}/>
        <div className="spacer"/>
        <div className="row" style={{ marginLeft: 6 }}>
          <div className="row">
            <div className="col-lg-2 col-md-6">
              <div className="panel panel-info panel-alt widget-today">
                <div className="panel-heading text-center">
                  <FontAwesome name="calendar" />
                  {/*<div className="calendar-div"><span className="calendar-text">3 events</span></div>*/}
                </div>
                <div className="panel-body text-center">
                  <h3 className="today">
                    <FormattedDate value={Date.now()} day='2-digit' month='short' year='numeric' />
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="panel panel-info panel-alt widget-time">
                <div className="panel-heading text-center">
                  <FontAwesome name="clock-o" />
                </div>
                <div className="panel-body text-center">
                  <h3 className="today"><Clock /></h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="spacer"/>
        <PageHeader title={this.props.intl.formatMessage(msg(Keys.SECTIONS_GETTING_STARTED_TITLE))} headerIcon="rocket"
                    display={false}/>
        <div className="spacer"/>
        <div className="getting-started-div">
          <MarkdownElement text={gettingStartedText}/>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {}
};

export default connect(mapStateToProps, {})(injectIntl(DashboardPage));

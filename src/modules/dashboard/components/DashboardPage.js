import React, { Component } from 'react';
import { connect } from 'react-redux';
/*import { Form, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router';*/
import { FormattedDate, injectIntl } from 'react-intl';
import Clock from 'react-clock';
/*import moment from 'moment';
import numeral from 'numeral';*/
import FontAwesome from 'react-fontawesome';
import PageHeader from '../../../components/library/PageHeader';
//import StatWidget from "../../../components/library/StatWidget";
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
          <div className="col-lg-2 col-md-6">
            <div className="panel panel-blue panel-alt widget-today">
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
            <div className="panel panel-blue panel-alt widget-time">
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
    );
  }
};

const mapStateToProps = (state) => {
  return {
  }
};

export default connect(mapStateToProps, {  })(injectIntl(DashboardPage));

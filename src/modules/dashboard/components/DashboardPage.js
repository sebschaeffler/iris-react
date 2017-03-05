import React, {Component} from 'react';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
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
          <div className='col-lg-4 col-md-2'>
            No indicators are available yet.
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PageHeader from '../../../components/library/PageHeader';
import msg, { Keys } from './AppsPage_messages';
import appMsg, { Keys as AppKeys } from '../../../i18n/keys';

class AppsPage extends Component {

  constructor(props) {
    super(props);
    this.createNewApp = this.createNewApp.bind(this);
  }

  createNewApp() {

  }

  render() {
    return (
      <div className='page-wrapper content'>
        <PageHeader
          title={this.props.intl.formatMessage(msg(Keys.SECTIONS_APPS_TITLE))}
          headerIcon='list'
          rootText={this.props.intl.formatMessage(appMsg(AppKeys.APP_TITLE))} />
        <div className="spacer" />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
};

export default connect(mapStateToProps, {})(injectIntl(AppsPage));

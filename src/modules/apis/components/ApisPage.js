import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PageHeader from '../../../components/library/PageHeader';
import msg, { Keys } from './ApisPage_messages';
import appMsg, { Keys as AppKeys } from '../../../i18n/keys';

class ApisPage extends Component {

  constructor(props) {
    super(props);
    this.createNewApi = this.createNewApi.bind(this);
  }

  createNewApi() {

  }

  render() {
    return (
      <div className='page-wrapper content'>
        <PageHeader
          title={this.props.intl.formatMessage(msg(Keys.SECTIONS_APIS_TITLE))}
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

export default connect(mapStateToProps, {})(injectIntl(ApisPage));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PageHeader from '../../../components/library/PageHeader';
import ApiWidget from '../../../components/library/ApiWidget';
import msg, { Keys } from './ListApisPage_messages';
import appMsg, { Keys as AppKeys } from '../../../i18n/keys';

class ListApisPage extends Component {

  render() {
    return (
      <div className='page-wrapper content'>
        <PageHeader
          title={this.props.intl.formatMessage(msg(Keys.SECTIONS_LIST_APIS_TITLE))}
          headerIcon='cogs'
          rootText={this.props.intl.formatMessage(appMsg(AppKeys.APP_TITLE))} />
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
        <div className='col-lg-4 col-md-8'>
          <ApiWidget
            widgetStyle='info'
            icon='usd'
            count='1.0'
            headerText='Balances'
            rating='5'
            linkTo='/'
            css='default-dark'
            />
        </div>
        <div className='col-lg-4 col-md-8'>
          <ApiWidget
            widgetStyle='info'
            icon='user'
            count='1.0'
            headerText='Accounts'
            rating='3'
            linkTo='/'
            css='default-dark'
            />
        </div>
        <div className='col-lg-12 col-md-8 explore-footer'>
          There are currently <span className='teal'>3</span> apis available.
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
  }
};

export default connect(mapStateToProps, {})(injectIntl(ListApisPage));

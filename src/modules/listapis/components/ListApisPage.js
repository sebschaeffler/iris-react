import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PageHeader from '../../../components/library/PageHeader';
import ApiWidget from '../../../components/library/ApiWidget';
import msg, { Keys } from './ListApisPage_messages';
import appMsg, { Keys as AppKeys } from '../../../i18n/keys';
import { load } from '../actions';

class ListApisPage extends Component {

  constructor(props) {
    super(props);

    this.renderList = this.renderList.bind(this);
  }


  renderList() {
    const listapis = this.props.list;
    if (listapis && listapis.getList()) {
      // Do not forget to return the list, not only the items inside that list
      return listapis.getList().map((item) => {
        return (
          <div className='col-lg-4 col-md-8' key={item.getId()}>
            <ApiWidget
              widgetStyle='info'
              icon='line-chart'
              count={item.getNumberOfUsers()}
              headerText={item.getName()}
              rating={item.getRating()}
              linkTo={'/api/' + item.getId()}
              css='default-dark'
            />
          </div>
        );
      });
    }
  }

  getCount() {
    const listapis = this.props.list;
    if (listapis && listapis.getList() && listapis.getList().length > 0) {
      return (
        <div>
          <span>There are currently </span>
          <span className='teal'>{listapis.getList().length}</span>
          <span> api{listapis.getList().length > 1 ? 's' : ''} available.</span>
        </div>
      );
    }
    return (
      <div>
        No apis are currently available.
      </div>
    );
  }

  render() {
    return (
      <div className='page-wrapper content'>
        <PageHeader
          title={this.props.intl.formatMessage(msg(Keys.SECTIONS_LIST_APIS_TITLE))}
          headerIcon='cogs'
          rootText={this.props.intl.formatMessage(appMsg(AppKeys.APP_TITLE))} />
        <div className="spacer" />
        {this.renderList()}
        <div className='col-lg-12 col-md-8 explore-footer'>
          {this.getCount()}
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    list: state.listapis.list,
    isProcessing: state.listapis.isProcessing,
    isSuccessful: state.listapis.isSuccessful,
    errors: state.listapis.errors
  }
};

export default connect(mapStateToProps, { load })(injectIntl(ListApisPage));

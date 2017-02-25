import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import SubscriptionWidget from '../../../components/library/SubscriptionWidget';
import { Keys } from './SubscriptionsPage_messages';
import { Keys as AppKeys } from '../../../i18n/keys';
import { loadSubscription, deleteSubscription } from '../actions';
import GenericListLayout from '../../../components/library/GenericListLayout';

class SubscriptionsListPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      localList: this.props.list
    };

    this.getConfig = this.getConfig.bind(this);
    this.renderList = this.renderList.bind(this);
    this.getCount = this.getCount.bind(this);
    this.buildParams = this.buildParams.bind(this);
    this.refresh = this.refresh.bind(this);
    this.deleteSubscription = this.deleteSubscription.bind(this);
  }

  componentDidMount() {
    // load default list (i.e. without any parameters)
    this.refresh();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      localList: nextProps.list
    });
    if (nextProps.isDeleteSuccessful) {
      this.refresh();
    }
  }

  getConfig() {
    return ({
      createLink: '/newsubscription',
      createLabel: <FormattedMessage id={Keys.BUTTON_CREATE} />,
      refresh: this.refresh,
      refreshLabel: <FormattedMessage id={AppKeys.VIEWS_QUERY_BUTTONS_REFRESH} />,
      renderList: this.renderList,
      getCount: this.getCount
    });
  }

  deleteSubscription(id) {
    this.props.deleteSubscription(id);
  }

  refresh(params) {
    const queryParams = this.buildParams();
    this.props.loadSubscription(queryParams);
  }

  buildParams() {
    return null;
  }

  renderList() {
    const list = this.state.localList;
    if (list && list.getList()) {
      // Do not forget to return the list, not only the items inside that list
      return list.getList().map((item) => {
        return (
          <div className='apilist-item col-lg-4 col-md-8' key={item.getId()}>
            <SubscriptionWidget
              widgetStyle='info'
              icon='line-chart'
              secondaryText=''
              headerText={item.getName()}
              rating={0}
              linkTo={'/subscription/' + item.getId()}
              deleteAction={this.deleteSubscription}
              id={item.getId()}
              css='default-dark'
            />
          </div>
        );
      });
    }
  }

  getCount() {
    const list = this.state.localList;
    if (list && list.getList() && list.getList().length > 0) {
      return (
        <div>
          <span>There {list.getList().length > 1 ? 'are' : 'is'} currently </span>
          <span className='teal'>{list.getList().length}</span>
          <span> subscription{list.getList().length > 1 ? 's' : ''} available.</span>
        </div>
      );
    }
    return (
      <div>
        No subscriptions are currently available.
      </div>
    );
  }

  render() {
    return (
      <GenericListLayout config={this.getConfig()} />
    );
  }

}

const mapStateToProps = (state) => {
  return {
    list: state.subscriptions.list,
    isProcessing: state.subscriptions.isProcessing,
    isDeleteSuccessful: state.subscriptions.isDeleteSuccessful,
    errors: state.subscriptions.errors
  }
};

export default connect(mapStateToProps, { loadSubscription, deleteSubscription })(injectIntl(SubscriptionsListPage));

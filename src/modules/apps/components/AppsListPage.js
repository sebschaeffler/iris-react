import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import AppWidget from '../../../components/library/AppWidget';
import { Keys } from './AppsPage_messages';
import { Keys as AppKeys } from '../../../i18n/keys';
import { loadApp, deleteApp } from '../actions';
import GenericListLayout from '../../../components/library/GenericListLayout';

class AppsListPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list: []
    }

    this.getConfig = this.getConfig.bind(this);
    this.renderList = this.renderList.bind(this);
    this.getCount = this.getCount.bind(this);
    this.buildParams = this.buildParams.bind(this);
    this.deleteApp = this.deleteApp.bind(this);
    this.refresh = this.refresh.bind(this);
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
      createLink: '/newapp',
      createLabel: <FormattedMessage id={Keys.BUTTON_CREATE} />,
      refresh: this.refresh,
      refreshLabel: <FormattedMessage id={AppKeys.VIEWS_QUERY_BUTTONS_REFRESH} />,
      renderList: this.renderList,
      getCount: this.getCount,
      isProcessing: this.props.isProcessing
    });
  }

  refresh(params) {
    const queryParams = this.buildParams();
    this.props.loadApp(queryParams);
  }

  buildParams() {
    return null;
  }

  deleteApp(id) {
    this.props.deleteApp(id);
  }

  renderList() {
    const list = this.props.list;
    if (list && list.getList()) {
      // Do not forget to return the list, not only the items inside that list
      return list.getList().map((item) => {
        return (
          <div className='col-lg-4 col-md-8' key={item.getId()}>
            <AppWidget
              widgetStyle='info'
              icon='line-chart'
              count=''
              headerText={item.getName()}
              linkTo={'/app/' + item.getId()}
              deleteAction={this.deleteApp}
              id={item.getId()}
              css='default-dark'
            />
          </div>
        );
      });
    }
  }

  getCount() {
    const list = this.props.list;
    if (list && list.getList() && list.getList().length > 0) {
      return (
        <div>
          <span>There {list.getList().length > 1 ? 'are' : 'is'} currently </span>
          <span className='teal'>{list.getList().length}</span>
          <span> application{list.getList().length > 1 ? 's' : ''} available.</span>
        </div>
      );
    }
    return (
      <div>
        No application has been registered yet.
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
    list: state.apps.list,
    isProcessing: state.apps.isProcessing,
    isDeleteSuccessful: state.apps.CRUDState.isDeleteSuccessful(),
    errors: state.apps.errors
  }
};

export default connect(mapStateToProps, { loadApp, deleteApp })(injectIntl(AppsListPage));

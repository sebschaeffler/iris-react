import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import AppWidget from '../../../components/library/AppWidget';
import { Keys } from './AppsPage_messages';
import { Keys as AppKeys } from '../../../i18n/keys';
import { load } from '../actions';
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
  }

  getConfig() {
    return ({
      createLink: '/newapp',
      createLabel: <FormattedMessage id={Keys.BUTTON_CREATE} />,
      refresh: this.refresh,
      refreshLabel: <FormattedMessage id={AppKeys.VIEWS_QUERY_BUTTONS_REFRESH} />,
      renderList: this.renderList,
      getCount: this.getCount
    });
  }

  refresh(params) {
    const queryParams = this.buildParams();
    this.props.load(queryParams);
  }

  buildParams() {
    return null;
  }


  renderList() {
    const listapis = this.props.list;
    if (listapis && listapis.getList()) {
      // Do not forget to return the list, not only the items inside that list
      return listapis.getList().map((item) => {
        return (
          <div className='col-lg-4 col-md-8' key={item.getId()}>
            <AppWidget
              widgetStyle='info'
              icon='line-chart'
              count=''
              headerText={item.getName()}
              linkTo={'/app/' + item.getId()}
              css='default-dark'
            />
          </div>
        );
      });
    }
  }

  getCount() {
    const listapps = this.props.list;
    if (listapps && listapps.getList() && listapps.getList().length > 0) {
      return (
        <div>
          <span>There {listapps.getList().length > 1 ? 'are' : 'is'} currently </span>
          <span className='teal'>{listapps.getList().length}</span>
          <span> application{listapps.getList().length > 1 ? 's' : ''} available.</span>
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
    errors: state.apps.errors
  }
};

export default connect(mapStateToProps, { load })(injectIntl(AppsListPage));

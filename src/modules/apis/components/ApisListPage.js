import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import ApiWidget from '../../../components/library/ApiWidget';
import { Keys } from './ApisPage_messages';
import { Keys as AppKeys } from '../../../i18n/keys';
import { loadApi, deleteApi } from '../actions';
import GenericListLayout from '../../../components/library/GenericListLayout';

class ApisListPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      localList: this.props.list
    };

    this.renderList = this.renderList.bind(this);
    this.getCount = this.getCount.bind(this);
    this.buildParams = this.buildParams.bind(this);
    this.refresh = this.refresh.bind(this);
    this.deleteApi = this.deleteApi.bind(this);
  }

  componentDidMount() {
    // load default list (i.e. without any parameters)
    this.refresh();
  }

  componentWillReceiveProps(nextProps) {
    //console.log("New props: ", nextProps);
    this.setState({
      localList: nextProps.list
    });
    if (nextProps.isDeleteSuccessful) {
      this.refresh();
    }
  }

  getConfig() {
    return ({
      createLink: '/newapi',
      createLabel: <FormattedMessage id={Keys.BUTTON_CREATE} />,
      refresh: this.refresh,
      refreshLabel: <FormattedMessage id={AppKeys.VIEWS_QUERY_BUTTONS_REFRESH} />,
      renderList: this.renderList,
      getCount: this.getCount,
      isProcessing: this.props.isProcessing
    });
  }

  deleteApi(id) {
    this.props.deleteApi(id);
  }

  refresh(params) {
    const queryParams = this.buildParams();
    this.props.loadApi(queryParams);
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
          <div className='col-lg-4 col-md-8' key={item.getId()}>
            <ApiWidget
              widgetStyle='info'
              icon='line-chart'
              count={item.getNumberOfUsers()}
              headerText={item.getName()}
              rating={item.getRating()}
              linkTo={'/api/' + item.getId()}
              deleteAction={this.deleteApi}
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
          <span> api{list.getList().length > 1 ? 's' : ''} available.</span>
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
      <GenericListLayout config={this.getConfig()} />
    );
  }

}

const mapStateToProps = (state) => {
  return {
    list: state.apis.list,
    isProcessing: state.apis.isProcessing,
    isDeleteSuccessful: state.apis.CRUDState.isDeleteSuccessful(),
    errors: state.apis.errors
  }
};

export default connect(mapStateToProps, { loadApi, deleteApi })(injectIntl(ApisListPage));

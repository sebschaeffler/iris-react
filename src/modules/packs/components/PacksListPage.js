import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import AppWidget from '../../../components/library/AppWidget';
import { Keys } from './PacksPage_messages';
import { Keys as AppKeys } from '../../../i18n/keys';
import { loadPack, deletePack } from '../actions';
import GenericListLayout from '../../../components/library/GenericListLayout';

class PacksListPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      localList: this.props.list
    };

    this.renderList = this.renderList.bind(this);
    this.getCount = this.getCount.bind(this);
    this.buildParams = this.buildParams.bind(this);
    this.refresh = this.refresh.bind(this);
    this.deletePack = this.deletePack.bind(this);
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
      createLink: '/newpack',
      createLabel: <FormattedMessage id={Keys.BUTTON_CREATE} />,
      refresh: this.refresh,
      refreshLabel: <FormattedMessage id={AppKeys.VIEWS_QUERY_BUTTONS_REFRESH} />,
      renderList: this.renderList,
      getCount: this.getCount,
      isProcessing: this.props.isProcessing
    });
  }

  deletePack(id) {
    this.props.deletePack(id);
  }

  refresh(params) {
    const queryParams = this.buildParams();
    this.props.loadPack(queryParams);
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
            <AppWidget
              widgetStyle='info'
              icon='line-chart'
              count=''
              headerText={item.getName()}
              linkTo={'/pack/' + item.getId()}
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
          <span> pack{list.getList().length > 1 ? 's' : ''} available.</span>
        </div>
      );
    }
    return (
      <div>
        No packs are currently available.
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
    list: state.packs.list,
    isProcessing: state.packs.isProcessing,
    isDeleteSuccessful: state.packs.CRUDState.isDeleteSuccessful(),
    errors: state.packs.errors
  }
};

export default connect(mapStateToProps, { loadPack, deletePack })(injectIntl(PacksListPage));

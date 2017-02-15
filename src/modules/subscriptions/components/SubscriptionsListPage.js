import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router';
import { FormGroup, Col, Button } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FontAwesome from 'react-fontawesome';
import SubscriptionWidget from '../../../components/library/SubscriptionWidget';
import { Keys } from './SubscriptionsPage_messages';
import { Keys as AppKeys } from '../../../i18n/keys';
import { loadSubscription, deleteSubscription } from '../actions';
import * as actions from '../actionTypes';

class SubscriptionsListPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      localList: this.props.list
    };

    this.renderList = this.renderList.bind(this);
    this.buildParams = this.buildParams.bind(this);
    this.refresh = this.refresh.bind(this);
    this.deleteSubscription = this.deleteSubscription.bind(this);
  }

  componentDidMount() {
    // load default list (i.e. without any parameters)
    this.refresh();
  }

  componentWillReceiveProps(nextProps) {
    //console.log("New props: ", nextProps.list);
    this.setState({
      localList: nextProps.list
    });
    if (nextProps.currentAction === actions.DELETE_SUCCESS) {
      this.refresh();
    }
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
    const transitionOptions = {
      transitionName: "widgetlist",
      transitionEnterTimeout: 700,
      transitionLeaveTimeout: 700
    };
    return (
      <div>
        <div>
          <div className='button-left'>
            <FormGroup>
              <Col>
                <Link to='/newsubscription'>
                  <Button
                    className='default-submit-button'
                    type='submit'>
                    <FontAwesome name='plus' />
                    <span className="button-text">
                      <FormattedMessage id={Keys.BUTTON_CREATE} />
                    </span>
                  </Button>
                </Link>
              </Col>
            </FormGroup>
          </div>
          <div className='button-right'>
            <Col>
              <Button
                className='default-submit-button'
                type='submit'
                onClick={this.refresh}>
                <FontAwesome name='refresh' />
                <span className="button-text">
                  <FormattedMessage id={AppKeys.VIEWS_QUERY_BUTTONS_REFRESH} />
                </span>
              </Button>
            </Col>
          </div>
        </div>
        <div className="workarea">
          <ReactCSSTransitionGroup {...transitionOptions}>
            {this.renderList()}
          </ReactCSSTransitionGroup>
          <div className='col-lg-12 col-md-8 explore-footer'>
            {this.getCount()}
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    list: state.subscriptions.list,
    isProcessing: state.subscriptions.isProcessing,
    isSuccessful: state.subscriptions.isSuccessful,
    currentAction: state.subscriptions.currentAction,
    errors: state.subscriptions.errors
  }
};

export default connect(mapStateToProps, { loadSubscription, deleteSubscription })(injectIntl(SubscriptionsListPage));

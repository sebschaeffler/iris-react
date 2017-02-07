import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import PageHeader from '../../../components/library/PageHeader';
import { FormGroup, Col, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import ApiWidget from '../../../components/library/ApiWidget';
import msg, { Keys } from './ListApisPage_messages';
import appMsg, { Keys as AppKeys } from '../../../i18n/keys';
import { load } from '../actions';
//import { getQueryResults } from '../selectors';

class ListApisPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      localList: this.props.list
    };

    this.renderList = this.renderList.bind(this);
    this.buildParams = this.buildParams.bind(this);
    this.refresh = this.refresh.bind(this);
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
            <ApiWidget
              widgetStyle='info'
              icon='line-chart'
              count={item.getNumberOfUsers() + ' consumers'}
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
          <span>There {listapis.getList().length > 1 ? 'are' : 'is'} currently </span>
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
        <div className='button-right'>
          <FormGroup>
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
          </FormGroup>
        </div>
        <div className="workarea">
          {this.renderList()}
          <div className='col-lg-12 col-md-8 explore-footer'>
            {this.getCount()}
          </div>
        </div>

      </div >
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

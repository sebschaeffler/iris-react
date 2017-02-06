import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FormGroup, Col, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import AppWidget from '../../../components/library/ApiWidget';
import { Keys } from './AppsPage_messages';
import { Keys as AppKeys } from '../../../i18n/keys';
import { Link } from 'react-router';
import { load } from '../actions';

class AppsListPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list: []
    }

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
            <AppWidget
              widgetStyle='info'
              icon='line-chart'
              count=''
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
      <div>
        <div className='button-left'>
          <FormGroup>
            <Col>
              <Link to='/newapp'>
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
        {this.renderList()}
        <div className='col-lg-12 col-md-8'>
          {this.getCount()}
        </div>
        <div className='button-center'>
          <FormGroup>
            <Col>
              <Button
                className='default-submit-button'
                type='submit'
                onClick={this.refresh}
                disabled={this.props.pristine || this.props.submitting}>
                <FontAwesome name='refresh' />
                <span className="button-text">
                  <FormattedMessage id={AppKeys.VIEWS_QUERY_BUTTONS_REFRESH} />
                </span>
              </Button>
            </Col>
          </FormGroup>
        </div>
      </div>
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

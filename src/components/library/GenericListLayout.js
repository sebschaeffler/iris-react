import React, {Component} from "react";
import {Link} from "react-router";
import {FormGroup, Col} from "react-bootstrap";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import ContentAdd from "material-ui/svg-icons/content/add";
import FontAwesome from "react-fontawesome";
import SpinLoader from "respinner/lib/SpinLoader";

const transitionOptions = {
  transitionName: "widgetlist",
  transitionEnterTimeout: 500,
  transitionLeaveTimeout: 500,
  transitionAppear: true,
  transitionAppearTimeout: 500
};

function _renderSpinner(config) {
  if (config.isProcessing) {
    return (
      <div className='spinner-container-list'>
        <SpinLoader fill="#009" borderRadius={2} count={12}/>
      </div>
    );
  }
}

function _renderList(config) {
  return (
    <div>
      {_renderSpinner(config)}
      <ReactCSSTransitionGroup {...transitionOptions}>
        {config.renderList()}
      </ReactCSSTransitionGroup>
    </div>
  );
}

export default class GenericListLayout extends Component {

  render() {
    const {config} = this.props;

    return (
      <div>
        <div>
          <div className='button-left'>
            <FormGroup>
              <Col>
                <Link to={config.createLink}>
                  <FloatingActionButton
                    className='default-submit-button'
                    type='submit'>
                    <ContentAdd />
                    <span className="button-text">
                      {config.createLabel} />
                  </span>
                  </FloatingActionButton>
                </Link>
              </Col>
            </FormGroup>
          </div>
          <div className='button-right'>
            <Col>
              <FloatingActionButton
                className='default-submit-button'
                secondary={true}
                type='submit'
                onClick={config.refresh}>
                <FontAwesome name='refresh'/>
                <span className="button-text">
                  {config.refreshLabel} />
              </span>
              </FloatingActionButton>
            </Col>
          </div>
        </div>
        <div className="workarea">
          {_renderList(config)}
          <div className='col-lg-12 col-md-8 explore-footer'>
            {config.getCount()}
          </div>
        </div>
      </div>
    );
  }

}

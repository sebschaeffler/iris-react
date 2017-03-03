import React, {Component} from "react";
import {Form, Row} from "react-bootstrap";
import {Tabs, Tab} from "material-ui/Tabs";
import FontIcon from "material-ui/FontIcon";
import SpinLoader from "respinner/lib/SpinLoader";
import * as LayoutHelper from "./LayoutHelper";

export default class GenericLayout extends Component {

  constructor(props) {
    super(props);

    this.state = {
      secondaryTabContent: ''
    }

    this.getSecondaryTabContent = this.getSecondaryTabContent.bind(this);
    this.resetSecondaryTabContent = this.resetSecondaryTabContent.bind(this);
  }

  getSecondaryTabContent() {
    const content = this.props.config.getSecondaryTabContent();
    this.setState({
      secondaryTabContent: content
    });
  }

  resetSecondaryTabContent() {
    this.setState({
      secondaryTabContent: ''
    });
  }

  renderSpinner() {
    return (
      <div className='spinner-container'>
        <div className='inner-spinner-container'>
          <SpinLoader fill="#009" borderRadius={2} count={12}/>
        </div>
      </div>
    );
  }

  render() {
    const isProcessing = (this.props.config.isProcessingAction ? this.props.config.isProcessingAction() :
      this.props.config.isProcessing ? this.props.config.isProcessing : false);
    if (isProcessing) {
      return this.renderSpinner();
    }

    if (this.props.config.tabs) {
      return (
        <div>
          {LayoutHelper.renderBackAction(this.props.config)}
          <div className="workarea tabs">
            <Tabs>
              <Tab
                icon={<FontIcon className="material-icons">description</FontIcon>}
                label="General"
                onActive={this.resetSecondaryTabContent}>
                <div className='tabs-top'>
                  <Form horizontal onSubmit={this.props.config.onSubmit}>
                    <Row className="form-group">
                      {LayoutHelper.renderTechnicalId(this.props.config)}
                      {LayoutHelper.renderStatus(this.props.config)}
                    </Row>
                    {this.props.children}
                    {LayoutHelper.renderActions(this.props.config)}
                    {LayoutHelper.renderErrors(this.props.config.errors)}
                  </Form>
                </div>
              </Tab>
              <Tab
                icon={<FontIcon className="material-icons">{this.props.config.secondaryTabIcon}</FontIcon>}
                label={this.props.config.secondaryTabLabel}
                onActive={this.getSecondaryTabContent}>
                <div className='tabs-top'>
                  {this.state.secondaryTabContent}
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      );
    }

    return (
      <div>
        {LayoutHelper.renderBackAction(this.props.config)}
        {LayoutHelper.renderActionButton(this.props.config)}
        <div id='workarea' className="workarea">
          <Form horizontal onSubmit={this.props.config.onSubmit}>
            <Row className="form-group">
              {LayoutHelper.renderTechnicalId(this.props.config)}
              {LayoutHelper.renderStatus(this.props.config)}
            </Row>
            {this.props.children}
            {LayoutHelper.renderActions(this.props.config)}
            {LayoutHelper.renderErrors(this.props.config.errors)}
          </Form>
        </div>
      </div>
    );
  }

};

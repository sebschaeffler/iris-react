import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import * as LayoutHelper from './LayoutHelper';

export default class GenericLayout extends Component {

  render() {
    return (
      <div>
        {LayoutHelper.renderBackAction(this.props.config)}
        <div className="workarea" >
          <Form horizontal onSubmit={this.props.config.onSubmit}>
            {LayoutHelper.renderTechnicalId(this.props.config)}
            {this.props.children}
            {LayoutHelper.renderErrors(this.props.config.errors)}
          </Form>
        </div>
      </div>
    );
  }

};

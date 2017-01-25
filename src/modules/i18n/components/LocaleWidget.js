import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

export class LocaleWidget extends Component {

  constructor(props) {
    super(props);

    this.onSelectLocale = this.onSelectLocale.bind(this);
  }

  onSelectLocale() {
    this.props.setLocale(this.props.locale);
  }

  render() {
    return (
      <a href='#' onClick={this.onSelectLocale}>
        {this.props.locale}
      </a>
    );
  }
}

const mapStateToProps = (state, props) => {
  return props;
};

export default connect(mapStateToProps, { setLocale: actions.setLocale })(LocaleWidget);

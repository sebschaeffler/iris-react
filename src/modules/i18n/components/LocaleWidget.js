// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

type OwnProps = {|
  locale: string
|};

type Props = OwnProps & {
  setLocale: typeof actions.setLocale
};

export class LocaleWidget extends Component {
  props: Props;

  constructor(props: Props) {
    super(props);

    (this: any).onSelectLocale = this.onSelectLocale.bind(this);
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

const mapStateToProps = (state, props: OwnProps): OwnProps => {
  return props;
};

export default connect(mapStateToProps, { setLocale: actions.setLocale })(LocaleWidget);

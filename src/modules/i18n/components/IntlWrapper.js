import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import strings from '../../../i18n/strings.json';
import { NAME } from '../constants';
import { ImmutableState } from '../model';

type OwnProps = {|
  locale: string
|};

export class IntlWrapper extends Component {
  render () {
    const { children, locale } = this.props;
    const messages = strings[locale];

    return (
      <IntlProvider locale={locale} key={locale} messages={messages}>
        {children}
      </IntlProvider>
    );
  }
}

const mapStateToProps = (state): OwnProps => {
  return {
    locale: (state[NAME]: ImmutableState).getLocale()
  }
};

export default connect(mapStateToProps)(IntlWrapper);

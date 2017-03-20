import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PageHeader from '../../../components/library/PageHeader';

class UIThemes extends Component {

  render() {
    return (
      <div className='page-wrapper content'>
        <PageHeader
          title='Themes and components'
          headerIcon='magic'
          rootText='Themes and components' />
        <div className="spacer" />
        {this.props.children}
      </div>
    );
  }
}

export default connect()(injectIntl(UIThemes));

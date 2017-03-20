import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PageHeader from '../../../components/library/PageHeader';

class UIColors extends Component {

  render() {
    return (
      <div className='page-wrapper content'>
        <PageHeader
          title='Color palette'
          headerIcon='paint-brush'
          rootText='Color palette' />
        <div className="spacer" />
        {this.props.children}
      </div>
    );
  }
}

export default connect()(injectIntl(UIColors));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PageHeader from '../../../components/library/PageHeader';
import MarkdownElement from '../../../utils/MarkdownElement';
import codeMobile from './code-mobile.md';

class CodeMobileAppPage extends Component {

  render() {
    return (
      <div className='page-wrapper content'>
        <PageHeader
          title='Code samples for mobile applications'
          headerIcon='mobile'
          rootText='Code samples for mobile applications' />
        <div className="spacer" />
        <div className="getting-started-div" style={{ margin: 48}}>
          <MarkdownElement text={codeMobile}/>
        </div>
      </div>
    );
  }
}

export default connect()(injectIntl(CodeMobileAppPage));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PageHeader from '../../../components/library/PageHeader';
import MarkdownElement from '../../../utils/MarkdownElement';
import codeBe from './code-be.md';

class CodeBeAppPage extends Component {

  render() {
    return (
      <div className='page-wrapper content'>
        <PageHeader
          title='Code samples for back-end applications'
          headerIcon='database'
          rootText='Code samples for back-end applications' />
        <div className="spacer" />
        <div className="getting-started-div" style={{ margin: 48}}>
          <MarkdownElement text={codeBe}/>
        </div>
      </div>
    );
  }
}

export default connect()(injectIntl(CodeBeAppPage));

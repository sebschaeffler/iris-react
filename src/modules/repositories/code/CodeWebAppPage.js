import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PageHeader from '../../../components/library/PageHeader';
import MarkdownElement from '../../../utils/MarkdownElement';
import codeWeb from './code-web.md';

class CodeWebAppPage extends Component {

  render() {
    return (
      <div className='page-wrapper content'>
        <PageHeader
          title='Code samples for Web applications'
          headerIcon='chrome'
          rootText='Code samples for Web applications' />
        <div className="spacer" />
        <div className="getting-started-div" style={{ margin: 48}}>
          <MarkdownElement text={codeWeb}/>
        </div>
      </div>
    );
  }
}

export default connect()(injectIntl(CodeWebAppPage));

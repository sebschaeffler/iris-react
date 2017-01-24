import React from 'react';
import FontAwesome from 'react-fontawesome';
import { PageHeader } from '../PageHeader';
import { shallowWithIntl } from '../../../__dev__/test_intl';

function setup() {
  const props = {
    title: "Test Title",
    headerIcon: "superpowers",
    display: true
  };

  const header = shallowWithIntl(<PageHeader {...props} />);
  const headerWithoutBreadcrumbs = shallowWithIntl(<PageHeader {...props} display={false} />);
  const headerWithoutProps = shallowWithIntl(<PageHeader />);

  return {
    props,
    header,
    headerWithoutBreadcrumbs,
    headerWithoutProps
  };
}

describe('components', () => {
  describe('library', () => {
    describe('page header', () => {
      it('should render self and subcomponents without props', () => {
        const { headerWithoutProps: header } = setup();

        // only an empty div
        const divs = header.find('div');
        expect(divs.length).toBe(1);
        expect(divs.children().length).toBe(0);
      });

      it('should render self and subcomponents without breadcrumbs', () => {
        const { props, headerWithoutBreadcrumbs: header } = setup();

        // outer div, inner div and breadcrumbs div
        const divs = header.find('div');
        expect(divs.length).toBe(3);

        const pageHeaderDiv = header;
        expect(header.is('div')).toBe(true);
        expect(pageHeaderDiv.hasClass('page-header')).toBe(true);

        const rowDiv = pageHeaderDiv.children().closest('div');
        expect(rowDiv.hasClass('row')).toBe(true);
        expect(rowDiv.children().length).toBe(2); // title and breadcrumbs

        // title element
        const title = rowDiv.find('h2');
        expect(title.children().length).toBe(3); // font awesome icon, break, title

        // icon
        const fontAwesome = title.childAt(0);
        expect(fontAwesome.is(FontAwesome)).toBe(true);
        expect(fontAwesome.props().name).toEqual(props.headerIcon);
        expect(title.childAt(2).text()).toEqual(props.title);

        // breadcrumbs element
        const breadcrumbsDiv = rowDiv.children('div').first();
        expect(breadcrumbsDiv.hasClass('breadcrumb-wrapper')).toBe(false); // no breadcrumbs
      });

      it('should render self and subcomponents', () => {
        const { props, header } = setup();

        // outer div, inner div and breadcrumbs div
        const divs = header.find('div');
        expect(divs.length).toBe(3);

        const pageHeaderDiv = header;
        expect(header.is('div')).toBe(true);
        expect(pageHeaderDiv.hasClass('page-header')).toBe(true);

        const rowDiv = pageHeaderDiv.children().closest('div');
        expect(rowDiv.hasClass('row')).toBe(true);
        expect(rowDiv.children().length).toBe(2); // title and breadcrumbs

        // title element
        const title = rowDiv.find('h2');
        expect(title.children().length).toBe(3); // font awesome icon, break, title

        // icon
        const fontAwesome = title.childAt(0);
        expect(fontAwesome.is(FontAwesome)).toBe(true);
        expect(fontAwesome.props().name).toEqual(props.headerIcon);
        expect(title.childAt(2).text()).toEqual(props.title);

        // breadcrumbs element
        const breadcrumbsDiv = rowDiv.children('div').first();
        expect(breadcrumbsDiv.hasClass('breadcrumb-wrapper')).toBe(true);
      });
    });
  });
});

import React, { Component } from 'react';
import { Image, Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {indigo500, indigo700, lightGreen500, lightGreen700, grey400} from 'material-ui/styles/colors';
import { Keys as AppKeys } from '../i18n/keys';
import LocaleWidget from '../modules/i18n/components/LocaleWidget';

const customTheme = {
  palette: {
    primary1Color: indigo500,
    primary2Color: indigo700,
    primary3Color: grey400,
    accent1Color: lightGreen500,
    accent2Color: lightGreen700,
    accent3Color: grey400
  }
};

const theme = getMuiTheme(customTheme);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default class AppLayout extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div className='app_layout'>
          <Navbar fluid>
            <Navbar.Header style={{ marginBottom: 10 }}>
              <Navbar.Brand>
                <Link to='/'>
                  <Image src={require('../../assets/dbglogo.png')} />
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <NavDropdown eventKey={4} title={<span><FontAwesome name='user' /><span className='teal profile-name'>John Cooper</span></span>} id='profile'>
                  <MenuItem eventKey='1'>
                    <FontAwesome name='user' /> User Profile
                </MenuItem>
                  <MenuItem eventKey='2'>
                    <FontAwesome name='cog' /> Settings
                </MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey='4'>
                    <FontAwesome name='sign-out' /> Logout
                </MenuItem>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
            <div className='navbar-default sidebar' style={{ 'marginLeft': '-20px' }} role='navigation'>
              <div className='sidebar-nav navbar-collapse'>
                <ul className='nav in' id='side-menu'>
                  <li className='sidebar-search'>
                    <div className='input-group custom-search-form'>
                      <input type='text' className='form-control' placeholder='Search...' />
                      <span className='input-group-btn'>
                        <button className='btn btn-default' type='button'>
                          <FontAwesome name='search' />
                        </button>
                      </span>
                    </div>
                  </li>
                  <li>
                    <Link to='/dashboard'><div className='sidebar-icon'><FontAwesome name='home' /></div>
                      <span className='sidebar-text'>
                        <FormattedMessage id={AppKeys.PAGES_DASHBOARD} />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to='/apislist'><div className='sidebar-icon'><FontAwesome name='cogs' /></div>
                      <span className='sidebar-text'>
                        <FormattedMessage id={AppKeys.PAGES_EXPLORE_APIS} />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to='/packageslist'><div className='sidebar-icon'><FontAwesome name='shopping-bag' /></div>
                      <span className='sidebar-text'>
                        <FormattedMessage id={AppKeys.PAGES_EXPLORE_PACKS} />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to='/appslist'><div className='sidebar-icon'><FontAwesome name='list' /></div>
                      <span className='sidebar-text'>
                        <FormattedMessage id={AppKeys.PAGES_MY_APPLICATIONS} />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to='/subscriptionslist'>
                      <div className='sidebar-icon'>
                        <FontAwesome name='pencil' />
                      </div>
                      <span className='sidebar-text'>
                        <FormattedMessage id={AppKeys.PAGES_MY_SUBSCRIPTIONS} />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <div className='sidebar-locale'>
                      <div className='sidebar-icon'><FontAwesome name='flag' /></div>
                      <span className='sidebar-text'>
                        <LocaleWidget locale='en' /><span className='locale-widget-separator'>|</span><LocaleWidget locale='fr' />
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </Navbar>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

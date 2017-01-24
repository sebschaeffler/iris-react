// @flow
import React, { Component } from 'react';
import { Image, /*Badge,*/ Navbar, Nav, NavDropdown, MenuItem /*, ProgressBar */ } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Keys as AppKeys } from '../i18n/keys';
import LocaleWidget from '../modules/i18n/components/LocaleWidget';

export default class AppLayout extends Component {
  render() {
    return (
      <div className="app_layout">
        <Navbar fluid>
          <Navbar.Header style={{marginBottom: 10}}>
            <Navbar.Brand>
              <Link to="/">
                {/*<span className="teal">Digital Business Platform</span>*/}
                <Image src={require('../../assets/dbglogo.png')} />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavDropdown eventKey={4} title={<span><FontAwesome name="user" /><span  className="teal profile-name">John Cooper</span></span>} id="profile">
                <MenuItem eventKey="1">
                  <FontAwesome name="user" /> User Profile
                </MenuItem>
                <MenuItem eventKey="2">
                  <FontAwesome name="cog" /> Settings
                </MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="4">
                  <FontAwesome name="sign-out" /> Logout
                </MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>

          <div className="navbar-default sidebar" style={ { 'marginLeft': '-20px' } } role="navigation">
            <div className="sidebar-nav navbar-collapse">
              <ul className="nav in" id="side-menu">
                <li className="sidebar-search">
                  <div className="input-group custom-search-form">
                    <input type="text" className="form-control" placeholder="Search..." />
                    <span className="input-group-btn">
                      <button className="btn btn-default" type="button">
                        <FontAwesome name="search" />
                      </button>
                    </span>
                  </div>
                </li>
                <li>
                  <Link to="/dashboard"><div className="sidebar-icon"><FontAwesome name="home" /></div> &nbsp;
                    <FormattedMessage id={AppKeys.PAGES_DASHBOARD} />
                  </Link>
                </li>
                <li>
                  <div className="sidebar-locale">
                     <LocaleWidget locale='en' /><span className="locale-widget-separator">|</span><LocaleWidget locale='fr' />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Navbar>

        {this.props.children}

      </div>
    );
  }
}

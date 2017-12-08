import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Navbar collapseOnSelect className="navbar-custom">
        <Navbar.Header>
          <Navbar.Brand className="navbar-custom-color">
            <Link to="/"> Speech Trainer </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to={'/homepage'}>
              <NavItem>Home</NavItem>
            </LinkContainer>

            <LinkContainer to={'/about'}>
              <NavItem>About</NavItem>
            </LinkContainer>

            <LinkContainer to={'/signup'}>
              <NavItem>Sign Up</NavItem>
            </LinkContainer>

            <LinkContainer to={'/signin'}>
              <NavItem>Sign In</NavItem>
            </LinkContainer>

            <LinkContainer to={'/'}>
              <NavItem onClick={this.handleLogout}>Logout</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;

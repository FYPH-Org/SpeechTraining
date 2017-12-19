import React, { Component } from 'react';
import { firebaseApp } from '../firebase';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import logo from './speechtrainer.png';
import './Navigation.css';

const logger = console;

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      notshow: 'hello'
    };
  }

  handleLogout() {
    firebaseApp.auth().signOut()
      .then(() => {
        sessionStorage.removeItem('username');
      })
      .catch((err) => {
        logger.log('there was an error logging you out');
        logger.log(err);
      });
  }

  componentDidMount() {
    if (sessionStorage.getItem('username')) {
      logger.log('is logged in true');
      this.setState({ isLoggedIn: true });
    }
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect className="navbar-custom">
        <Navbar.Header>
          <Navbar.Brand className="navbar-custom-color">
            {/* <Link to="/">Speech Trainer</Link> */}
            <img src={logo} height='50'/>   
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight className='logout'>
            <IndexLinkContainer exact to={'/'}>
              <NavItem>Home</NavItem>
            </IndexLinkContainer>

            <LinkContainer to={'/about'}>
              <NavItem>About</NavItem>
            </LinkContainer>

            {/* <LinkContainer to={'/signup'}>
              <NavItem>Sign Up</NavItem>
            </LinkContainer> */}

            <LinkContainer to={'/signin'}>
              <NavItem>Sign In</NavItem>
            </LinkContainer>

            <LinkContainer exact to={'/'} className='logout'>
              <NavItem onClick={() => this.handleLogout()} className='test'>Logout</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;

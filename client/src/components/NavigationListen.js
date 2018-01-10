import React, { Component } from 'react';
import { firebaseApp } from '../firebase';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import logo from './speechtrainer.png';
import './Navigation.css';

const logger = console;

class NavigationListen extends Component {
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
            <LinkContainer to={'/'}>
              <img src={logo} height='50' alt='logo'/>   
              {/* <NavItem>Sign In</NavItem> */}
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight className='logout'>
            <LinkContainer exact to={'/'}>
              <NavItem onClick={() => this.handleLogout()} className='test'>Logout</NavItem> 
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationListen;

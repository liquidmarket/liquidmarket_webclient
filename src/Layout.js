import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom'
import { signOut, signedInListen } from "./auth";

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      signedIn: false
    };
    signedInListen(signedIn => {
        this.setState({ signedIn });
    });
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    if (this.state.signedIn) {
        return (
          <div>
            <Navbar color="faded" light expand="md">
              <NavbarBrand>
                  <Link to="/">liquid market</Link>
              </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <UserMenu isOpen={this.state.isOpen} />
            </Navbar>
            {this.props.children}
          </div>
        );
    } else {
        return (
          <div>
            <Navbar color="faded" light expand="md">
              <NavbarBrand>
                  <Link to="/">liquid market</Link>
              </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <LogInMenu />
            </Navbar>
            {this.props.children}
          </div>
        );
    }
  }
}

function LogInMenu(props) {
    return(
        <Nav className="ml-auto" navbar>
            <NavItem>
                <div className="g-signin2" data-onsuccess="onSignIn"></div>
            </NavItem>
        </Nav>
    );
}

function UserMenu(props) {
    return (
        <Collapse isOpen={props.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/markets/">Shareholdings</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/trades/">Trades</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/liquidmarket">Github</NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
                { localStorage.getItem('name') }
            </DropdownToggle>
            <DropdownMenu >
              <DropdownItem>
                <Link to="/accounts">Accounts</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to="/settings">Settings</Link>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <Link to="/" onClick={signOut}>Sign out</Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    )
}
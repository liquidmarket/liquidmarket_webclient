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
        if (signedIn) {
            this.setState({ signedIn });
        } else {
            window.location.reload();
        }
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
            <NavbarBrand tag={Link} to="/">
                liquid market
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
            <NavbarBrand tag={Link} to="/">
                liquid market
            </NavbarBrand>
              <LogInMenu />
            </Navbar>
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
            <NavLink tag={Link} to="shareholdings">Shareholdings</NavLink>
        </NavItem>
        <NavItem>
            <NavLink tag={Link} to="trades">Trades</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="https://github.com/liquidmarket">Github</NavLink>
        </NavItem>
        <NavItem>
            <NavLink tag={Link} to="help">Help</NavLink>
        </NavItem>
        <UncontrolledDropdown nav>
            <DropdownToggle nav caret>
                { localStorage.getItem('name') }
            </DropdownToggle>
            <DropdownMenu >
              <DropdownItem>
                <NavLink tag={Link} to="/accounts">Accounts</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink tag={Link} to="/settings">Settings</NavLink>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <NavLink tag={Link} to="/" onClick={signOut}>Sign out</NavLink>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    )
}